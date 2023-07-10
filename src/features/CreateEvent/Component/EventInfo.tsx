import React, { useEffect, useState } from 'react';
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
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useAppDispatch } from '../../../app/hooks';
import { Images } from '../../../theme';
import { UploadFileAcceptType } from '../../../constants/General';
import { OrganizerData, uploadFileAction } from '../CreateEvent.slice';
import { CreateEventFormContainer } from '../CreateEventComponent';
import TipsComponent from '../../../components/Tips';
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Dragger } = Upload;

export interface EventInfoFormValueProps {
  eventName: string;
  location: string;
  organizerId: string;
  address: string;
  startTime: string;
  endTime: string;
  banner: string;
  eventShortDescription: string;
  description: string;
  detailImage: string;
  images: any[];
}

const EventInfo = ({
  organizerData,
  formValue,
  fieldEdit,
}: {
  organizerData: OrganizerData[];
  formValue: EventInfoFormValueProps;
  fieldEdit: (value: any, field: string) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [bannerFile, setBannerFile] = useState<string>('');
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [showPreviewBanner, setShowPreviewBanner] = useState<boolean>(false);

  const customRequest = async (e: any, type: string) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      if (type === 'banner') {
        setBannerFile(response.payload.url);
        fieldEdit(response.payload.url, 'banner');
      } else {
        fieldEdit(response.payload.url, 'detailImage');
      }
      e.onSuccess();
      message.success(t('Upload successful.'));
    } else {
      e.onError();
      message.error(t('Upload failed, please try again.'));
    }
  };

  const bannerUploadProps: UploadProps = {
    name: 'banner',
    multiple: false,
    fileList: [],
    customRequest: (e) => customRequest(e, 'banner'),
    beforeUpload: (file) => {
      const { type, size } = file;
      const isLimit =
        size / 1024 / 1024 < 5 && UploadFileAcceptType.includes(type);
      if (!isLimit) {
        message.error(
          t(
            'Invalid file format or size. Please upload a PNG, JPEG, or GIF image that is up to 10 MB in size.',
          ),
        );
      }
      return isLimit;
    },
  };

  const draggerUploadDeleteAction = () => {
    setBannerFile('');
  };

  const suggestDescriptionAI = () => {
    if (!formValue.description) {
      message.error(
        t(
          'Please enter content before using the AI tool to generate a suggested description.',
        ),
      );
    }
  };

  useEffect(() => {
    if (formValue.banner) {
      setBannerFile(formValue.banner);
    }
  }, [formValue]);

  return (
    <>
      <Row>
        <Col span={24} className="main-title">
          {t('Event Info')}
        </Col>
      </Row>
      <CreateEventFormContainer>
        <Row>
          <Col lg={(pageTipsShow && 14) || 21} span={24} className="left-form">
            <div className="main-box">
              <Form.Item label="Event Name" name="eventName">
                <Input
                  showCount
                  maxLength={100}
                  onChange={(e) => fieldEdit(e.target.value, 'eventName')}
                />
              </Form.Item>
              <Form.Item label="Organizer" name="organizerId">
                <Select
                  options={organizerData.map((item: OrganizerData) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onChange={(value) => fieldEdit(value, 'organizerId')}
                />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                style={{ position: 'relative' }}
              >
                <>
                  <Input
                    value={formValue.location}
                    placeholder={t('Search for a venue or address')}
                    prefix={<img src={Images.LocationIcon} alt="" />}
                    onChange={(e) => fieldEdit(e.target.value, 'location')}
                  />
                  {/* {formValue.location && (
                    <ul className="search-location-items">
                      <li>
                        <span>
                          {t(
                            `Venue doesn't apprear in the suggestions dropdown?`,
                          )}
                        </span>
                        <span className="add-location">
                          {t('Add as my location.')}
                        </span>
                      </li>
                    </ul>
                  )} */}
                </>
              </Form.Item>
              {formValue.location && (
                <>
                  <div className="map-container">
                    <img src={Images.TestMap} alt="" />
                  </div>
                  <Form.Item
                    label="Address"
                    name="address"
                    className="no-required"
                  >
                    <Input
                      onChange={(e) => fieldEdit(e.target.value, 'address')}
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item label="Event Time" name="eventTime">
                <RangePicker
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
                label="Event Banner Image"
                name="banner"
                className="banner-image-dragger"
              >
                <>
                  <ImgCrop
                    rotationSlider
                    modalTitle={t('Edit image ratio')}
                    aspect={2 / 1}
                  >
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
                  </ImgCrop>
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
                label="Event Short Description"
                name="eventShortDescription"
              >
                <Input
                  showCount
                  maxLength={200}
                  onChange={(e) =>
                    fieldEdit(e.target.value, 'eventShortDescription')
                  }
                />
              </Form.Item>
              <Form.Item
                className="item-suggest-description"
                name="description"
              >
                <>
                  <Row className="event-detailed-description">
                    <Col lg={12} span={10}>
                      {t('Event Detailed Description')}
                    </Col>
                    <Col
                      lg={12}
                      span={14}
                      style={{ cursor: 'pointer' }}
                      onClick={suggestDescriptionAI}
                    >
                      <img src={Images.IntelligentIcon} alt="" />
                      <span>{t('Suggest Description')}</span>
                    </Col>
                  </Row>
                  <TextArea
                    showCount
                    maxLength={5000}
                    onChange={(e) => fieldEdit(e.target.value, 'description')}
                  />
                </>
              </Form.Item>
              <ImagesUpload
                onChange={(e) => fieldEdit(e, 'images')}
                value={formValue.images}
              />
            </div>
          </Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <TipsComponent
              title={t('Event Tips')}
              image={Images.ProfileTipsBg}
              onSizeChange={() => setPageTipsShow(!pageTipsShow)}
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
