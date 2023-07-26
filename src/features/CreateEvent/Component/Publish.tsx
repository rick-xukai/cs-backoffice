import React, { useState } from 'react';
import { Row, Col, Radio, Tooltip, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { SetRefundKey, priceUnit } from '../../../constants/General';
import Tips from '../../../components/Tips/Tips';
import TableComponent from '../../../components/Table/Table';
import { Images } from '../../../theme';
import { CreateEventFormValueProps } from '../CreateEvent.slice';
import {
  PublishComponentContainer,
  EventInfoCard,
} from '../CreateEventComponent';

const initialTicketList = [
  {
    id: 1,
    name: '-',
    price: 0,
    stock: 0,
  },
];

const Publish = ({
  formValue,
  fieldEdit,
}: {
  formValue: CreateEventFormValueProps;
  fieldEdit: (value: any, field: string) => void;
}) => {
  const { t } = useTranslation();

  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);

  const columns = [
    {
      title: 'Ticket Type Name',
      dataIndex: 'name',
      key: 'name',
      width: '45%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => (
        <div>{(price && `${price} ${priceUnit}`) || '-'}</div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: string, record: any) => (
        <div>{(stock && `${record.soldTotal || 0} / ${stock}`) || '-'}</div>
      ),
    },
  ];
  console.log(formValue.ticketTypes);

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Publish')}
      </Col>
      <Col span={24}>
        <PublishComponentContainer>
          <Col lg={(pageTipsShow && 14) || 21} span={24}>
            <div className="main-box">
              <Col span={24} className="preview-event">
                <span>{t('Preview your event')}</span>
                <span>
                  <img src={Images.ExportIcon} alt="" />
                </span>
              </Col>
              <EventInfoCard>
                <Row>
                  <Col lg={10} span={24} className="event-image">
                    <img src={formValue.image || Images.NoEventBanner} alt="" />
                  </Col>
                  <Col lg={14} span={24} className="info-detail">
                    <Col className="info-detail-name">
                      {formValue.name || '-'}
                    </Col>
                    <Col className="info-detail-items">
                      <span>
                        <img src={Images.ClockIcon} alt="" />
                      </span>
                      <span>
                        {(formValue.startTime &&
                          formValue.endTime &&
                          `${formValue.startTime} - ${formValue.endTime}`) ||
                          '-'}
                      </span>
                    </Col>
                    <Col className="info-detail-items">
                      <span>
                        <img src={Images.LocationRedIcon} alt="" />
                      </span>
                      <span>{formValue.location || '-'}</span>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col className="event-ticket">
                    <TableComponent
                      columns={columns}
                      tableData={
                        (formValue.ticketTypes.length &&
                          formValue.ticketTypes) ||
                        initialTicketList
                      }
                      loading={false}
                      showCustomPagination={false}
                    />
                  </Col>
                </Row>
              </EventInfoCard>
              <Col className="set-refund-title">
                <span>{t('Set the refund and cancellation policy')}</span>
                <span>
                  <Tooltip
                    overlayInnerStyle={{
                      fontSize: 13,
                      fontWeight: 400,
                      padding: 8,
                    }}
                    title={t(
                      'CrowdServe is not liable to issue refunds via our platform. Attendees seeking refunds will be redirected to contact you to request a refund directly',
                    )}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              </Col>
              <Col>
                <Radio.Group
                  onChange={(e) => fieldEdit(e.target.value, 'refundPolicy')}
                  value={formValue.refundPolicy}
                >
                  <Space direction="vertical">
                    <Radio value={SetRefundKey.refundable}>
                      {t('Refundable')}
                    </Radio>
                    <Radio value={SetRefundKey.nonRefundable}>
                      {t('NonRefund')}
                    </Radio>
                  </Space>
                </Radio.Group>
              </Col>
            </div>
          </Col>
          <Col span={(pageTipsShow && 10) || 3}>
            <Tips
              title={t('Publish Tips')}
              image={Images.PublishTupsIcon}
              onSizeChange={setPageTipsShow}
              content={
                <Row>
                  <Col className="content-text" span={24}>
                    {t('Last Step!')}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `The last step to creating an amazing experience! Make sure to review your event information before publishing.`,
                    )}
                  </Col>
                  <Col span={24} className="content-text">
                    {t(
                      `Nothing gives off "Bad Event" vibes more than an obvious typo. "Best Party in Town" could be misspelled "Best Panty in Town". See how one letter makes all the difference?`,
                    )}
                  </Col>
                </Row>
              }
            />
          </Col>
        </PublishComponentContainer>
      </Col>
    </Row>
  );
};

export default Publish;
