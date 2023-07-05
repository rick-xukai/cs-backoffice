import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Tabs,
  Modal,
  message,
  Spin,
} from 'antd';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { mapEditEventTicket } from '../../utils/func';
import {
  defaultCurrentPage,
  defaultOrganizerPageSize,
  TokenExpireResponseCode,
} from '../../constants/General';
import {
  CreateEventContainer,
  CreateEventFormContainer,
  UploadIcon,
  UploadText,
  ImageDragger,
  DraggetForm,
  ImagesContainer,
  ImageItem,
  ImageHandlerContainer,
} from './CreateEventComponent';
import {
  reset,
  selectError,
  selectData,
  uploadFileAction,
  selectLoading,
  CreateEventPayloadType,
  TicketTypes,
  selectOrganizerData,
  OrganizerData,
  getOrganizerAction,
  createEventAction,
  updateEventAction,
} from './CreateEvent.slice';
import { EventDetailDataType } from '../EventDetail/EventDetail.slice';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import UploadFileComponent from '../../components/UploadFile/UploadFileComponent';
import TicketTab from './Component/TicketTab';
import { Colors, Images } from '../../theme';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { confirm } = Modal;

export enum ImageSizes {
  small = 8,
  middle = 12,
  large = 24,
}
const CreateEvent = ({
  isEdit = false,
  editEventID,
  eventData,
  setEditEvent,
}: {
  isEdit: boolean;
  editEventID: string;
  eventData: EventDetailDataType;
  setEditEvent: (status: boolean) => void;
}) => {
  const mainBoxLeft: any = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const organizerData = useAppSelector(selectOrganizerData);
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectLoading);
  const createEventResponseData = useAppSelector(selectData);

  const [activeKey, setActiveKey] = useState<string>('0');
  const [items, setItems] = useState<any>([]);
  const [eventFormData, setEventFormData] = useState<CreateEventPayloadType>({
    organizerId: (eventData && eventData.organizerId) || '',
    name: (eventData && eventData.name) || '',
    description: (eventData && eventData.description) || '',
    location: (eventData && eventData.location) || '',
    startTime: (eventData && eventData.startTime) || '',
    endTime: (eventData && eventData.endTime) || '',
    image: (eventData && eventData.image) || '',
    royaltiesFee: '',
  });
  const [eventTicketData, setEventTicketData] = useState<TicketTypes[]>(
    (eventData && mapEditEventTicket(eventData.ticketTypes)) || [],
  );
  const [ticketRequiredFields, setTicketRequiredFields] =
    useState<boolean>(false);
  const [ticketTypesContainerHeight, setTicketTypesContainerHeight] =
    useState<string>('0px');
  const [newTabIndex, setNewTabIndex] = useState<number>(0);
  const [fileList, setFileList] = useState<any>([]);
  const [changeTicketField, setChangeTicketField] = useState<any>({});
  const [imageList, setImageList] = useState<any>([]);
  const onFinish = (values: CreateEventPayloadType) => {
    const payload = {
      ...values,
      startTime: values.startTime[0],
      endTime: values.startTime[1],
      image: eventFormData.image,
      organizerId: eventFormData.organizerId,
      ticketTypes: cloneDeep(eventTicketData).map((item) => {
        let ceilingPrice = 0;
        let purchaseLimit = 0;
        if (item.ceilingPrice !== '') {
          ceilingPrice = Number(item.ceilingPrice);
        }
        if (item.purchaseLimit !== '') {
          purchaseLimit = Number(item.purchaseLimit);
        }
        return {
          ...item,
          price: Number(item.price),
          stock: Number(item.stock),
          ceilingPrice,
          purchaseLimit,
          ticketTypeId: undefined,
          royaltiesFee:
            ((eventFormData.royaltiesFee || eventFormData.royaltiesFee === 0) &&
              Number(eventFormData.royaltiesFee) / 100) ||
            0,
        };
      }),
    };
    delete payload.royaltiesFee;
    confirm({
      centered: true,
      title:
        (!isEdit && t('You are about to publish your event.')) ||
        t('Save your event.'),
      okText: (!isEdit && t('Publish')) || t('Save'),
      cancelText: t('Cancel'),
      icon: <ExclamationCircleOutlined />,
      content: t('Are you sure you want to [action]?', {
        action: (!isEdit && 'proceed') || 'save',
      }),
      onOk() {
        if (!isEdit) {
          dispatch(createEventAction(payload));
        } else {
          dispatch(updateEventAction({ payload, id: editEventID })).then(
            (response) => {
              if (response.type === updateEventAction.fulfilled.toString()) {
                history.push(UserRoutes.events);
                message.success(t('Save successfully'));
              }
            },
          );
        }
      },
    });
  };

  useEffect(() => {
    if (changeTicketField.ticketTypeId) {
      const currentTicket: any = eventTicketData.find(
        (item) => item.ticketTypeId === changeTicketField.ticketTypeId,
      );
      const unchangedTicket = eventTicketData.filter(
        (item) => item.ticketTypeId !== changeTicketField.ticketTypeId,
      );
      setEventTicketData([
        ...unchangedTicket,
        { ...currentTicket, ...changeTicketField },
      ]);
    }
  }, [changeTicketField]);

  const submitTicketData = (data: any) => {
    setChangeTicketField(data);
  };

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const addTicketTab = (closable?: boolean) => {
    const newActiveKey = (newTabIndex + 1).toString();
    setNewTabIndex(Number(newActiveKey));
    const newPanes: any = [...items];
    newPanes.push({
      label: `Ticket ${newActiveKey}`,
      children: (
        <TicketTab
          setTicketRequiredFields={setTicketRequiredFields}
          submitTicketData={submitTicketData}
          formName={`Ticket ${newActiveKey}`}
        />
      ),
      key: newActiveKey,
      closeIcon: <DeleteOutlined />,
      closable,
    });
    if (newPanes.length > 1) {
      newPanes[0] = { ...newPanes[0], closable: true };
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setEventTicketData([
      ...eventTicketData,
      {
        ticketTypeId: `Ticket ${newActiveKey}`,
        name: '',
        description: '',
        price: '',
        stock: '',
        ceilingPrice: '',
        purchaseLimit: '',
        royaltiesFee: '',
        image: '',
        imageType: '',
        thumbnailType: '',
        thumbnailUrl: '',
      },
    ]);
  };

  const removeTicketTab = (targetKey: string) => {
    confirm({
      centered: true,
      title: t('Are you sure you want to delete this Ticket Type?'),
      okText: t('Delete'),
      cancelText: t('Cancel'),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `This item will be deleted immediately. You can't undo tis action.`,
      ),
      onOk() {
        let newActiveKey = activeKey;
        let isRemoveNewTab = false;
        let lastIndex = -1;
        items.forEach((item: any, i: number) => {
          if (item.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = items.filter((item: any) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex].key;
          } else {
            newActiveKey = newPanes[0].key;
          }
        }
        if (newPanes.length === 1) {
          newPanes[0] = { ...newPanes[0], closable: false };
        }
        eventTicketData.forEach((item) => {
          if (item.name || item.description || item.price || item.image) {
            setTicketRequiredFields(false);
          }
        });
        if (isEdit && Number(targetKey) > eventData.ticketTypes.length) {
          isRemoveNewTab = true;
        }
        if (isEdit && !isRemoveNewTab) {
          const deleteTicket: any = eventTicketData.find(
            (item) => item.ticketTypeId === `Ticket ${targetKey}`,
          );
          const undeletedTicket = eventTicketData.filter(
            (item) => item.ticketTypeId !== `Ticket ${targetKey}`,
          );
          setEventTicketData([
            ...undeletedTicket,
            { ...deleteTicket, delete: true },
          ]);
        } else {
          setEventTicketData(
            eventTicketData.filter(
              (item: TicketTypes) =>
                item.ticketTypeId !== `Ticket ${targetKey}`,
            ),
          );
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
      },
    });
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      addTicketTab();
    } else {
      removeTicketTab(targetKey);
    }
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleUploadImagesChange = (info: any) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file: any) => {
      const newFile = { ...file };
      if (file.response) {
        newFile.column = newFile.column || ImageSizes.large;
      }
      if (!info.event) {
        newFile.status = 'done';
      }
      return newFile;
    });
    setImageList(newFileList);
  };

  const handleRemoveImage = (index: number) => () => {
    imageList.splice(index, 1);
    setImageList([...imageList]);
  };

  const handleUpOrderImage = (index: number) => () => {
    if (!index) return;
    const newImageList = [...imageList];
    newImageList.splice(index, 1);
    newImageList.splice(index - 1, 0, imageList[index]);
    setImageList(newImageList);
  };

  const handleChangeSize = (index: any, size: any) => () => {
    let newSize = ImageSizes.large;
    if (size === ImageSizes.large) {
      newSize = ImageSizes.small;
    } else if (size === ImageSizes.small) {
      newSize = ImageSizes.middle;
    } else {
      newSize = ImageSizes.large;
    }
    const newImageList = [...imageList];
    newImageList[index].column = newSize;
    setImageList([...newImageList]);
  };

  const handleFileRemove = () => {
    setEventFormData({ ...eventFormData, image: '' });
  };

  const customRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      setEventFormData({ ...eventFormData, image: response.payload.url });
      e.onSuccess();
    } else {
      e.onError();
    }
  };

  const uploadImageRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      e.onSuccess(response.payload.url);
    } else {
      e.onError();
    }
  };

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (createEventResponseData.id) {
      history.push(UserRoutes.events);
      message.success(
        t('Your event has been added. Time to start selling tickets!'),
      );
    }
  }, [createEventResponseData]);

  useEffect(() => {
    setTicketTypesContainerHeight(`${mainBoxLeft.current.clientHeight}px`);
    dispatch(
      getOrganizerAction({
        page: defaultCurrentPage,
        size: defaultOrganizerPageSize,
      }),
    );
    if (!items.length && !eventData) {
      addTicketTab(false);
    }
    if (eventData) {
      let newActiveKey = activeKey;
      let editTicketNewTabIndex = 0;
      const newPanes: any = [];
      setFileList([
        {
          uid: '1',
          name: t('Event Image'),
          status: 'done',
          url: eventData.image,
        },
      ]);
      eventData.ticketTypes.forEach((item, index) => {
        newActiveKey = (index + 1).toString();
        newPanes.push({
          label: `Ticket ${newActiveKey}`,
          children: (
            <TicketTab
              setTicketRequiredFields={setTicketRequiredFields}
              submitTicketData={submitTicketData}
              formName={`Ticket ${newActiveKey}`}
              editTicketData={item}
            />
          ),
          key: newActiveKey,
          closeIcon: <DeleteOutlined />,
        });
        editTicketNewTabIndex += 1;
      });
      if (eventData.ticketTypes.length === 1) {
        newPanes[0] = { ...newPanes[0], closable: false };
      }
      setItems(newPanes);
      setActiveKey('1');
      setNewTabIndex(editTicketNewTabIndex);
      setEventFormData({
        ...eventFormData,
        royaltiesFee:
          (eventData.ticketTypes[0].royaltiesFee &&
            eventData.ticketTypes[0].royaltiesFee * 100) ||
          '',
      });
    }
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <CreateEventContainer>
      {!isEdit && (
        <PageHeaderComponent
          title={t('Create New Event')}
          showBackArrow
          clickBack={() => history.push(UserRoutes.events)}
        />
      )}
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin />}
        size="large"
      >
        <div className={(!isEdit && 'page-main') || 'edit-event-page-main'}>
          <Form
            name="event"
            onFinish={onFinish}
            initialValues={{
              ...eventData,
              organizerId:
                (eventData && eventData.organizerName) ||
                eventFormData.organizerId,
              startTime:
                (eventData && [
                  moment(eventFormData.startTime),
                  moment(eventFormData.endTime),
                ]) ||
                null,
            }}
          >
            <Row>
              <Col span={24} className="publish-event">
                {isEdit && (
                  <Button
                    className="cancel-btn"
                    onClick={() => setEditEvent(false)}
                  >
                    {t('Cancel')}
                  </Button>
                )}
                <Button
                  disabled={
                    !eventFormData.description ||
                    !eventFormData.startTime ||
                    !eventFormData.location ||
                    !eventFormData.name ||
                    !eventFormData.organizerId ||
                    !eventFormData.image ||
                    ticketRequiredFields ||
                    loading
                  }
                  htmlType="submit"
                >
                  {(isEdit && t('Save')) || t('Publish')}
                </Button>
              </Col>
            </Row>
            <CreateEventFormContainer
              containerHight={ticketTypesContainerHeight}
            >
              <Row gutter={[24, 24]}>
                <Col span={12} style={{ paddingLeft: 0 }}>
                  <div ref={mainBoxLeft} className="main-box">
                    <Form.Item label="Event Name" name="name">
                      <Input
                        showCount
                        maxLength={100}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Organizer" name="organizerId">
                      <Select
                        disabled={isEdit}
                        options={organizerData.map((item: OrganizerData) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        onChange={(value) =>
                          setEventFormData({
                            ...eventFormData,
                            organizerId: value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                      <Input
                        showCount
                        maxLength={200}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            location: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Event Time" name="startTime">
                      <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="MMM DD YYYY, HH:mm"
                        disabledDate={(currentDate) =>
                          currentDate &&
                          currentDate <
                            moment().subtract(1, 'days').endOf('day')
                        }
                        onChange={(_, dateStrings) =>
                          setEventFormData({
                            ...eventFormData,
                            startTime: dateStrings[0],
                            endTime: dateStrings[1],
                          })
                        }
                        placeholder={[
                          t('Select event start time'),
                          t('Select event end time'),
                        ]}
                      />
                    </Form.Item>
                    <Form.Item label="Event Description" name="description">
                      <TextArea
                        showCount
                        maxLength={5000}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Event Image" name="image">
                      <UploadFileComponent
                        accept="image/png, image/jpeg, image/gif"
                        fileList={fileList}
                        previewImageUrl={eventFormData.image}
                        previewType="image"
                        limitFileSize={15}
                        handleChange={handleUploadChange}
                        customRequest={customRequest}
                        handleFileRemove={handleFileRemove}
                        description={{
                          type: t('PNG, JPEG or GIF files only'),
                          size: t('up to [size] MB in size', { size: '15' }),
                        }}
                      />
                    </Form.Item>
                    <Form.Item className="not-required" label="Royalty Fee">
                      <Input
                        suffix="%"
                        value={eventFormData.royaltiesFee}
                        onChange={(e) =>
                          setEventFormData({
                            ...eventFormData,
                            royaltiesFee: e.target.value.replace(
                              /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                              '$1',
                            ),
                          })
                        }
                      />
                    </Form.Item>
                    <ImagesContainer gutter={[16, 16]}>
                      {imageList.map((item: any, index: number) =>
                        item.response ? (
                          <ImageItem
                            lg={item.column}
                            sm={ImageSizes.large}
                            xs={ImageSizes.large}
                          >
                            <div className="image-content">
                              <img src={item.response} alt="img" />
                              <div className="image-handler">
                                <div className="handler-list">
                                  {index ? (
                                    <ImageHandlerContainer
                                      onClick={handleUpOrderImage(index)}
                                    >
                                      <img
                                        src={Images.ImageUpwardIcon}
                                        alt="up"
                                      />
                                    </ImageHandlerContainer>
                                  ) : null}

                                  <ImageHandlerContainer
                                    onClick={handleRemoveImage(index)}
                                  >
                                    <img
                                      src={Images.ImageDeleteIcon}
                                      alt="delete"
                                    />
                                  </ImageHandlerContainer>
                                  <ImageHandlerContainer
                                    onClick={handleChangeSize(
                                      index,
                                      item.column,
                                    )}
                                  >
                                    <img
                                      src={Images.ImageChangeSizeIcon}
                                      alt="change"
                                    />
                                  </ImageHandlerContainer>
                                </div>
                              </div>
                            </div>
                          </ImageItem>
                        ) : (
                          <Spin
                            spinning
                            indicator={<LoadingOutlined spin />}
                            size="large"
                            style={{ margin: 'auto' }}
                          />
                        ),
                      )}
                    </ImagesContainer>
                    <DraggetForm label="">
                      <ImageDragger
                        {...{
                          accept: 'image/png, image/jpeg',
                          name: 'banner',
                          multiple: false,
                          fileList: [],
                        }}
                        onChange={handleUploadImagesChange}
                        customRequest={uploadImageRequest}
                        fileList={imageList}
                      >
                        <>
                          <UploadIcon>
                            <PlusOutlined
                              style={{ fontSize: 14, color: Colors.grey6 }}
                            />
                          </UploadIcon>
                          <UploadText>
                            {t('Drag or click to upload image')}
                          </UploadText>
                        </>
                      </ImageDragger>
                    </DraggetForm>
                  </div>
                </Col>
                <Col span={12} style={{ paddingRight: 0 }}>
                  <Tabs
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit as any}
                    items={items}
                  />
                </Col>
              </Row>
            </CreateEventFormContainer>
          </Form>
        </div>
      </Spin>
    </CreateEventContainer>
  );
};

export default CreateEvent;
