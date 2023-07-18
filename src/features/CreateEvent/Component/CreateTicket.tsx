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
import {
  CreateEventFormValueProps,
  TicketListProps,
} from '../CreateEvent.slice';
import {
  MMM_DD_YYYY_HH_MM,
  PERCENT_LIMIT,
  PRICE_LIMIT,
  SGD_UNIT,
} from '../../../constants/constants';
import QuestionTooltip from '../../../components/QuestionTooltip';
// eslint-disable-next-line import/no-cycle
import {
  CreateTicketStatus,
  EmptyState,
  TicketListItem,
  SelectEventsModal,
  TicketImageUpload,
  TipsCmp,
} from './CreateTicketComponents';
import {
  calculatePrice,
  requiredValidateForm,
  thousandsSeparator,
} from '../../../utils/func';
import { UploadFileAcceptType } from '../../../constants/General';

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
  ticketImageName: '',
  ticketThumbnailUrl: '',
  ticketThumbnailType: '',
  ticketThumbnailName: '',
  id: '',
};

const getTicketListItemStatus: any = (startTime: string, endTime: string) => {
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
  formValue: CreateEventFormValueProps;
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
      sellingEndTime: ticketValue.sellingEndTime || formValue.startTime,
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

  const fileLimit = (size: number, type: string) => {
    const isLimit =
      size / 1024 / 1024 <= 20 &&
      [...UploadFileAcceptType, 'video/mp4'].includes(type);
    return isLimit;
  };

  const imageFileLimit = (size: number, type: string) => {
    const isLimit =
      size / 1024 / 1024 <= 15 && [...UploadFileAcceptType].includes(type);
    return isLimit;
  };

  const beforeUpload = (file: any) => {
    const { type, size } = file;
    const isLimit = fileLimit(size, type);
    return isLimit;
  };

  const imageBeforeUpload = (file: any) => {
    const { type, size } = file;
    const isLimit = imageFileLimit(size, type);
    return isLimit;
  };
  const handleUploadChange = (info: any) => {
    if (beforeUpload(info.file)) setFileList(info.fileList);
  };
  const handleThumbnaiUploadChange = (info: any) => {
    if (imageBeforeUpload(info.file)) setThumbnaiFileList(info.fileList);
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
              name: ticketValue.ticketImageName,
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
              name: ticketValue.ticketThumbnailName,
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
      !`${ticketValue.ticketPrice}` ||
      !`${ticketValue.totalAvailableQuantity}` ||
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
          ...formValue.ticketList,
          { ...ticketValue, id: `add_${new Date().getTime()}` },
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
    Number(ticketValue.ticketPrice.replace(/,/g, '')),
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
              <TicketListItem
                image={
                  item.ticketImageType.includes('video')
                    ? item.ticketThumbnailUrl
                    : item.ticketImage
                }
                title={item.ticketName}
                totalAvailableQuantity={`0 / ${item.totalAvailableQuantity}`}
                ticketPrice={item.ticketPrice}
                sellingTime={`${item.sellingStartTime} - ${item.sellingEndTime}`}
                key={item.id}
                onDelete={onDelete}
                onEdit={onEdit}
                item={item}
                index={index}
                {...getTicketListItemStatus(
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
                    <TicketImageUpload
                      formValue={ticketValue}
                      handleUploadChange={handleUploadChange}
                      fileList={fileList}
                      thumbnaiFileList={thumbnaiFileList}
                      handleThumbnaiUploadChange={handleThumbnaiUploadChange}
                      changeTicketValues={changeTicketValues}
                      thumbnaiVerify={requiredValidateForm(
                        ticketValue.ticketThumbnailUrl,
                        'Thumbnail image',
                        onSave,
                      )}
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
                      <Col style={{ flexShrink: 0 }}>
                        <b>0</b> Sold /
                      </Col>
                      <Col flex="auto">
                        <Input
                          style={{
                            height: 38,
                            display: 'block',
                            width: '100%',
                          }}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (
                              !val.includes('.') &&
                              !Number.isNaN(Number(val)) &&
                              Number(val) >= 0
                            ) {
                              changeTicketValues(
                                `${val ? Number(val) : ''}`,
                                'totalAvailableQuantity',
                              );
                            }
                          }}
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
                      style={{
                        height: 38,
                        display: 'block',
                        width: '100%',
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && Number.isNaN(Number(val))) return false;
                        if (Number(val) >= PRICE_LIMIT) return false;
                        return changeTicketValues(
                          e.target.value,
                          'ticketPrice',
                        );
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (Number(val) <= 0)
                          return changeTicketValues('', 'ticketPrice');
                        return changeTicketValues(
                          thousandsSeparator(val),
                          'ticketPrice',
                        );
                      }}
                      onFocus={(e) => {
                        const val = e.target.value;
                        return changeTicketValues(
                          val.replace(/,/g, ''),
                          'ticketPrice',
                        );
                      }}
                      value={ticketValue.ticketPrice}
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
                      inputReadOnly
                      value={[
                        ticketValue.sellingStartTime
                          ? moment(ticketValue.sellingStartTime)
                          : moment(),
                        ticketValue.sellingEndTime
                          ? moment(ticketValue.sellingEndTime)
                          : null,
                      ]}
                      disabledDate={(currentDate) =>
                        currentDate &&
                        currentDate < moment().subtract(1, 'days').endOf('day')
                      }
                      showTime
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
                          showCount
                          maxLength={500}
                          value={ticketValue.ticketDescription}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            Royalty Fee
                            <QuestionTooltip
                              title={t(
                                'Royalty Fee you set determines the percentage cut that goes back to you when an attendee sells their ticket on the secondary market. By default, royalty fees are 0.',
                              )}
                            />
                          </>
                        }
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                          marginRight: 16,
                        }}
                      >
                        <Input
                          onChange={(e) => {
                            const val = e.target.value;
                            if (
                              !Number.isNaN(Number(val)) &&
                              Number(val) <= PERCENT_LIMIT
                            ) {
                              changeTicketValues(e.target.value, 'royaltyFee');
                            }
                          }}
                          value={ticketValue.royaltyFee}
                          suffix="%"
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <>
                            Ticket Ceiling Price
                            <QuestionTooltip
                              title={t(
                                'Ticket Ceiling determines the maximum price limit which a ticket holder can list on the secondary market.',
                              )}
                            />
                          </>
                        }
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                        }}
                      >
                        <Input
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val && Number.isNaN(Number(val))) return false;
                            if (Number(val) >= PRICE_LIMIT) return false;
                            return changeTicketValues(
                              e.target.value,
                              'ticketCeilingPrice',
                            );
                          }}
                          onBlur={(e) => {
                            const val = e.target.value;
                            if (val && Number(val) <= 0)
                              return changeTicketValues(
                                '',
                                'ticketCeilingPrice',
                              );
                            return changeTicketValues(
                              thousandsSeparator(val),
                              'ticketCeilingPrice',
                            );
                          }}
                          onFocus={(e) => {
                            changeTicketValues(
                              e.target.value.replace(/,/g, ''),
                              'ticketCeilingPrice',
                            );
                          }}
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
                          <QuestionTooltip
                            title={t(
                              'Connect previous event tickets to reward previous event goers with free access to your new event!',
                            )}
                          />
                        </p>
                        <span className="action" onClick={() => setOpen(true)}>
                          {ticketValue.connectedTickets.length
                            ? 'Edit'
                            : 'Select'}
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
