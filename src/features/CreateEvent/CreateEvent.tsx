import React, { useEffect, useState } from 'react';
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
} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes } from '../../navigation/Routes';
import { FormatTimeKeys } from '../../constants/Keys';
import {
  defaultCurrentPage,
  defaultOrganizerPageSize,
} from '../../constants/General';
import {
  CreateEventContainer,
  CreateEventFormContainer,
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
} from './CreateEvent.slice';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import UploadFileComponent from '../../components/UploadFile/UploadFileComponent';
import TicketTab from './Component/TicketTab';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { confirm } = Modal;

const CreateEvent = () => {
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
    organizerId: '',
    name: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    image: '',
    royaltiesFee: '',
  });
  const [eventTicketData, setEventTicketData] = useState<TicketTypes[]>([]);
  const [ticketRequiredFields, setTicketRequiredFields] =
    useState<boolean>(false);
  const [newTabIndex, setNewTabIndex] = useState<number>(0);
  const [fileList, setFileList] = useState<any>([]);

  const onFinish = (values: CreateEventPayloadType) => {
    const ticketTypes = cloneDeep(eventTicketData);
    ticketTypes.forEach((item: any) => {
      // eslint-disable-next-line
      item.royaltiesFee =
        (eventFormData.royaltiesFee && Number(eventFormData.royaltiesFee)) || 0;
      // eslint-disable-next-line
      delete item.ticketTypeId;
    });
    const payload = {
      ...values,
      startTime: values.startTime[0],
      endTime: values.startTime[1],
      image: eventFormData.image,
      ticketTypes,
    };
    delete payload.royaltiesFee;
    confirm({
      centered: true,
      title: t('You are about to publish your event.'),
      okText: t('Publish'),
      cancelText: t('Cancel'),
      icon: <ExclamationCircleOutlined />,
      content: t(`Are you sure you want to proceed?`),
      onOk() {
        dispatch(createEventAction(payload));
      },
    });
  };

  const submitTicketData = (data: TicketTypes) => {
    setEventTicketData([...eventTicketData, data]);
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
          if (item.name || item.description || item.price) {
            setTicketRequiredFields(false);
          }
        });
        setEventTicketData(
          eventTicketData.filter(
            (item: TicketTypes) =>
              item.ticketTypeId !== `Ticket ${Number(targetKey) + 1}`,
          ),
        );
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

  useEffect(() => {
    if (error) {
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
    dispatch(
      getOrganizerAction({
        page: defaultCurrentPage,
        size: defaultOrganizerPageSize,
      }),
    );
    if (!items.length) {
      addTicketTab(false);
    }
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <CreateEventContainer>
      <PageHeaderComponent
        title={t('Create New Event')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.events)}
      />
      <div className="page-main">
        <Form name="event" onFinish={onFinish}>
          <Row>
            <Col span={24} className="publish-event">
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
                {t('Publish')}
              </Button>
            </Col>
          </Row>
          <CreateEventFormContainer gutter={[24, 24]}>
            <Col span={12} style={{ paddingLeft: 0 }}>
              <div className="main-box">
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
                    format={FormatTimeKeys.norm}
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
                    maxLength={500}
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
                    limitFileSize={5}
                    handleChange={handleUploadChange}
                    customRequest={customRequest}
                    description={{
                      type: t('PNG, JPEG or GIF files only'),
                      size: t('up to [size] MB in size', { size: '5' }),
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
          </CreateEventFormContainer>
        </Form>
      </div>
    </CreateEventContainer>
  );
};

export default CreateEvent;
