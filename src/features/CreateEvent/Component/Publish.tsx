import React, { useState } from 'react';
import { Row, Col, Radio, Tooltip, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { SetRefundKey } from '../../../constants/General';
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
    ticketTypeName: '-',
    price: '-',
    quantity: '-',
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
      dataIndex: 'ticketName',
      key: 'ticketName',
    },
    {
      title: 'Price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
    },
    {
      title: 'Quantity',
      dataIndex: 'totalAvailableQuantity',
      key: 'totalAvailableQuantity',
    },
  ];

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
                  <Col span={10} className="event-image">
                    <img
                      src={formValue.banner || Images.NoEventBanner}
                      alt=""
                    />
                  </Col>
                  <Col span={14} className="info-detail">
                    <Col className="info-detail-name">
                      {formValue.eventName || '-'}
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
                        (formValue.ticketList.length && formValue.ticketList) ||
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
                  onChange={(e) =>
                    fieldEdit(e.target.value, 'refundAndCancellation')
                  }
                  value={formValue.refundAndCancellation}
                >
                  <Space direction="vertical">
                    <Radio value={SetRefundKey.refundable}>
                      {t('Refundable')}
                    </Radio>
                    <Radio value={SetRefundKey.nonRefund}>
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
