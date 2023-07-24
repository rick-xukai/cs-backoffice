import React, { useEffect, useState, useCallback } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Modal,
  message,
  Upload,
  Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { debounce } from 'lodash';
import Cropper from 'react-easy-crop';

import { useAppDispatch } from '../../../app/hooks';
import { Images } from '../../../theme';
import { getCroppedImg, dataURLtoFile } from '../../../utils/func';
import { UploadFileAcceptType } from '../../../constants/General';
// eslint-disable-next-line import/no-cycle
import {
  OrganizerData,
  openAiGeneratorAction,
  uploadFileAction,
  CreateEventFormValueProps,
} from '../CreateEvent.slice';
import {
  CreateEventFormContainer,
  NoSearchResultButton,
} from '../CreateEventComponent';
import TipsComponent from '../../../components/Tips';
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload';
import { OPEN_AI_TEMPLATE } from '../../../constants/constants';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Dragger } = Upload;
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const EventInfo = ({
  organizerData,
  formValue,
  fieldEdit,
}: {
  organizerData: OrganizerData[];
  formValue: CreateEventFormValueProps;
  fieldEdit: (value: any, field: string) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOLE_MAP_API_KEY as string,
    libraries,
  });

  const [crop, setCrop] = useState({ x: 2, y: 2 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [bannerImageBase64, setBannerImageBase64] = useState<string>('');
  const [bannerImageEvent, setBannerImageEvent] = useState<any>({});
  const [showCropImageModal, setShowCropImageModal] = useState<boolean>(false);
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  const [showLocationMap, setShowLocationMap] = useState<boolean>(false);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<string>('');
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [showPreviewBanner, setShowPreviewBanner] = useState<boolean>(false);
  const [showAddMyLocationInput, setShowAddMyLocationInput] =
    useState<boolean>(false);
  const [noSearchResult, setNoSearchResult] = useState<boolean>(false);
  const [mapLatLng, setMapLatLng] = useState({
    lat: Number(formValue.locationCoord.split(',')[0]),
    lng: Number(formValue.locationCoord.split(',')[1]),
  });
  const [openAiLoading, setOpenAiLoading] = useState(false);

  const customRequest = async (e: any, type: string) => {
    const formData = new FormData();
    formData.append('file', e);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      if (type === 'banner') {
        setBannerFile(response.payload.url);
        fieldEdit(response.payload.url, 'image');
      }
      message.success(t('Upload successful.'));
    } else {
      message.error(t('Upload failed, please try again.'));
    }
  };

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const showCroppedImage = async () => {
    setShowCropImageModal(false);
    try {
      const { name, type } = bannerImageEvent;
      const croppedImage: any = await getCroppedImg(
        bannerImageBase64,
        type,
        croppedAreaPixels,
        rotation,
      );
      const file = dataURLtoFile(croppedImage, name.split('.')[0]);
      customRequest(file, 'banner');
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  const bannerUploadProps: UploadProps = {
    name: 'banner',
    multiple: false,
    fileList: [],
    customRequest: (e: any) => {
      if (e.file.type === 'image/gif') {
        customRequest(e.file, 'banner');
      }
    },
    beforeUpload: (file) => {
      const { type, size } = file;
      const isLimit =
        size / 1024 / 1024 < 5 && UploadFileAcceptType.includes(type);
      if (!isLimit) {
        message.error(
          t(
            'Invalid file format or size. Please upload a PNG, JPEG, or GIF image that is up to [size] MB in size.',
            { size: 5 },
          ),
        );
      } else if (type !== 'image/gif') {
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          const base64 = e.target.result;
          setBannerImageBase64(base64);
          setBannerImageEvent(file);
          setShowCropImageModal(true);
        };
        reader.readAsDataURL(file);
      }
      return isLimit;
    },
  };

  const draggerUploadDeleteAction = () => {
    setBannerFile('');
  };

  const suggestDescriptionAI = async () => {
    if (!formValue.description) {
      return message.error(
        t(
          'Please enter content before using the AI tool to generate a suggested description.',
        ),
      );
    }
    setOpenAiLoading(true);
    const response: any = await dispatch(
      openAiGeneratorAction({
        content: `${OPEN_AI_TEMPLATE} ${formValue.description}`,
      }),
    );
    if (response.type === openAiGeneratorAction.fulfilled.toString()) {
      fieldEdit(response?.payload?.data?.content, 'description');
    } else {
      message.error(response?.payload?.message);
    }
    return setOpenAiLoading(false);
  };

  const onSearchBoxLoad = (autocompleteEvent: any) => {
    setAutocomplete(autocompleteEvent);
  };

  const onPlaceChanged = () => {
    setNoSearchResult(false);
    setShowAddressInput(true);
    if (autocomplete !== null) {
      if (autocomplete.getPlaces() && autocomplete.getPlaces()[0]) {
        const {
          geometry,
          formatted_address: formattedAddress,
          name,
        } = autocomplete.getPlaces()[0];
        const location = `${name} ${formattedAddress}`;
        setShowLocationMap(true);
        setMapLatLng({
          lat: geometry.location.lat(),
          lng: geometry.location.lng(),
        });
        fieldEdit(
          {
            location,
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          },
          'locationLatLng',
        );
      }
    } else {
      message.error(t('Failed to get location, please try again'));
    }
  };

  const onMapLoad = useCallback((map) => {
    if (map) {
      const { center } = map;
      const bounds = new window.google.maps.LatLngBounds({
        lat: center.lat(),
        lng: center.lng(),
      });
      map.fitBounds(bounds);
    }
  }, []);

  const handleCheckResult = useCallback(
    debounce((value) => {
      const searchResultItems: any = document.querySelectorAll('.pac-item');
      if (searchResultItems && searchResultItems.length) {
        setNoSearchResult(false);
      } else if (value) {
        setNoSearchResult(true);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    const currentLat = Number(formValue.locationCoord.split(',')[0]);
    const currentLng = Number(formValue.locationCoord.split(',')[1]);
    if (formValue.image) {
      setBannerFile(formValue.image);
    }
    if (currentLat !== 0 && currentLng !== 0) {
      setShowLocationMap(true);
    }
    if (!formValue.location) {
      setShowLocationMap(false);
      setShowAddressInput(false);
      setShowAddMyLocationInput(false);
      setNoSearchResult(false);
    }
  }, [formValue]);

  useEffect(() => {
    if (formValue.location) {
      setShowAddressInput(true);
    }
  }, []);

  return (
    <>
      <Row>
        <Col span={24} className="main-title">
          {t('Event Info')}
        </Col>
      </Row>
      <CreateEventFormContainer>
        <div id="map" />
        <Row>
          <Col lg={(pageTipsShow && 14) || 21} span={24} className="left-form">
            <div className="main-box">
              <Form.Item required label="Event Name" name="name">
                <Input
                  showCount
                  maxLength={100}
                  onChange={(e) => fieldEdit(e.target.value, 'name')}
                />
              </Form.Item>
              <Form.Item required label="Organizer" name="organizerId">
                <Select
                  options={organizerData.map((item: OrganizerData) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={(value) => fieldEdit(value, 'organizerId')}
                />
              </Form.Item>
              {(!showAddMyLocationInput && (
                <>
                  <Form.Item
                    required
                    label="Location"
                    style={{ position: 'relative' }}
                  >
                    {isLoaded && (
                      <StandaloneSearchBox
                        onLoad={onSearchBoxLoad}
                        onPlacesChanged={onPlaceChanged}
                      >
                        <>
                          <Input
                            value={formValue.location}
                            placeholder={t('Search for a venue or address')}
                            prefix={<img src={Images.LocationIcon} alt="" />}
                            onChange={(e) => {
                              setMapLatLng({ lat: 0, lng: 0 });
                              fieldEdit(e.target.value, 'location');
                              handleCheckResult(e.target.value);
                            }}
                          />
                          {noSearchResult && (
                            <div className="noSearchResult">
                              <span>
                                {t(
                                  `Venue doesn't apprear in the suggestions dropdown?`,
                                )}
                              </span>
                              <NoSearchResultButton
                                onClick={() => {
                                  setShowAddMyLocationInput(true);
                                  setShowAddressInput(true);
                                }}
                              >
                                {t('Add as my location.')}
                              </NoSearchResultButton>
                            </div>
                          )}
                        </>
                      </StandaloneSearchBox>
                    )}
                    {mapLatLng.lat !== 0 &&
                      mapLatLng.lng !== 0 &&
                      showLocationMap && (
                        <GoogleMap
                          mapContainerStyle={{
                            width: '100%',
                            height: '220px',
                            marginTop: '10px',
                          }}
                          options={{
                            disableDefaultUI: true,
                          }}
                          center={mapLatLng}
                          zoom={10}
                          onLoad={onMapLoad}
                        />
                      )}
                  </Form.Item>
                </>
              )) || (
                <Form.Item required label="Location">
                  <Input
                    className="addMyLocation"
                    prefix={<img src={Images.LocationIcon} alt="" />}
                    value={formValue.location}
                    onChange={(e) => fieldEdit(e.target.value, 'location')}
                  />
                </Form.Item>
              )}
              {showAddressInput && (
                <Form.Item
                  label="Address"
                  name="address"
                  className="no-required"
                >
                  <Input
                    className="address"
                    onChange={(e) => fieldEdit(e.target.value, 'address')}
                  />
                </Form.Item>
              )}
              <Form.Item required label="Event Time" name="eventTime">
                <RangePicker
                  inputReadOnly
                  showTime={{ format: 'HH:mm' }}
                  format="MMM DD YYYY, HH:mm"
                  disabledDate={(currentDate) =>
                    currentDate &&
                    currentDate < moment().subtract(1, 'days').endOf('day')
                  }
                  onChange={(_, dateStrings) => {
                    fieldEdit(dateStrings, 'eventTime');
                  }}
                  placeholder={[
                    t('Select event start time'),
                    t('Select event end time'),
                  ]}
                />
              </Form.Item>
              <Form.Item
                required
                label="Event Banner Image"
                name="banner"
                className="banner-image-dragger"
              >
                <>
                  <Dragger {...bannerUploadProps} className="dragger-content">
                    {(bannerFile && (
                      <Col
                        className="content-preview"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img src={bannerFile} alt="" />
                        <div className="content-action-icon">
                          <Image
                            src={Images.PreviewEye}
                            alt=""
                            preview={false}
                            onClick={() => setShowPreviewBanner(true)}
                          />
                          <Image
                            src={Images.DeleteIcon}
                            alt=""
                            preview={false}
                            onClick={draggerUploadDeleteAction}
                          />
                        </div>
                      </Col>
                    )) || (
                      <>
                        <p className="ant-upload-drag-icon">
                          <PlusOutlined />
                        </p>
                        <p className="ant-upload-text">
                          {t('Drag or click to upload image')}
                        </p>
                      </>
                    )}
                  </Dragger>
                  <p className="dragger-tips">
                    {t('PNG, JPEG or GIF files only up to [size] MB in size', {
                      size: 5,
                    })}
                  </p>
                  <p className="dragger-tips">
                    {t('Recommended aspect ratio')}
                  </p>
                </>
              </Form.Item>
              <Form.Item
                required
                label="Event Short Description"
                name="eventShortDescription"
                className="eventShortDescription"
              >
                <TextArea
                  className="short-description-text-area"
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  showCount
                  maxLength={200}
                  onChange={(e) =>
                    fieldEdit(e.target.value, 'descriptionShort')
                  }
                />
              </Form.Item>
              <Form.Item
                required
                className="item-suggest-description"
                name="description"
              >
                <>
                  <Row className="event-detailed-description">
                    <Col lg={12} span={10}>
                      {t('Event Detailed Description')}
                    </Col>
                    <Col lg={12} span={14}>
                      <div>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={
                            openAiLoading ? undefined : suggestDescriptionAI
                          }
                        >
                          <img
                            className={openAiLoading ? 'loading' : ''}
                            src={Images.IntelligentIcon}
                            alt=""
                          />
                          <span>{t('Suggest Description')}</span>
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <TextArea
                    value={formValue.description}
                    className="description-text-area"
                    showCount
                    autoSize={{ minRows: 4, maxRows: 10 }}
                    maxLength={5000}
                    onChange={(e) => fieldEdit(e.target.value, 'description')}
                  />
                </>
              </Form.Item>
              <ImagesUpload
                fieldEdit={(value) => fieldEdit(value, 'descriptionImages')}
                onChange={(e) => fieldEdit(e, 'descriptionImagesFileList')}
                value={formValue.descriptionImagesFileList}
              />
              <Modal
                open={showCropImageModal}
                centered
                destroyOnClose
                closable={false}
                cancelText={t('Cancel')}
                okText={t('Save')}
                className="cropper-image-modal"
                onCancel={() => setShowCropImageModal(false)}
                onOk={showCroppedImage}
              >
                <Cropper
                  image={bannerImageBase64}
                  crop={crop}
                  zoom={zoom}
                  aspect={2 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </Modal>
            </div>
          </Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <TipsComponent
              title={t('Event Tips')}
              image={Images.EventTipsIcon}
              onSizeChange={setPageTipsShow}
              content={
                <Row>
                  <Col className="content-text" span={24}>
                    {t('Building a dope event!')}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(1) Keep your event name short and unique yet catchy. Don't be that parent giving fancy names nobody remembers.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(2) Imagine your Event Short Description as a pick up line. Keep it short, creative and intriguing.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `(3) Event Detailed Description is where you show off your content. But don't overdo it, nobody likes a show-off. We've integrated ChatGPT to help be creative and summarise where necessary. Don't worry, this isn't a test.`,
                    )}
                  </Col>
                </Row>
              }
            />
          </Col>
        </Row>
        <Modal
          open={showPreviewBanner}
          title={t('Banner Image')}
          footer={null}
          onCancel={() => setShowPreviewBanner(false)}
        >
          <img alt="" className="preview-img" src={bannerFile} />
        </Modal>
      </CreateEventFormContainer>
    </>
  );
};

export default EventInfo;
