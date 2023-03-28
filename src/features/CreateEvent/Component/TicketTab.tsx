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
  submitTicketData,
  setTicketRequiredFields,
}: {
  formName: string;
  submitTicketData: (values: TicketTypes) => void;
  setTicketRequiredFields: (values: boolean) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<any>([]);
  const [ticketValue, setTicketValue] = useState<TicketTypes>({
    ticketTypeId: formName,
    name: '',
    description: '',
    price: '',
    stock: '',
    ceilingPrice: '',
    purchaseLimit: '',
    royaltiesFee: 0,
    image: '',
    imageType: '',
  });

  const handleSetTicketValue = (key: string, value: string | number) => {
    if (
      key === 'price' ||
      key === 'stock' ||
      key === 'ceilingPrice' ||
      key === 'purchaseLimit'
    ) {
      setTicketValue({ ...ticketValue, [key]: (value && Number(value)) || '' });
    } else {
      setTicketValue({ ...ticketValue, [key]: value });
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
      setTicketValue({
        ...ticketValue,
        image: response.payload.url,
        imageType: e.file.type,
      });
      e.onSuccess();
    } else {
      e.onError();
    }
  };

  useEffect(() => {
    submitTicketData(ticketValue);
    if (
      !ticketValue.name ||
      !ticketValue.description ||
      !ticketValue.price ||
      !ticketValue.image
    ) {
      setTicketRequiredFields(true);
    } else {
      setTicketRequiredFields(false);
    }
  }, [ticketValue]);

  return (
    <div className="main-box ticket-tab">
      <Form.Item label="Ticket Type">
        <Input
          showCount
          maxLength={50}
          onChange={(e) => handleSetTicketValue('name', e.target.value)}
        />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item label="Ticket Price">
            <Input
              suffix={priceUnit}
              value={ticketValue.price}
              onChange={(e) =>
                handleSetTicketValue(
                  'price',
                  e.target.value.replace(/[^\d]/g, ''),
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="not-required" label="Ticket Ceiling Price">
            <Input
              suffix={priceUnit}
              value={ticketValue.ceilingPrice}
              onChange={(e) =>
                handleSetTicketValue(
                  'ceilingPrice',
                  e.target.value.replace(/[^\d]/g, ''),
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item className="not-required" label="Stock">
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
              value={ticketValue.purchaseLimit}
              onChange={(e) =>
                handleSetTicketValue(
                  'purchaseLimit',
                  e.target.value.replace(/[^\d]/g, ''),
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="NFT Image">
        <UploadFileComponent
          accept="image/png, image/jpeg, image/gif"
          fileList={fileList}
          previewImageUrl={ticketValue.image}
          limitFileSize={5}
          handleChange={handleUploadChange}
          customRequest={customRequest}
          description={{
            type: t('PNG, JPEG or GIF files only'),
            size: t('up to [size] MB in size', { size: '5' }),
          }}
        />
      </Form.Item>
      <Form.Item label="Event Description">
        <TextArea
          showCount
          maxLength={500}
          onChange={(e) => handleSetTicketValue('description', e.target.value)}
        />
      </Form.Item>
      <Form.Item></Form.Item>
    </div>
  );
};

export default TicketTab;
