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
} from 'antd';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import { Images } from '../../../theme';
import {
  ConnectTicketItem,
  ConnectTicketsList,
  ConnectTicketsTitle,
  CreateEventFormContainer,
  EventList,
  FoldingPanel,
} from '../CreateEventComponent';
import { EventInfoFormValueProps } from './EventInfo';
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

const { RangePicker } = DatePicker;

const CreateTicket = ({
  createTicketStatus,
  setCreateTicketStatus,
  formValue,
  fieldEdit,
}: {
  createTicketStatus: CreateTicketStatus;
  setCreateTicketStatus: any;
  formValue: EventInfoFormValueProps;
  fieldEdit: (value: any, field?: string) => void;
}) => {
  const { t } = useTranslation();
  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any>([]);
  const [thumbnaiFileList, setThumbnaiFileList] = useState<any>([]);
  const formValues = formValue.ticketList[formValue.ticketList.length - 1] || {
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
    visibility: false,
    connectedTickets: [],
    ticketImageType: '',
    ticketThumbnailUrl: '',
    ticketThumbnailType: '',
  };
  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };
  const handleThumbnaiUploadChange = (info: any) => {
    setThumbnaiFileList(info.fileList);
  };

  useEffect(() => {
    setFileList(
      formValues.ticketImage
        ? [
            {
              url: formValues.ticketImage,
              type: formValues.ticketImageType,
              thumbUrl: formValues.ticketImage,
              uid: formValues.ticketImage,
              name: formValues.ticketImage,
            },
          ]
        : [],
    );
  }, [formValues.ticketImage]);
  useEffect(() => {
    setThumbnaiFileList(
      formValues.ticketThumbnailUrl
        ? [
            {
              url: formValues.ticketThumbnailUrl,
              type: formValues.ticketThumbnailType,
              thumbUrl: formValues.ticketThumbnailUrl,
              uid: formValues.ticketThumbnailUrl,
              name: formValues.ticketThumbnailUrl,
            },
          ]
        : [],
    );
  }, [formValues.ticketThumbnailUrl]);

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
    fieldEdit({
      connectedTickets: eventsListData.filter((item) => item.checked),
    });
    setOpen(false);
  };

  useEffect(() => {
    setEventsListData(
      eventsListData.map((item) => ({
        ...item,
        checked: !!formValues.connectedTickets.find(
          (ticket) => item.id === ticket.id,
        ),
      })),
    );
  }, [formValue]);
  const handleDeleteEvent = (index: number) => {
    formValues.connectedTickets.splice(index, 1);
    fieldEdit({
      connectedTickets: [...formValues.connectedTickets],
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
    fieldEdit({
      ticketList: [
        {
          ticketName: '',
          ticketImage: '',
          totalAvailableQuantity: '',
          ticketPrice: '',
          absorbFees: true,
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
          id: `add_${new Date().getTime()}`,
        },
        ...formValue.ticketList,
      ],
    });
  };
  useEffect(() => {
    setCreateTicketStatus(CreateTicketStatus.list);
  }, []);
  const renderContent = () => {
    if (createTicketStatus === CreateTicketStatus.empty) {
      return <EmptyState handleAddTicket={handleAddTicket} />;
    }
    if (createTicketStatus === CreateTicketStatus.list) {
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
            <EventListItem
              image="https://i1.sndcdn.com/artworks-6Y4BSPNiLENV-0-t500x500.jpg"
              title="SVIP"
              totalAvailableQuantity="200"
              ticketPrice="100"
              sellingTime="Jun 28 2023, 10:00 - Jun 28 2023, 12:00"
              statusText="Ended"
            />
            <EventListItem
              image="https://i1.sndcdn.com/artworks-6Y4BSPNiLENV-0-t500x500.jpg"
              title="SVIP"
              totalAvailableQuantity="200"
              ticketPrice="100"
              sellingTime="Jun 28 2023, 10:00 - Jun 28 2023, 12:00"
              statusText="On Sale"
              status="success"
            />
            <EventListItem
              image="https://i1.sndcdn.com/artworks-6Y4BSPNiLENV-0-t500x500.jpg"
              title="SVIP"
              totalAvailableQuantity="200"
              ticketPrice="100"
              sellingTime="Jun 28 2023, 10:00 - Jun 28 2023, 12:00"
              statusText="Scheduled"
              status="warning"
            />
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
                  <Form.Item label="Ticket Name" name="ticketName" required>
                    <Input
                      showCount
                      maxLength={100}
                      onChange={(e) => fieldEdit(e.target.value, 'ticketName')}
                      value={formValues.ticketName}
                    />
                  </Form.Item>
                  <Form.Item label="Ticket Image" name="ticketImage" required>
                    <TickImageUpload
                      formValue={formValues}
                      handleUploadChange={handleUploadChange}
                      fileList={fileList}
                      thumbnaiFileList={thumbnaiFileList}
                      handleThumbnaiUploadChange={handleThumbnaiUploadChange}
                      fieldEdit={fieldEdit}
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
                  >
                    <Input
                      style={{ height: 38 }}
                      onChange={(e) =>
                        fieldEdit(e.target.value, 'totalAvailableQuantity')
                      }
                      value={formValues.totalAvailableQuantity}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                    }}
                    label="Ticket Price"
                    required
                  >
                    <Input
                      onChange={(e) => fieldEdit(e.target.value, 'ticketPrice')}
                      value={formValues.ticketPrice}
                      suffix={SGD_UNIT}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox
                      onChange={(e) =>
                        fieldEdit(e.target.checked, 'absorbFees')
                      }
                      checked={formValues.absorbFees}
                    >
                      {t('Absorb fees')}:{' '}
                      {t(
                        'Ticketing fees are deducted from your ticket revenue',
                      )}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item label="Selling Time" required>
                    <RangePicker
                      format={MMM_DD_YYYY_HH_MM}
                      onChange={(e, dateString) =>
                        fieldEdit({
                          sellingStartTime: dateString[0],
                          sellingEndTime: dateString[1],
                        })
                      }
                      value={
                        formValues.sellingStartTime
                          ? [
                              moment(formValues.sellingStartTime),
                              moment(formValues.sellingEndTime),
                            ]
                          : undefined
                      }
                    />
                  </Form.Item>
                  <FoldingPanel
                    defaultActiveKey={
                      formValues.ticketDescription ||
                      formValues.royaltyFee ||
                      formValues.ticketCeilingPrice
                        ? [1]
                        : [] || formValues.connectedTickets.length
                    }
                  >
                    <FoldingPanel.Panel header="Advanced Settings" key={1}>
                      <Form.Item label="Ticket Description ">
                        <Input.TextArea
                          onChange={(e) =>
                            fieldEdit(e.target.value, 'ticketDescription')
                          }
                          value={formValues.ticketDescription}
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
                            fieldEdit(e.target.value, 'royaltyFee')
                          }
                          value={formValues.royaltyFee}
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
                            fieldEdit(e.target.value, 'ticketCeilingPrice')
                          }
                          value={formValues.ticketCeilingPrice}
                          suffix={SGD_UNIT}
                        />
                      </Form.Item>
                      <Form.Item label="Visibility">
                        <Select
                          options={[
                            { label: 'Visible', value: 1 },
                            { label: 'Hidden when not on sale', value: 2 },
                          ]}
                          onChange={(e) => fieldEdit(e, 'visibility')}
                          value={formValues.visibility}
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
                        {formValues.connectedTickets.map((item, index) => (
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
        </>
      );
    }
    return null;
  };
  return renderContent();
};

export default CreateTicket;
