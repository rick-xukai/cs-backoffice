import React from 'react';
import {
  Button,
  Col,
  Row,
  Space,
  Grid,
  Checkbox,
  Modal,
  Form,
  message,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import ListEmpty from '../../../components/ListEmpty';
import { Images } from '../../../theme';
import {
  TicketListItemDesktop,
  TicketListItemMobile,
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
import { UploadFileAcceptType } from '../../../constants/General';
import { TOKEN_EXPIRED_MESSAGE } from '../../../constants/constants';
import { AuthRoutes } from '../../../navigation/Routes';
import Messages from '../../../constants/Message';
import NoData from '../../../components/NoData/NoData';

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
      <Row style={{ height: '100%', padding: 20 }}>
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

export const TicketListItem = ({
  onEdit,
  onDelete,
  image,
  title,
  stock,
  price,
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
  stock: number;
  price: string;
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
    <TicketListItemDesktop>
      <Row gutter={20} wrap={false}>
        <Col>
          <img src={image} alt="" className="banner" />
        </Col>
        <Col flex="auto">
          <Row justify="space-between" wrap={false}>
            <Col className="title">{title}</Col>
            <Col style={{ flexShrink: 0 }}>
              <Space>
                <StatusBadge status={status} text={statusText} />
                {more}
              </Space>
            </Col>
          </Row>
          <Row justify="start">
            <Col span={6}>
              <p className="label">Total Available Quantity</p>
              <p className="value">{stock}</p>
            </Col>
            <Col span={6}>
              <p className="label">Ticket Price (SDG)</p>
              <p className="value">{price}</p>
            </Col>
            <Col span={12}>
              <p className="label">Selling Time</p>
              <p className="value">{sellingTime}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </TicketListItemDesktop>
  ) : (
    <TicketListItemMobile>
      <Row justify="space-between" style={{ marginBottom: 8 }} wrap={false}>
        <Col>
          <Row gutter={12} wrap={false}>
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
          <p className="value">{stock}</p>
        </Col>
        <Col span={12}>
          <p className="label">Ticket Price (SDG)</p>
          <p className="value">{price}</p>
        </Col>
        <Col span={24}>
          <p className="label">Selling Time</p>
          <p className="value">{sellingTime}</p>
        </Col>
      </Row>
    </TicketListItemMobile>
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
                !!eventsListData.length &&
                eventsListData.length ===
                  eventsListData.filter((item) => item.checked).length
              }
              disabled={!eventsListData.length}
              onChange={(e) => hanldleCheckAll(e.target.checked)}
            />
          </Col>
          <Col span={15}>Event Name</Col>
          <Col span={7}>Ticket Name</Col>
        </Row>
      </Col>
      {eventsListData.length ? (
        eventsListData.map((item, index) => (
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
        ))
      ) : (
        <NoData />
      )}
    </SelectEventsTable>
  </Modal>
);

export const TicketImageUpload = ({
  formValue,
  handleUploadChange,
  fileList,
  thumbnaiFileList,
  handleThumbnaiUploadChange,
  changeTicketValues,
  thumbnaiVerify,
}: {
  formValue: TicketListProps;
  handleUploadChange: any;
  fileList: any;
  thumbnaiFileList: any;
  handleThumbnaiUploadChange: any;
  changeTicketValues: any;
  thumbnaiVerify: any;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
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
  const imageBeforeUpload = (file: any) => {
    const { type, size } = file;
    const isLimit = imageFileLimit(size, type);
    if (!isLimit) {
      message.error({
        content: t(
          'Invalid file format or size. Please upload a PNG, JPEG or GIF that is up to 15 MB in size.',
        ),
        key: 'error',
      });
    }
    return isLimit;
  };
  const beforeUpload = (file: any) => {
    const { type, size } = file;
    const isLimit = fileLimit(size, type);
    if (!isLimit) {
      message.error({
        content: t(
          'Invalid file format or size. Please upload a PNG, JPEG, GIF or MP4 that is up to 20 MB in size.',
        ),
        key: 'error',
      });
    }
    return isLimit;
  };
  const customRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    if (!beforeUpload(e.file)) {
      return e.onError();
    }
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      changeTicketValues({
        image: response.payload.url,
        imageType: e.file.type,
        thumbnailUrl:
          (!e.file.type.includes('video') && response.payload.url) || '',
        thumbnailType: e.file.type,
        imageName: e.file.name,
      });
      return e.onSuccess();
    }
    if (response.type === uploadFileAction.rejected.toString()) {
      if (response.payload.code === Messages.userDeprecated.code) {
        history.push(AuthRoutes.login);
        return message.error(t(TOKEN_EXPIRED_MESSAGE));
      }
    }
    return e.onError();
  };
  const customThumbnaiUploadRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    if (!imageBeforeUpload(e.file)) {
      return e.onError();
    }
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      changeTicketValues({
        thumbnailUrl: response.payload.url,
        thumbnailType: e.file.type,
        thumbnailName: e.file.name,
      });
      return e.onSuccess();
    }
    return e.onError();
  };
  const handleFileRemove = () => {
    changeTicketValues({
      image: '',
      imageType: '',
      thumbnailUrl: '',
      thumbnailType: '',
      imageName: '',
      thumbnailName: '',
    });
  };
  const handleThumbnaiFileRemove = () => {
    changeTicketValues({
      thumbnailUrl: '',
      thumbnailType: '',
      thumbnailName: '',
    });
  };
  return (
    <>
      <UploadFileComponent
        limitFileSize={20}
        description={{
          type: t('PNG, JPEG, GIF or MP4 files only'),
          size: t('up to [size] MB in size', { size: '20' }),
        }}
        previewImageUrl={formValue.image}
        previewType={formValue.imageType}
        handleChange={handleUploadChange}
        customRequest={customRequest}
        handleFileRemove={handleFileRemove}
        uploadButtonText="Drag or click to upload image"
        fileList={fileList}
        showVideoTip
      />
      {formValue.imageType.includes('video') && (
        <Form.Item
          label="Thumbnail image"
          required
          {...thumbnaiVerify}
          style={{ marginTop: 10, marginBottom: 0 }}
        >
          <UploadFileComponent
            fileList={thumbnaiFileList}
            previewImageUrl={formValue.thumbnailUrl}
            previewType={formValue.thumbnailType}
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
