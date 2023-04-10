import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';

import { useAppDispatch } from '../../../app/hooks';
import { priceUnit } from '../../../constants/General';
import { uploadFileAction, TicketTypes } from '../CreateEvent.slice';
import UploadFileComponent from '../../../components/UploadFile/UploadFileComponent';

const { TextArea } = Input;

const TicketTab = ({
  formName,
  editTicketData,
  submitTicketData,
  setTicketRequiredFields,
}: {
  formName: string;
  editTicketData?: TicketTypes;
  submitTicketData: (values: any) => void;
  setTicketRequiredFields: (values: boolean) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<any>([]);
  const [thumbnaiFileList, setThumbnaiFileList] = useState<any>([]);
  const [showThumbnaiUpload, setShowThumbnaiUpload] = useState<boolean>(false);
  const [ticketValue, setTicketValue] = useState<TicketTypes>({
    ticketTypeId: formName,
    name: (editTicketData && editTicketData.name) || '',
    description: (editTicketData && editTicketData.description) || '',
    price: '',
    stock: '',
    ceilingPrice: '',
    purchaseLimit: '',
    royaltiesFee: '',
    image: (editTicketData && editTicketData.image) || '',
    imageType: '',
    thumbnailUrl: (editTicketData && editTicketData.thumbnailUrl) || '',
    thumbnailType: '',
  });

  const handleSetTicketValue = (key: string, value: string) => {
    setTicketValue({ ...ticketValue, [key]: value });
    submitTicketData({ ticketTypeId: formName, [key]: value });
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleThumbnaiUploadChange = (info: any) => {
    setThumbnaiFileList(info.fileList);
  };

  const customThumbnaiUploadRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      setTicketValue({
        ...ticketValue,
        thumbnailUrl: response.payload.url,
        thumbnailType: e.file.type,
      });
      submitTicketData({
        ticketTypeId: formName,
        thumbnailUrl: response.payload.url,
        thumbnailType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };

  const customRequest = async (e: any) => {
    const formData = new FormData();
    formData.append('file', e.file);
    const response: any = await dispatch(uploadFileAction(formData));
    if (response.type === uploadFileAction.fulfilled.toString()) {
      if (e.file.type.includes('video')) {
        setShowThumbnaiUpload(true);
      }
      setTicketValue({
        ...ticketValue,
        image: response.payload.url,
        imageType: e.file.type,
        thumbnailUrl:
          (!e.file.type.includes('video') && response.payload.url) || '',
        thumbnailType: e.file.type,
      });
      submitTicketData({
        ticketTypeId: formName,
        image: response.payload.url,
        imageType: e.file.type,
        thumbnailUrl:
          (!e.file.type.includes('video') && response.payload.url) || '',
        thumbnailType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };

  const handleThumbnaiFileRemove = () => {
    setTicketValue({
      ...ticketValue,
      thumbnailUrl: '',
      thumbnailType: '',
    });
    submitTicketData({
      ticketTypeId: formName,
      thumbnailUrl: '',
      thumbnailType: '',
    });
  };

  const handleFileRemove = () => {
    setShowThumbnaiUpload(false);
    setThumbnaiFileList([]);
    setTicketValue({
      ...ticketValue,
      image: '',
      imageType: '',
      thumbnailUrl: '',
      thumbnailType: '',
    });
    submitTicketData({
      ticketTypeId: formName,
      image: '',
      imageType: '',
      thumbnailUrl: '',
      thumbnailType: '',
    });
  };

  useEffect(() => {
    if (
      !ticketValue.name ||
      !ticketValue.description ||
      (!ticketValue.stock && ticketValue.stock !== 0) ||
      (!ticketValue.price && ticketValue.price !== 0) ||
      !ticketValue.image ||
      !ticketValue.thumbnailUrl
    ) {
      setTicketRequiredFields(true);
    } else {
      setTicketRequiredFields(false);
    }
  }, [ticketValue]);

  useEffect(() => {
    if (editTicketData) {
      let type = 'Image';
      if (
        editTicketData.imageType &&
        editTicketData.imageType.includes('video')
      ) {
        const thumbnaiFile = [
          {
            uid: formName,
            name: t('Thumbnai Image'),
            status: 'done',
            url: editTicketData.thumbnailUrl,
          },
        ];
        type = 'Video';
        setThumbnaiFileList(thumbnaiFile);
        setShowThumbnaiUpload(true);
      }
      const imageFile = [
        {
          uid: formName,
          name: t('NFT [type]', { type }),
          status: 'done',
          url: editTicketData.image,
        },
      ];
      setFileList(imageFile);
      setTicketValue({
        ...ticketValue,
        price: editTicketData.price,
        stock: editTicketData.stock,
        ceilingPrice: editTicketData.ceilingPrice,
        purchaseLimit: editTicketData.purchaseLimit,
        royaltiesFee: editTicketData.royaltiesFee,
      });
    }
  }, []);

  return (
    <div className="main-box ticket-tab">
      <Form.Item label="Ticket Type">
        <Input
          showCount
          maxLength={50}
          defaultValue={ticketValue.name}
          onChange={(e) => handleSetTicketValue('name', e.target.value)}
        />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Ticket Price">
            <Input
              suffix={priceUnit}
              value={ticketValue.price}
              defaultValue={ticketValue.price}
              onChange={(e) =>
                handleSetTicketValue(
                  'price',
                  e.target.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1'),
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="not-required" label="Ticket Ceiling Price">
            <Input
              suffix={priceUnit}
              value={ticketValue.ceilingPrice || ''}
              placeholder="Must be larger than 0"
              onChange={(e) =>
                handleSetTicketValue(
                  'ceilingPrice',
                  e.target.value
                    .replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
                    .replace((e.target.value === '0' && '0') || '', ''),
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Stock">
            <Input
              value={ticketValue.stock}
              onChange={(e) =>
                handleSetTicketValue(
                  'stock',
                  e.target.value.replace(/[^\d]/g, ''),
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="not-required" label="Ticket Purchase Limts">
            <Input
              value={ticketValue.purchaseLimit || ''}
              placeholder="Must be larger than 0"
              onChange={(e) =>
                handleSetTicketValue(
                  'purchaseLimit',
                  e.target.value
                    .replace(/[^\d]/g, '')
                    .replace((e.target.value === '0' && '0') || '', ''),
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="NFT Image">
        <UploadFileComponent
          accept="image/png, image/jpeg, image/gif, video/mp4"
          fileList={fileList}
          previewImageUrl={ticketValue.image}
          previewType={ticketValue.imageType}
          limitFileSize={30}
          handleChange={handleUploadChange}
          handleFileRemove={handleFileRemove}
          customRequest={customRequest}
          description={{
            type: t('PNG, JPEG, GIF or MP4 files only'),
            size: t('up to [size] MB in size', { size: '30' }),
          }}
        />
      </Form.Item>
      {showThumbnaiUpload && (
        <Form.Item label="Thumbnail image">
          <UploadFileComponent
            accept="image/png, image/jpeg, image/gif"
            fileList={thumbnaiFileList}
            previewImageUrl={ticketValue.thumbnailUrl}
            previewType={ticketValue.thumbnailType}
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
      <Form.Item label="NFT Description">
        <TextArea
          showCount
          maxLength={2000}
          defaultValue={ticketValue.description}
          onChange={(e) => handleSetTicketValue('description', e.target.value)}
        />
      </Form.Item>
    </div>
  );
};

export default TicketTab;
