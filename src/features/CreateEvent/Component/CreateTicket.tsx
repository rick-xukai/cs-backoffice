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
import Tips from '../../../components/Tips/Tips';
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

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };
  const handleThumbnaiUploadChange = (info: any) => {
    setThumbnaiFileList(info.fileList);
  };

  useEffect(() => {
    setFileList(
      formValue.ticketImage
        ? [
            {
              url: formValue.ticketImage,
              type: formValue.ticketImageType,
              thumbUrl: formValue.ticketImage,
              uid: formValue.ticketImage,
              name: formValue.ticketImage,
            },
          ]
        : [],
    );
  }, [formValue.ticketImage]);
  useEffect(() => {
    setThumbnaiFileList(
      formValue.ticketThumbnailUrl
        ? [
            {
              url: formValue.ticketThumbnailUrl,
              type: formValue.ticketThumbnailType,
              thumbUrl: formValue.ticketThumbnailUrl,
              uid: formValue.ticketThumbnailUrl,
              name: formValue.ticketThumbnailUrl,
            },
          ]
        : [],
    );
  }, [formValue.ticketThumbnailUrl]);

  const TipsCmp = (
    <Tips
      title={t('Ticket Tips')}
      image={Images.TicketTipsIcon}
      onSizeChange={setPageTipsShow}
      content={
        <Row>
          <Col span={24} className="content-text">
            {t(
              `(1) Don't give your ticket fancy names. If it's general admission, it's general admission. If it's VIP, it's VIP. Don't give names like bronze, silver or gold. Ain't nobody got time to get your colours.`,
            )}
          </Col>
          <Col span={24} className="content-text">
            {t(
              `(2) Your image is where you stand out. Remember our tickets are digital collectibles. So make them look like they mean something. The experience begins the moment the attendee receives the ticket. So make that moment count. Contact us if you need design help.`,
            )}
          </Col>
          <Col span={24} className="content-text">
            {t(
              `(3) Proof read your ticket description. You don't want angry Karens asking why they didn't receive another drink coupon.scribes a unique organizer and shows all of their events on one page. Having a complete profile can encourage attendees to follow you.`,
            )}
          </Col>
        </Row>
      }
    />
  );
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
        checked: !!formValue.connectedTickets.find(
          (ticket) => item.id === ticket.id,
        ),
      })),
    );
  }, [formValue.connectedTickets]);
  const handleDeleteEvent = (index: number) => {
    formValue.connectedTickets.splice(index, 1);
    fieldEdit({
      connectedTickets: [...formValue.connectedTickets],
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
  const renderContent = () => {
    if (createTicketStatus === CreateTicketStatus.empty) {
      return <EmptyState setCreateTicketStatus={setCreateTicketStatus} />;
    }
    if (createTicketStatus === CreateTicketStatus.list) {
      return (
        <>
          <Row justify="space-between" align="middle" className="main-title">
            <Col>{t('Create Ticket')}</Col>
            <Col>
              <Button
                onClick={() => setCreateTicketStatus(CreateTicketStatus.add)}
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
                      value={formValue.ticketName}
                    />
                  </Form.Item>
                  <Form.Item label="Ticket Image" name="ticketImage" required>
                    <TickImageUpload
                      formValue={formValue}
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
                      value={formValue.totalAvailableQuantity}
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
                      value={formValue.ticketPrice}
                      suffix={SGD_UNIT}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox
                      onChange={(e) =>
                        fieldEdit(e.target.checked, 'absorbFees')
                      }
                      checked={formValue.absorbFees}
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
                        formValue.sellingStartTime
                          ? [
                              moment(formValue.sellingStartTime),
                              moment(formValue.sellingEndTime),
                            ]
                          : undefined
                      }
                    />
                  </Form.Item>
                  <FoldingPanel
                    defaultActiveKey={
                      formValue.ticketDescription ||
                      formValue.royaltyFee ||
                      formValue.ticketCeilingPrice
                        ? [1]
                        : [] || formValue.connectedTickets.length
                    }
                  >
                    <FoldingPanel.Panel header="Advanced Settings" key={1}>
                      <Form.Item label="Ticket Description ">
                        <Input.TextArea
                          onChange={(e) =>
                            fieldEdit(e.target.value, 'ticketDescription')
                          }
                          value={formValue.ticketDescription}
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
                          value={formValue.royaltyFee}
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
                          value={formValue.ticketCeilingPrice}
                          suffix={SGD_UNIT}
                        />
                      </Form.Item>
                      <Form.Item label="Visibility">
                        <Select
                          options={[
                            { label: 'Visible', value: 1 },
                            { label: 'Invisible', value: 2 },
                          ]}
                          onChange={(e) => fieldEdit(e, 'visibility')}
                          value={formValue.visibility}
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
                        {formValue.connectedTickets.map((item, index) => (
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
              <Col span={(pageTipsShow && 10) || 3}>{TipsCmp}</Col>
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
  useEffect(() => {
    setCreateTicketStatus(CreateTicketStatus.list);
  }, []);
  return renderContent();
};

export default CreateTicket;
