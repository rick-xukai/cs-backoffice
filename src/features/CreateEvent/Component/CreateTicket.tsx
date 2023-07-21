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
  TicketList,
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
  name: '',
  image: '',
  stock: '',
  price: '',
  absorbFees: false,
  sellStartTime: '',
  sellEndTime: '',
  description: '',
  royaltiesFee: '',
  ceilingPrice: '',
  visibility: true,
  connectedTickets: [],
  imageType: '',
  imageName: '',
  thumbnailUrl: '',
  thumbnailType: '',
  thumbnailName: '',
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
  ticketFormEdit,
  fieldEdit,
  setTicketFormEdit,
}: {
  createTicketStatus: CreateTicketStatus;
  setCreateTicketStatus: any;
  formValue: CreateEventFormValueProps;
  ticketFormEdit: boolean;
  fieldEdit: (value: any, field: string) => void;
  setTicketFormEdit: (status: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);
  const [thumbnaiFileList, setThumbnaiFileList] = useState<any>([]);
  const [ticketValue, setTicketValue] = useState<TicketListProps>({
    ...initialValues,
    sellEndTime: formValue.startTime,
  });
  useEffect(() => {
    setTicketValue({
      ...ticketValue,
      sellEndTime: ticketValue.sellEndTime || formValue.startTime,
      sellStartTime:
        ticketValue.sellStartTime || moment().format(MMM_DD_YYYY_HH_MM),
    });
  }, [formValue.startTime, createTicketStatus]);
  const [onSave, setOnSave] = useState(false);

  const changeTicketValues = (value: any, field?: string) => {
    setTicketFormEdit(true);
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
    if (!info.fileList.length) {
      setFileList(info.fileList);
      return;
    }
    if (beforeUpload(info.file)) {
      setFileList([
        {
          ...info.file,
          thumbUrl: info.file?.response?.image,
        },
      ]);
    }
  };

  const handleThumbnaiUploadChange = (info: any) => {
    if (imageBeforeUpload(info.file) || !info.fileList.length)
      setThumbnaiFileList([
        {
          ...info.fileList[0],
          thumbUrl:
            (info.file.response && info.file.response.thumbnailUrl) ||
            info.file.thumbUrl,
        },
      ]);
  };

  useEffect(() => {
    if (fileList[0]?.response) {
      setTicketValue({
        ...ticketValue,
        ...fileList[0].response,
      });
    } else {
      setTicketValue({
        ...ticketValue,
        image: '',
        imageType: '',
        imageName: '',
        thumbnailUrl: '',
        thumbnailType: '',
        thumbnailName: '',
      });
      setThumbnaiFileList([]);
    }
  }, [fileList]);
  useEffect(() => {
    if (thumbnaiFileList[0]?.response) {
      setTicketValue({
        ...ticketValue,
        ...thumbnaiFileList[0].response,
      });
    } else {
      setTicketValue({
        ...ticketValue,
        thumbnailUrl: '',
        thumbnailType: '',
        thumbnailName: '',
      });
    }
  }, [thumbnaiFileList]);

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
          (ticket) => item.id === ticket.ticketTypeId,
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
      setFileList([]);
      setThumbnaiFileList([]);
      setTicketFormEdit(false);
    }
    setOnSave(false);
  }, [createTicketStatus]);

  const handleSave = () => {
    setOnSave(true);
    if (
      !ticketValue.name ||
      !ticketValue.image ||
      !`${ticketValue.price}` ||
      !`${ticketValue.stock}` ||
      !ticketValue.sellStartTime ||
      !ticketValue.sellEndTime
    ) {
      return;
    }
    setCreateTicketStatus(CreateTicketStatus.edit);
    if (createTicketStatus === CreateTicketStatus.edit) {
      const newTicketList = [...formValue.ticketTypes];
      const findIndex = formValue.ticketTypes.findIndex(
        (item) => item.id === ticketValue.id,
      );
      newTicketList[findIndex] = { ...ticketValue };
      fieldEdit(newTicketList, 'ticketTypes');
    } else {
      fieldEdit(
        [
          ...formValue.ticketTypes,
          { ...ticketValue, id: `add_${new Date().getTime()}` },
        ],
        'ticketTypes',
      );
    }
    setCreateTicketStatus(CreateTicketStatus.list);
  };

  const handleCancelCreateTicket = () => {
    if (ticketFormEdit) {
      Modal.confirm({
        className: 'notSaveConfirmModal',
        centered: true,
        closable: false,
        okText: t('Save'),
        cancelText: t('Leave'),
        title: t('Unsaved Content'),
        icon: <ExclamationCircleOutlined />,
        content: t('Leaving this page will result in losing your content.'),
        onOk: () => {
          handleSave();
        },
        onCancel: () => {
          setCreateTicketStatus(CreateTicketStatus.list);
        },
      });
    } else {
      setCreateTicketStatus(CreateTicketStatus.list);
    }
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
      content: `Are you sure you want to delete ${item.name}?`,
      onOk: () => {
        formValue.ticketTypes.splice(index, 1);
        fieldEdit(formValue.ticketTypes, 'ticketTypes');
      },
    });
  };

  const onEdit = (index: any, item: any) => {
    setTicketValue({ ...item });
    setFileList([
      {
        name: item.imageName,
        status: 'done',
        percent: 100,
        type: item.imageType,
        thumbUrl: item.image,
        response: {
          image: item.image,
          imageName: item.imageName,
          imageType: item.imageType,
          thumbnailType: item.imageType,
          thumbnailUrl: item.image,
        },
      },
    ]);
    setThumbnaiFileList([
      {
        name: item.thumbnailName,
        status: 'done',
        percent: 100,
        type: item.thumbnailType,
        thumbUrl: item.thumbnailUrl,
        response: {
          thumbnailName: item.thumbnailName,
          thumbnailType: item.thumbnailType,
          thumbnailUrl: item.thumbnailUrl,
        },
      },
    ]);
    setCreateTicketStatus(CreateTicketStatus.edit);
  };

  const calculatedPrice = calculatePrice(
    Number(ticketValue.price.toString().replace(/,/g, '')),
    ticketValue.absorbFees,
  );

  const renderContent = () => {
    if (createTicketStatus === CreateTicketStatus.list) {
      if (!formValue.ticketTypes.length)
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
          <TicketList>
            {formValue.ticketTypes.map((item, index) => (
              <TicketListItem
                image={
                  item.imageType.includes('video')
                    ? item.thumbnailUrl
                    : item.image
                }
                title={item.name}
                stock={`0 / ${item.stock}`}
                price={item.price}
                sellingTime={`${item.sellStartTime} - ${item.sellEndTime}`}
                key={item.id}
                onDelete={onDelete}
                onEdit={onEdit}
                item={item}
                index={index}
                {...getTicketListItemStatus(
                  item.sellStartTime,
                  item.sellEndTime,
                )}
              />
            ))}
          </TicketList>
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
                      ticketValue.name,
                      'Ticket Name',
                      onSave,
                    )}
                  >
                    <Input
                      showCount
                      maxLength={100}
                      onChange={(e) =>
                        changeTicketValues(e.target.value, 'name')
                      }
                      value={ticketValue.name}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ticket Image"
                    required
                    {...requiredValidateForm(
                      ticketValue.image,
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
                        ticketValue.thumbnailUrl,
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
                      ticketValue.stock,
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
                              Number(val) >= 0 &&
                              Number(val) < PRICE_LIMIT
                            ) {
                              changeTicketValues(
                                `${val ? Number(val) : ''}`,
                                'stock',
                              );
                            }
                          }}
                          value={ticketValue.stock}
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
                      ticketValue.price,
                      'Ticket Price',
                      onSave,
                    )}
                    help={
                      ticketValue.price
                        ? `User Pay: ${calculatedPrice.userPay} SGD. Take Home: ${calculatedPrice.takeHome} SGD`
                        : requiredValidateForm(
                            ticketValue.price,
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
                        return changeTicketValues(e.target.value, 'price');
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        if (Number(val) <= 0)
                          return changeTicketValues('', 'price');
                        return changeTicketValues(
                          thousandsSeparator(val),
                          'price',
                        );
                      }}
                      onFocus={(e) => {
                        const val = e.target.value;
                        return changeTicketValues(
                          val.replace(/,/g, ''),
                          'price',
                        );
                      }}
                      value={ticketValue.price}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginTop: -10, marginBottom: 0 }}>
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
                      ticketValue.sellStartTime,
                      'Selling Time',
                      onSave,
                    )}
                  >
                    <RangePicker
                      format={MMM_DD_YYYY_HH_MM}
                      onChange={(e, dateString) =>
                        changeTicketValues({
                          sellStartTime: dateString[0],
                          sellEndTime: dateString[1],
                        })
                      }
                      inputReadOnly
                      value={[
                        ticketValue.sellStartTime
                          ? moment(ticketValue.sellStartTime)
                          : moment(),
                        ticketValue.sellEndTime
                          ? moment(ticketValue.sellEndTime)
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
                      ticketValue.description ||
                      ticketValue.royaltiesFee ||
                      ticketValue.ceilingPrice
                        ? [1]
                        : [] || ticketValue.connectedTickets.length
                    }
                  >
                    <FoldingPanel.Panel header="Advanced Settings" key={1}>
                      <Form.Item label="Ticket Description ">
                        <Input.TextArea
                          onChange={(e) =>
                            changeTicketValues(e.target.value, 'description')
                          }
                          showCount
                          maxLength={500}
                          value={ticketValue.description}
                          autoSize
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <QuestionTooltip
                            title={t(
                              'Royalty Fee you set determines the percentage cut that goes back to you when an attendee sells their ticket on the secondary market. By default, royalty fees are 0.',
                            )}
                          >
                            Royalty Fee
                          </QuestionTooltip>
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
                              changeTicketValues(
                                e.target.value,
                                'royaltiesFee',
                              );
                            }
                          }}
                          value={ticketValue.royaltiesFee}
                          suffix="%"
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <QuestionTooltip
                            title={t(
                              `Ticket Ceiling determines the maximum price limit which a ticket holder can list on the secondary market.`,
                            )}
                          >
                            Ticket Ceiling Price
                          </QuestionTooltip>
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
                              'ceilingPrice',
                            );
                          }}
                          onBlur={(e) => {
                            const val = e.target.value;
                            if (val && Number(val) <= 0)
                              return changeTicketValues('', 'ceilingPrice');
                            return changeTicketValues(
                              thousandsSeparator(val),
                              'ceilingPrice',
                            );
                          }}
                          onFocus={(e) => {
                            changeTicketValues(
                              e.target.value.replace(/,/g, ''),
                              'ceilingPrice',
                            );
                          }}
                          value={ticketValue.ceilingPrice}
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
                          <QuestionTooltip
                            title={t(
                              'Connect previous event tickets to reward previous event goers with free access to your new event!',
                            )}
                          >
                            Connected Tickets
                          </QuestionTooltip>
                        </p>
                        <span className="action" onClick={() => setOpen(true)}>
                          {ticketValue.connectedTickets.length
                            ? 'Edit'
                            : 'Select'}
                        </span>
                      </ConnectTicketsTitle>
                      <ConnectTicketsList>
                        {ticketValue.connectedTickets.map((item, index) => (
                          <ConnectTicketItem key={item.ticketTypeId}>
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
