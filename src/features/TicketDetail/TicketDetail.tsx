import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Select, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SVG from 'react-inlinesvg';
import { isEmpty } from 'lodash';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes } from '../../navigation/Routes';
import Images from '../../theme/Images';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { TicketDetailContainer } from './TicketDetailComponent';
import {
  getTicketsDetailAction,
  updateTicketsDetailAction,
  selectLoading,
  selectError,
  selectData,
} from './TicketDetail.slice';

const { Option } = Select;

const TicketDetail = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const ticketsDetailData = useAppSelector(selectData);

  const [changeStatusFlag, setChangeStatusFlag] = useState<boolean>(false);
  const [ticketStatus, setTicketStatus] = useState<string>('');

  useEffect(() => {
    dispatch(getTicketsDetailAction(id));
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  const handleSave = () => {
    setChangeStatusFlag(false);
    dispatch(
      updateTicketsDetailAction({
        ...ticketsDetailData,
        ticket_status: ticketStatus,
      }),
    );
  };

  return (
    <TicketDetailContainer>
      <PageHeaderComponent
        title="Tickets Details"
        showBackArrow
        clickBack={() => history.push(UserRoutes.tickets)}
      />
      {(!loading && (
        <div className="page-main">
          <div className="detail-container">
            <Row className="item">
              <Col span={8} className="item-key">
                {t('User Name')}
              </Col>
              <Col span={16}>{ticketsDetailData.user_name}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('User Email')}
              </Col>
              <Col span={16}>{ticketsDetailData.user_email}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Event Name')}
              </Col>
              <Col span={16}>{ticketsDetailData.event_name}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Organizer')}
              </Col>
              <Col span={16}>{ticketsDetailData.organizer}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Type')}
              </Col>
              <Col span={16}>{ticketsDetailData.ticket_type}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Seat Number')}
              </Col>
              <Col span={16}>{ticketsDetailData.seat_number}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Price')}
              </Col>
              <Col span={16}>{ticketsDetailData.price}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Number')}
              </Col>
              <Col span={16}>{ticketsDetailData.ticket_number}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('NFT Ticket')}
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={14}>{ticketsDetailData.nft_ticket}</Col>
                  <Col span={10} className="action-view">
                    <a href={ticketsDetailData.view_blockchain} target="_blank">
                      {t('View on blockchain')}
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Status')}
              </Col>
              <Col span={16}>
                {(!changeStatusFlag && (
                  <Row>
                    <Col span={8}>{ticketsDetailData.ticket_status}</Col>
                    <Col span={16}>
                      <div className="edit-status">
                        <SVG
                          src={Images.Edit}
                          onClick={() => setChangeStatusFlag(true)}
                        />
                      </div>
                    </Col>
                  </Row>
                )) || (
                  <Row>
                    <Col span={14} style={{ paddingRight: 24 }}>
                      <Select
                        defaultValue={ticketsDetailData.ticket_status}
                        onChange={(status: string) => setTicketStatus(status)}
                        defaultActiveFirstOption={false}
                      >
                        {!isEmpty(ticketsDetailData.allowed_status) && (
                          <>
                            {ticketsDetailData.allowed_status.map((item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            ))}
                          </>
                        )}
                      </Select>
                    </Col>
                    <Col span={10}>
                      <div className="status-btn">
                        <Button danger onClick={handleSave}>
                          {t('Save')}
                        </Button>
                        <Button
                          type="text"
                          onClick={() => setChangeStatusFlag(false)}
                        >
                          {t('Cancel')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Last Updates')}
              </Col>
              <Col span={16}>{ticketsDetailData.last_updates}</Col>
            </Row>
          </div>
        </div>
      )) || (
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      )}
    </TicketDetailContainer>
  );
};

export default TicketDetail;
