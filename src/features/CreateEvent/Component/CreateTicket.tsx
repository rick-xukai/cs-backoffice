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
  Grid,
  Space,
} from 'antd';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import Tips from '../../../components/Tips/Tips';
import { Images } from '../../../theme';
import ListEmpty from '../../../components/ListEmpty/ListEmpty';
import {
  ConnectTicketItem,
  ConnectTicketsList,
  ConnectTicketsTitle,
  CreateEventFormContainer,
  EventList,
  EventListItemDesktop,
  EventListItemMobile,
  FoldingPanel,
  ModalFooterButton,
  SelectEventsTable,
} from '../CreateEventComponent';
import { EventInfoFormValueProps } from './EventInfo';
import UploadFileComponent from '../../../components/UploadFile/UploadFileComponent';
import { MMM_DD_YYYY_HH_MM, SGD_UNIT } from '../../../constants/constants';
import QuestionTooltip from '../../../components/QuestionTooltip';
import { uploadFileAction } from '../CreateEvent.slice';
import { useAppDispatch } from '../../../app/hooks';
import StatusBadge from '../../../components/StatusBadge';
import MoreIcon from '../../../components/MoreIcon';

export enum CreateTicketStatus {
  empty = 1,
  list = 2,
  add = 3,
  edit = 4,
}

const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

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
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState<any>([]);
  const [thumbnaiFileList, setThumbnaiFileList] = useState<any>([]);
  const { md } = useBreakpoint();

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

  const customRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      fieldEdit({
        ticketImage: response.payload.url,
        ticketImageType: e.file.type,
        ticketThumbnailUrl:
          (!e.file.type.includes('video') && response.payload.url) || '',
        ticketThumbnailType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };
  const customThumbnaiUploadRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      fieldEdit({
        ticketThumbnailUrl: response.payload.url,
        ticketThumbnailType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };
  const handleFileRemove = () => {
    fieldEdit({
      ticketImage: '',
      ticketImageType: '',
      ticketThumbnailUrl: '',
      ticketThumbnailType: '',
    });
  };
  const handleThumbnaiFileRemove = () => {
    fieldEdit({
      ticketThumbnailUrl: '',
      ticketThumbnailType: '',
    });
  };
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
      return (
        <>
          <Row>
            <Col span={24} className="main-title">
              {t('Create Ticket')}
            </Col>
          </Row>
          <Row style={{ height: '100%' }}>
            <Col span={24}>
              <ListEmpty
                image={Images.CreateNewTicketIcon}
                title={t('Create New Ticket')}
                description={t(
                  'Create an unforgettable experience that sets your event apart. Let your creativity soar – start creating tickets.',
                )}
                actions={
                  <Button
                    type="primary"
                    onClick={() =>
                      setCreateTicketStatus(CreateTicketStatus.add)
                    }
                  >
                    {t('Add Ticket')}
                  </Button>
                }
              />
            </Col>
          </Row>
        </>
      );
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
            {md ? (
              <EventListItemDesktop>
                <Row gutter={20}>
                  <Col>
                    <img
                      src="https://i1.sndcdn.com/artworks-6Y4BSPNiLENV-0-t500x500.jpg"
                      alt=""
                    />
                  </Col>
                  <Col flex="auto">
                    <Row justify="space-between">
                      <Col className="title">SVIP</Col>
                      <Col>
                        <Space>
                          <StatusBadge status="warning" text="Ended" />
                          <MoreIcon
                            trigger={['click']}
                            menu={{
                              items: [
                                {
                                  label: 'Edit',
                                  key: 'edit',
                                },
                                {
                                  label: 'Delete',
                                  key: 'delete',
                                },
                              ],
                            }}
                          />
                        </Space>
                      </Col>
                    </Row>
                    <Row justify="start">
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
              </EventListItemDesktop>
            ) : (
              <EventListItemMobile></EventListItemMobile>
            )}
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
                    <UploadFileComponent
                      accept="image/png, image/jpeg, image/gif, video/mp4"
                      limitFileSize={30}
                      description={{
                        type: t('PNG, JPEG, GIF or MP4 files only'),
                        size: t('up to [size] MB in size', { size: '20' }),
                      }}
                      previewImageUrl={formValue.ticketImage}
                      previewType={formValue.ticketImageType}
                      handleChange={handleUploadChange}
                      customRequest={customRequest}
                      handleFileRemove={handleFileRemove}
                      uploadButtonText="Drag or click to upload image"
                      fileList={fileList}
                    />
                    {formValue.ticketImageType.includes('video') && (
                      <Form.Item label="Thumbnail image">
                        <UploadFileComponent
                          accept="image/png, image/jpeg, image/gif"
                          fileList={thumbnaiFileList}
                          previewImageUrl={formValue.ticketThumbnailUrl}
                          previewType={formValue.ticketThumbnailType}
                          limitFileSize={15}
                          handleChange={handleThumbnaiUploadChange}
                          handleFileRemove={handleThumbnaiFileRemove}
                          customRequest={customThumbnaiUploadRequest}
                          description={{
                            type: t('PNG, JPEG or GIF files only'),
                            size: t('up to [size] MB in size', { size: '15' }),
                          }}
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    style={{
                      display: 'inline-block',
                      width: 'calc(50% - 8px)',
                      marginRight: 16,
                    }}
                    label="Stock"
                    required
                  >
                    <Input
                      style={{ height: 38 }}
                      onChange={(e) => fieldEdit(e.target.value, 'stock')}
                      value={formValue.stock}
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
            <Modal
              title="Select Events"
              footer={[
                <ModalFooterButton
                  key="done"
                  type="primary"
                  onClick={doneHandle}
                >
                  Done
                </ModalFooterButton>,
              ]}
              centered
              onCancel={() => setOpen(false)}
              open={open}
            >
              <SelectEventsTable>
                <Col className="header" span={24}>
                  <Row>
                    <Col span={2}>
                      <Checkbox
                        checked={
                          eventsListData.length ===
                          eventsListData.filter((item) => item.checked).length
                        }
                        onChange={(e) => hanldleCheckAll(e.target.checked)}
                      />
                    </Col>
                    <Col span={15}>Event Name</Col>
                    <Col span={7}>Ticket Name</Col>
                  </Row>
                </Col>
                {eventsListData.map((item, index) => (
                  <Col className="item" span={24} key={item.id}>
                    <Row>
                      <Col span={2}>
                        <Checkbox
                          onChange={(e) =>
                            handleSelectEvents(e.target.checked, index)
                          }
                          checked={item.checked}
                        />
                      </Col>
                      <Col span={15}>{item.eventName}</Col>
                      <Col span={7}>{item.ticketName}</Col>
                    </Row>
                  </Col>
                ))}
              </SelectEventsTable>
            </Modal>
          </CreateEventFormContainer>
        </>
      );
    }
    return null;
  };
  useEffect(() => {
    setCreateTicketStatus(CreateTicketStatus.empty);
  }, []);
  return renderContent();
};

export default CreateTicket;
