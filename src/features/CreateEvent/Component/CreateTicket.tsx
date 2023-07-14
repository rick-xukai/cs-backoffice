import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Checkbox,
  DatePicker,
  Select,
  Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Images } from '../../../theme';
import {
  ConnectTicketItem,
  ConnectTicketsList,
  ConnectTicketsTitle,
  CreateEventFormContainer,
  EventList,
  FoldingPanel,
} from '../CreateEventComponent';
import { EventInfoFormValueProps, TicketListProps } from './EventInfo';
import { MMM_DD_YYYY_HH_MM, SGD_UNIT } from '../../../constants/constants';
import QuestionTooltip from '../../../components/QuestionTooltip';
// eslint-disable-next-line import/no-cycle
import {
  CreateTicketStatus,
  EmptyState,
  EventListItem,
  SelectEventsModal,
  TickImageUpload,
  TipsCmp,
} from './CreateTicketComponents';
import { calculatePrice, requiredValidateForm } from '../../../utils/func';

const { RangePicker } = DatePicker;

const initialValues = {
  ticketName: '',
  ticketImage: '',
  totalAvailableQuantity: '',
  ticketPrice: '',
  absorbFees: false,
  sellingStartTime: '',
  sellingEndTime: '',
  ticketDescription: '',
  royaltyFee: '',
  ticketCeilingPrice: '',
  visibility: true,
  connectedTickets: [],
  ticketImageType: '',
  ticketThumbnailUrl: '',
  ticketThumbnailType: '',
  id: '',
};

const getEventListItemStatus: any = (startTime: string, endTime: string) => {
  const today = moment().unix();
  const startTimeMoment = moment(startTime).unix();
  const endTimeMoment = moment(endTime).unix();
  if (today >= startTimeMoment && today <= endTimeMoment) {
    return {
      status: 'success',
      statusText: 'On Sale',
    };
  }
  if (today < startTimeMoment) {
    return {
      status: 'warning',
      statusText: 'Scheduled',
    };
  }
  return {
    status: 'default',
    statusText: 'Ended',
  };
};

const CreateTicket = ({
  createTicketStatus,
  setCreateTicketStatus,
  formValue,
  fieldEdit,
  notSaveConfirm,
}: {
  createTicketStatus: CreateTicketStatus;
  setCreateTicketStatus: any;
  formValue: EventInfoFormValueProps;
  fieldEdit: (value: any, field?: string) => void;
  notSaveConfirm: any;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);
  const [thumbnaiFileList, setThumbnaiFileList] = useState<any>([]);
  const [ticketValue, setTicketValue] = useState<TicketListProps>({
    ...initialValues,
    sellingEndTime: formValue.startTime,
  });
  useEffect(() => {
    setTicketValue({
      ...ticketValue,
      sellingEndTime: formValue.startTime,
    });
  }, [formValue.startTime, createTicketStatus]);
  const [onSave, setOnSave] = useState(false);

  const changeTicketValues = (value: any, field?: string) => {
    if (field) {
      setTicketValue({
        ...ticketValue,
        [field]: value,
      });
    } else {
      setTicketValue({
        ...ticketValue,
        ...value,
      });
    }
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };
  const handleThumbnaiUploadChange = (info: any) => {
    setThumbnaiFileList(info.fileList);
  };

  useEffect(() => {
    setFileList(
      ticketValue.ticketImage
        ? [
            {
              url: ticketValue.ticketImage,
              type: ticketValue.ticketImageType,
              thumbUrl: ticketValue.ticketImage,
              uid: ticketValue.ticketImage,
              name: ticketValue.ticketImage,
            },
          ]
        : [],
    );
  }, [ticketValue.ticketImage]);
  useEffect(() => {
    setThumbnaiFileList(
      ticketValue.ticketThumbnailUrl
        ? [
            {
              url: ticketValue.ticketThumbnailUrl,
              type: ticketValue.ticketThumbnailType,
              thumbUrl: ticketValue.ticketThumbnailUrl,
              uid: ticketValue.ticketThumbnailUrl,
              name: ticketValue.ticketThumbnailUrl,
            },
          ]
        : [],
    );
  }, [ticketValue.ticketThumbnailUrl]);

  const [eventsListData, setEventsListData] = useState([
    {
      eventName: 'Legacy Glowhard 2023: A New Realm',
      ticketName: 'SVIP',
      id: 1,
      checked: false,
    },
    {
      eventName: 'Legacy Glowhard 2023: A New Realme',
      ticketName: 'SVIPP',
      id: 2,
      checked: false,
    },
  ]);

  const handleSelectEvents = (checked: boolean, index: number) => {
    eventsListData[index].checked = checked;
    setEventsListData([...eventsListData]);
  };
  const doneHandle = () => {
    changeTicketValues({
      connectedTickets: eventsListData.filter((item) => item.checked),
    });
    setOpen(false);
  };

  useEffect(() => {
    setEventsListData(
      eventsListData.map((item) => ({
        ...item,
        checked: !!ticketValue.connectedTickets.find(
          (ticket) => item.id === ticket.id,
        ),
      })),
    );
  }, [formValue]);
  const handleDeleteEvent = (index: number) => {
    ticketValue.connectedTickets.splice(index, 1);
    changeTicketValues({
      connectedTickets: [...ticketValue.connectedTickets],
    });
  };

  const hanldleCheckAll = (value: boolean) => {
    setEventsListData(
      eventsListData.map((item) => ({
        ...item,
        checked: value,
      })),
    );
  };
  const handleAddTicket = () => {
    setCreateTicketStatus(CreateTicketStatus.add);
  };
  useEffect(() => {
    setCreateTicketStatus(CreateTicketStatus.list);
  }, []);

  useEffect(() => {
    if (createTicketStatus === CreateTicketStatus.list) {
      setTicketValue({ ...initialValues });
    }
    setOnSave(false);
  }, [createTicketStatus]);

  const handleSave = () => {
    setOnSave(true);
    if (
      !ticketValue.ticketName ||
      !ticketValue.ticketImage ||
      !ticketValue.ticketPrice ||
      !ticketValue.totalAvailableQuantity ||
      !ticketValue.sellingStartTime ||
      !ticketValue.sellingEndTime
    ) {
      return;
    }
    setCreateTicketStatus(CreateTicketStatus.edit);
    if (createTicketStatus === CreateTicketStatus.edit) {
      const newTicketList = [...formValue.ticketList];
      const findIndex = formValue.ticketList.findIndex(
        (item) => item.id === ticketValue.id,
      );
      newTicketList[findIndex] = { ...ticketValue };
      fieldEdit(newTicketList, 'ticketList');
    } else {
      fieldEdit(
        [
          { ...ticketValue, id: `add_${new Date().getTime()}` },
          ...formValue.ticketList,
        ],
        'ticketList',
      );
    }
    setCreateTicketStatus(CreateTicketStatus.list);
  };

  const handleCancelCreateTicket = () => {
    notSaveConfirm(
      () => {
        handleSave();
      },
      () => {
        setCreateTicketStatus(CreateTicketStatus.list);
      },
      'Save',
    );
  };
  const onDelete = (index: any, item: any) => {
    Modal.confirm({
      className: 'notSaveConfirmModal',
      centered: true,
      closable: false,
      okText: 'Delete',
      cancelText: 'Cancel',
      title: 'Delete Ticket',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${item.ticketName}?`,
      onOk: () => {
        formValue.ticketList.splice(index, 1);
        fieldEdit({
          ticketList: [...formValue.ticketList],
        });
      },
    });
  };
  const onEdit = (index: any, item: any) => {
    setTicketValue({ ...item });
    setCreateTicketStatus(CreateTicketStatus.edit);
  };
  const calculatedPrice = calculatePrice(
    Number(ticketValue.ticketPrice),
    ticketValue.absorbFees,
  );

  const renderContent = () => {
    if (createTicketStatus === CreateTicketStatus.list) {
      if (!formValue.ticketList.length)
        return <EmptyState handleAddTicket={handleAddTicket} />;
      return (
        <>
          <Row justify="space-between" align="middle" className="main-title">
            <Col>{t('Create Ticket')}</Col>
            <Col>
              <Button
                onClick={handleAddTicket}
                style={{
                  width: 121,
                  height: 40,
                  borderRadius: 0,
                  lineHeight: '12px',
                }}
                type="primary"
              >
                {t('Add Ticket')}
              </Button>
            </Col>
          </Row>
          <EventList>
            {formValue.ticketList.map((item, index) => (
              <EventListItem
                image={item.ticketImage}
                title={item.ticketName}
                totalAvailableQuantity={`0 / ${item.totalAvailableQuantity}`}
                ticketPrice={item.ticketPrice}
                sellingTime={`${item.sellingStartTime} - ${item.sellingEndTime}`}
                key={item.id}
                onDelete={onDelete}
                onEdit={onEdit}
                item={item}
                index={index}
                {...getEventListItemStatus(
                  item.sellingStartTime,
                  item.sellingEndTime,
                )}
              />
            ))}
          </EventList>
        </>
      );
    }
    if (
      createTicketStatus === CreateTicketStatus.edit ||
      createTicketStatus === CreateTicketStatus.add
    ) {
      return (
        <>
          <Row>
            <Col span={24} className="main-title">
              {t('Tickct Info')}
            </Col>
          </Row>
          <CreateEventFormContainer>
            <Row>
              <Col lg={(pageTipsShow && 14) || 21} span={24}>
                <div className="main-box">
                  <Form.Item
                    label="Ticket Name"
                    required
                    {...requiredValidateForm(
                      ticketValue.ticketName,
                      'Ticket Name',
                      onSave,
                    )}
                  >
                    <Input
                      showCount
                      maxLength={100}
                      onChange={(e) =>
                        changeTicketValues(e.target.value, 'ticketName')
                      }
                      value={ticketValue.ticketName}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ticket Image"
                    required
                    {...requiredValidateForm(
                      ticketValue.ticketImage,
                      'Ticket Image',
                      onSave,
                    )}
                  >
                    <TickImageUpload
                      formValue={ticketValue}
                      handleUploadChange={handleUploadChange}
                      fileList={fileList}
                      thumbnaiFileList={thumbnaiFileList}
                      handleThumbnaiUploadChange={handleThumbnaiUploadChange}
                      changeTicketValues={changeTicketValues}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      marginRight: 16,
                    }}
                    label="Total Available Quantity"
                    required
                    {...requiredValidateForm(
                      ticketValue.totalAvailableQuantity,
                      'Total Available Quantity',
                      onSave,
                    )}
                  >
                    <Row gutter={6} align="middle" wrap={false}>
                      <Col style={{ flexShrink: 0 }}>0 Sold /</Col>
                      <Col flex="auto">
                        <Input
                          style={{ height: 38 }}
                          onChange={(e) =>
                            changeTicketValues(
                              e.target.value,
                              'totalAvailableQuantity',
                            )
                          }
                          value={ticketValue.totalAvailableQuantity}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                    }}
                    label="Ticket Price"
                    required
                    {...requiredValidateForm(
                      ticketValue.ticketPrice,
                      'Ticket Price',
                      onSave,
                    )}
                    help={
                      ticketValue.ticketPrice
                        ? `User Pay: ${calculatedPrice.userPay} SGD. Take Home: ${calculatedPrice.takeHome} SGD`
                        : requiredValidateForm(
                            ticketValue.ticketPrice,
                            'Ticket Price',
                            onSave,
                          ).help
                    }
                  >
                    <Input
                      onChange={(e) =>
                        changeTicketValues(e.target.value, 'ticketPrice')
                      }
                      value={ticketValue.ticketPrice}
                      suffix={SGD_UNIT}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox
                      onChange={(e) =>
                        changeTicketValues(e.target.checked, 'absorbFees')
                      }
                      checked={ticketValue.absorbFees}
                    >
                      {t('Absorb fees')}:{' '}
                      {t(
                        'Ticketing fees are deducted from your ticket revenue',
                      )}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    label="Selling Time"
                    required
                    {...requiredValidateForm(
                      ticketValue.sellingStartTime,
                      'Selling Time',
                      onSave,
                    )}
                  >
                    <RangePicker
                      format={MMM_DD_YYYY_HH_MM}
                      onChange={(e, dateString) =>
                        changeTicketValues({
                          sellingStartTime: dateString[0],
                          sellingEndTime: dateString[1],
                        })
                      }
                      value={
                        ticketValue.sellingEndTime
                          ? [
                              ticketValue.sellingStartTime
                                ? moment(ticketValue.sellingStartTime)
                                : null,
                              moment(ticketValue.sellingEndTime),
                            ]
                          : undefined
                      }
                    />
                  </Form.Item>
                  <FoldingPanel
                    defaultActiveKey={
                      ticketValue.ticketDescription ||
                      ticketValue.royaltyFee ||
                      ticketValue.ticketCeilingPrice
                        ? [1]
                        : [] || ticketValue.connectedTickets.length
                    }
                  >
                    <FoldingPanel.Panel header="Advanced Settings" key={1}>
                      <Form.Item label="Ticket Description ">
                        <Input.TextArea
                          onChange={(e) =>
                            changeTicketValues(
                              e.target.value,
                              'ticketDescription',
                            )
                          }
                          value={ticketValue.ticketDescription}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            Royalty Fee
                            <QuestionTooltip title="Royalty Fee" />
                          </>
                        }
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                          marginRight: 16,
                        }}
                      >
                        <Input
                          onChange={(e) =>
                            changeTicketValues(e.target.value, 'royaltyFee')
                          }
                          value={ticketValue.royaltyFee}
                          suffix="%"
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            Ticket Ceiling Price
                            <QuestionTooltip title="Ticket Ceiling Price" />
                          </>
                        }
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                        }}
                      >
                        <Input
                          onChange={(e) =>
                            changeTicketValues(
                              e.target.value,
                              'ticketCeilingPrice',
                            )
                          }
                          value={ticketValue.ticketCeilingPrice}
                          suffix={SGD_UNIT}
                        />
                      </Form.Item>
                      <Form.Item label="Visibility">
                        <Select
                          options={[
                            { label: 'Visible', value: true },
                            { label: 'Hidden when not on sale', value: false },
                          ]}
                          onChange={(e) => changeTicketValues(e, 'visibility')}
                          value={ticketValue.visibility}
                        />
                      </Form.Item>
                      <ConnectTicketsTitle>
                        <p className="title">
                          Connected Tickets{' '}
                          <QuestionTooltip title="Connected Tickets" />
                        </p>
                        <span className="action" onClick={() => setOpen(true)}>
                          Select
                        </span>
                      </ConnectTicketsTitle>
                      <ConnectTicketsList>
                        {ticketValue.connectedTickets.map((item, index) => (
                          <ConnectTicketItem key={item.id}>
                            <div>
                              <p className="title">{item.eventName}</p>
                              <p className="sub-title">{item.ticketName}</p>
                            </div>
                            <img
                              src={Images.DeleteOutlinedIcon}
                              alt=""
                              onClick={() => handleDeleteEvent(index)}
                            />
                          </ConnectTicketItem>
                        ))}
                      </ConnectTicketsList>
                    </FoldingPanel.Panel>
                  </FoldingPanel>
                </div>
              </Col>
              <Col span={(pageTipsShow && 10) || 3}>
                <TipsCmp setPageTipsShow={setPageTipsShow} />
              </Col>
            </Row>
            <SelectEventsModal
              open={open}
              setOpen={setOpen}
              doneHandle={doneHandle}
              eventsListData={eventsListData}
              handleSelectEvents={handleSelectEvents}
              hanldleCheckAll={hanldleCheckAll}
            />
          </CreateEventFormContainer>
          <div className="page-bottom">
            {createTicketStatus === CreateTicketStatus.add ||
            createTicketStatus === CreateTicketStatus.edit ? (
              <div className="bottom-btn">
                <Button onClick={handleCancelCreateTicket}>
                  {t('Cancel')}
                </Button>
                <Button type="primary" onClick={handleSave}>
                  {t('Save')}
                </Button>
              </div>
            ) : null}
          </div>
        </>
      );
    }
    return null;
  };
  return renderContent();
};

export default CreateTicket;
