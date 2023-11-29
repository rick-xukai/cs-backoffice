import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, Tooltip, Space, Input } from 'antd';
import { QuestionCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useCookie } from '../../../hooks';
import { isEmail } from '../../../utils/validator';
import { UserRoutes } from '../../../navigation/Routes';
import { formatTimeStrByTimeString } from '../../../utils/func';
import {
  FormatTimeKeys,
  CookieKeys,
  UserRoleKeys,
} from '../../../constants/Keys';
import { SetRefundKey, priceUnit } from '../../../constants/General';
import Tips from '../../../components/Tips/Tips';
import TableComponent from '../../../components/Table/Table';
import { Images } from '../../../theme';
import { CreateEventFormValueProps } from '../CreateEvent.slice';
import {
  PublishComponentContainer,
  EventInfoCard,
} from '../CreateEventComponent';
import Preview from './Preview';
import { OrganizerProfileInfo } from '../../Profile/Profile.slice';

const initialTicketList = [
  {
    id: 1,
    name: '-',
    price: '-',
    stock: '-',
  },
];

const Publish = ({
  formValue,
  userProfileInfo,
  inputContactEmailError,
  isEventEdit,
  fieldEdit,
  setInputContactEmailError,
}: {
  formValue: CreateEventFormValueProps;
  userProfileInfo: OrganizerProfileInfo;
  inputContactEmailError: boolean;
  isEventEdit: boolean;
  fieldEdit: (value: any, field: string) => void;
  setInputContactEmailError: (status: boolean) => void;
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const cookie = useCookie([CookieKeys.authUserRole]);

  const [pageTipsShow, setPageTipsShow] = useState<boolean>(true);
  const [show, setShow] = useState(false);
  const [showGoProfileTooltip, setShowGoProfileTooltip] =
    useState<boolean>(false);

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
        <div>
          {(!Number.isNaN(Number(price)) && `${price} ${priceUnit}`) || '-'}
        </div>
      ),
    },
    {
      title: 'Sold / Total Available Quantity',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: string, record: any) => (
        <div>
          {(!Number.isNaN(Number(stock)) &&
            `${record.soldTotal || 0} / ${stock}`) ||
            '- / -'}
        </div>
      ),
    },
  ];

  const contactEmailChange = (value: string) => {
    let contactEmail = '';
    if (value) {
      if (isEmail(value)) {
        setInputContactEmailError(false);
        contactEmail = value;
      } else {
        setInputContactEmailError(true);
      }
    } else {
      setInputContactEmailError(false);
    }
    fieldEdit(contactEmail, 'contactEmail');
  };

  const checkContactEmailDefaultValue = () => {
    if (isEventEdit) {
      if (formValue.contactEmail) {
        return formValue.contactEmail;
      }
      return '';
    }
    return userProfileInfo.contactEmail;
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  useEffect(() => {
    const role = cookie.getCookie(CookieKeys.authUserRole);
    if (role && role !== UserRoleKeys.superAdmin) {
      setShowGoProfileTooltip(true);
    }
  }, []);

  return (
    <Row>
      <Col span={24} className="main-title">
        {t('Publish')}
      </Col>
      <Col span={24}>
        <PublishComponentContainer>
          <Col lg={(pageTipsShow && 14) || 21} span={24}>
            <div className="main-box">
              <Col
                span={24}
                className="preview-event"
                onClick={() => setShow(true)}
              >
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
                          `${formatTimeStrByTimeString(
                            formValue.startTime,
                            FormatTimeKeys.norm,
                          )} - ${formatTimeStrByTimeString(
                            formValue.endTime,
                            FormatTimeKeys.norm,
                          )}`) ||
                          '-'}
                      </span>
                    </Col>
                    <Col className="info-detail-items">
                      <span>
                        <img src={Images.LocationRedIcon} alt="" />
                      </span>
                      <span>
                        {(formValue.location &&
                          `${formValue.location}${
                            (formValue.address && `, ${formValue.address}`) ||
                            ''
                          }`) ||
                          '-'}
                      </span>
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col className="event-ticket">
                    <TableComponent
                      columns={columns}
                      tableData={
                        (formValue.ticketTypes.length &&
                          formValue.ticketTypes.filter(
                            (item) => !item.delete,
                          )) ||
                        initialTicketList
                      }
                      loading={false}
                      showCustomPagination={false}
                    />
                  </Col>
                </Row>
              </EventInfoCard>
              <Col className="set-refund-title">
                <span className="title-label">{t('Contact Email')}</span>
                {showGoProfileTooltip && (
                  <span>
                    <Tooltip
                      overlayInnerStyle={{
                        fontSize: 13,
                        fontWeight: 400,
                        padding: 8,
                      }}
                      title={
                        <div
                          className="contact-email-tooltip"
                          onClick={() => history.push(UserRoutes.profile)}
                        >
                          <span>
                            {t(
                              'Set the default contact email in your company profile. ',
                            )}
                          </span>
                          <span>
                            {t('Go')} <DoubleRightOutlined />
                          </span>
                        </div>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                )}
              </Col>
              <Col className="contact-email-input">
                {inputContactEmailError && (
                  <div className="contact-email-error">
                    {t('Please enter a valid email address.')}
                  </div>
                )}
                <Input
                  defaultValue={checkContactEmailDefaultValue()}
                  onChange={(e) => contactEmailChange(e.target.value)}
                />
              </Col>
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
      <Preview eventDetail={formValue} show={show} onHide={setShow} />
    </Row>
  );
};

export default Publish;
