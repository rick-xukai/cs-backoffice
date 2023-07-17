import React from 'react';
import { Button, Col, Row, Space, Grid, Checkbox, Modal, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import ListEmpty from '../../../components/ListEmpty';
import { Images } from '../../../theme';
import {
  EventListItemDesktop,
  EventListItemMobile,
  ModalFooterButton,
  SelectEventsTable,
} from '../CreateEventComponent';
import StatusBadge from '../../../components/StatusBadge';
import MoreIcon from '../../../components/MoreIcon';
import { StatusBadgeType } from '../../../components/StatusBadge/StatusBadge.component';
import UploadFileComponent from '../../../components/UploadFile/UploadFileComponent';
import { useAppDispatch } from '../../../app/hooks';
import { uploadFileAction, TicketListProps } from '../CreateEvent.slice';
import Tips from '../../../components/Tips';

export enum CreateTicketStatus {
  list = 1,
  add = 2,
  edit = 3,
}
const { useBreakpoint } = Grid;
export const EmptyState = ({ handleAddTicket }: { handleAddTicket: any }) => {
  const { t } = useTranslation();
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
              <Button type="primary" onClick={handleAddTicket}>
                {t('Add Ticket')}
              </Button>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export const EventListItem = ({
  onEdit,
  onDelete,
  image,
  title,
  totalAvailableQuantity,
  ticketPrice,
  sellingTime,
  status,
  statusText,
  index,
  item,
}: {
  onEdit?: any;
  onDelete?: any;
  image: string;
  title: string;
  totalAvailableQuantity: number;
  ticketPrice: string;
  sellingTime: string;
  status?: StatusBadgeType;
  statusText: string;
  index: number;
  item: any;
}) => {
  const { md } = useBreakpoint();
  const more = (
    <MoreIcon
      trigger={['click']}
      menu={{
        items: [
          {
            label: 'Edit',
            key: 'edit',
            onClick: () => onEdit(index, item),
          },
          {
            label: 'Delete',
            key: 'delete',
            onClick: () => onDelete(index, item),
          },
        ],
      }}
    />
  );
  return md ? (
    <EventListItemDesktop>
      <Row gutter={20}>
        <Col>
          <img src={image} alt="" className="banner" />
        </Col>
        <Col flex="auto">
          <Row justify="space-between">
            <Col className="title">{title}</Col>
            <Col>
              <Space>
                <StatusBadge status={status} text={statusText} />
                {more}
              </Space>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={6}>
              <p className="label">Total Available Quantity</p>
              <p className="value">{totalAvailableQuantity}</p>
            </Col>
            <Col span={6}>
              <p className="label">Ticket Price (SDG)</p>
              <p className="value">{Number(ticketPrice).toLocaleString()}</p>
            </Col>
            <Col span={12}>
              <p className="label">Selling Time</p>
              <p className="value">{sellingTime}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </EventListItemDesktop>
  ) : (
    <EventListItemMobile>
      <Row justify="space-between" style={{ marginBottom: 8 }}>
        <Col>
          <Row gutter={12}>
            <Col>
              <img className="banner" src={image} alt="" />
            </Col>
            <Col>
              <p className="title">{title}</p>
              <StatusBadge status={status} text={statusText} />
            </Col>
          </Row>
        </Col>
        <Col>{more}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <p className="label">Total Available Quantity</p>
          <p className="value">{totalAvailableQuantity}</p>
        </Col>
        <Col span={12}>
          <p className="label">Ticket Price (SDG)</p>
          <p className="value">{ticketPrice}</p>
        </Col>
        <Col span={24}>
          <p className="label">Selling Time</p>
          <p className="value">{sellingTime}</p>
        </Col>
      </Row>
    </EventListItemMobile>
  );
};

export const SelectEventsModal = ({
  doneHandle,
  eventsListData,
  setOpen,
  open,
  hanldleCheckAll,
  handleSelectEvents,
}: {
  doneHandle: any;
  eventsListData: {
    eventName: string;
    ticketName: string;
    id: number;
    checked: boolean;
  }[];
  setOpen: any;
  open: boolean;
  hanldleCheckAll: any;
  handleSelectEvents: any;
}) => (
  <Modal
    title="Select Events"
    footer={[
      <ModalFooterButton key="done" type="primary" onClick={doneHandle}>
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
                onChange={(e) => handleSelectEvents(e.target.checked, index)}
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
);

export const TickImageUpload = ({
  formValue,
  handleUploadChange,
  fileList,
  thumbnaiFileList,
  handleThumbnaiUploadChange,
  changeTicketValues,
}: {
  formValue: TicketListProps;
  handleUploadChange: any;
  fileList: any;
  thumbnaiFileList: any;
  handleThumbnaiUploadChange: any;
  changeTicketValues: any;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const customRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      changeTicketValues({
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
      changeTicketValues({
        ticketThumbnailUrl: response.payload.url,
        ticketThumbnailType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };
  const handleFileRemove = () => {
    changeTicketValues({
      ticketImage: '',
      ticketImageType: '',
      ticketThumbnailUrl: '',
      ticketThumbnailType: '',
    });
  };
  const handleThumbnaiFileRemove = () => {
    changeTicketValues({
      ticketThumbnailUrl: '',
      ticketThumbnailType: '',
    });
  };
  return (
    <>
      <UploadFileComponent
        accept="image/png, image/jpeg, image/gif, video/mp4"
        limitFileSize={20}
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
        showVideoTip
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
    </>
  );
};

export const TipsCmp = ({ setPageTipsShow }: { setPageTipsShow: any }) => {
  const { t } = useTranslation();
  return (
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
};
