import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Select, Button, Spin, message } from 'antd';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';

import { FormatTimeKeys } from '../../constants/Keys';
import {
  ticketStatus,
  priceUnit,
  decimalPlaces,
  defaultCurrentPage,
  defaultPageSize,
  TokenExpireResponseCode,
} from '../../constants/General';
import { formatTimeStrByTimeString } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { TicketDetailContainer } from './TicketDetailComponent';
import {
  getTicketsDetailAction,
  updateTicketsDetailAction,
  selectLoading,
  selectError,
  selectData,
  reset,
  selectChangeStatusSuccess,
} from './TicketDetail.slice';

const { Option } = Select;

interface RouteConfigType {
  state: {
    id?: string;
    ticketListPage: number;
    ticketListPageSize: number;
    userListPage: number;
    userListPageSize: number;
    previousPath?: string;
  };
}

const TicketDetail = ({ showHeader = true }: { showHeader: boolean }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location: RouteConfigType = useLocation();
  const { ticketId }: { ticketId: string } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const ticketsDetailData = useAppSelector(selectData);
  const changeStatusSuccess = useAppSelector(selectChangeStatusSuccess);

  const [ticketStatusKey, setTicketStatusKey] = useState<number>(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getTicketsDetailAction({ userTicketId: ticketId }));
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        history.push(AuthRoutes.login);
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (changeStatusSuccess) {
      setEdit(false);
      message.success(t('Change Completed'));
    }
  }, [changeStatusSuccess]);

  const handleSave = () => {
    dispatch(
      updateTicketsDetailAction({
        userTicketId: ticketId,
        data: { status: ticketStatusKey },
      }),
    );
  };

  const handleClickBack = () => {
    if (location.state.previousPath) {
      history.push({
        pathname: `${location.state.previousPath.replace(
          ':userId',
          location.state.id || '',
        )}?page=${
          (location.state && location.state.ticketListPage) ||
          defaultCurrentPage
        }&pageSize=${
          (location.state && location.state.ticketListPageSize) ||
          defaultPageSize
        }`,
        state: {
          userListPage: location.state.userListPage,
          userListPageSize: location.state.userListPageSize,
        },
      });
    } else {
      history.push(
        `${UserRoutes.tickets}?page=${
          (location.state && location.state.ticketListPage) ||
          defaultCurrentPage
        }&pageSize=${
          (location.state && location.state.ticketListPageSize) ||
          defaultPageSize
        }`,
      );
    }
  };

  return (
    <TicketDetailContainer>
      {showHeader && (
        <PageHeaderComponent
          title={t('Tickets Details')}
          showBackArrow
          clickBack={handleClickBack}
        />
      )}
      {(!loading && (
        <div className={`${showHeader && 'page-main'}`}>
          <Row>
            <Col span={24} className="edit-status">
              {(!edit && (
                <Button type="primary" danger onClick={() => setEdit(true)}>
                  <EditOutlined />
                  {t('Edit')}
                </Button>
              )) || (
                <div>
                  <Button onClick={() => setEdit(false)}>{t('Cancel')}</Button>
                  <Button type="primary" danger onClick={handleSave}>
                    {t('Save')}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          <div className="detail-container">
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('User Name')}</p>
                <p className="item-key-value">{ticketsDetailData.userName}</p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('User Email')}</p>
                <p className="item-key-value">{ticketsDetailData.userEmail}</p>
              </Col>
            </Row>
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Event Name')}</p>
                <p className="item-key-value">{ticketsDetailData.event.name}</p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Organizer')}</p>
                <p className="item-key-value">
                  {ticketsDetailData.organizerName}
                </p>
              </Col>
            </Row>
          </div>
          <div className="detail-container">
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Ticket Type')}</p>
                <p className="item-key-value">{ticketsDetailData.ticketType}</p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Ticket Number')}</p>
                <p className="item-key-value">{ticketsDetailData.ticketNo}</p>
              </Col>
            </Row>
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Price')}</p>
                <p className="item-key-value">{`${ticketsDetailData.price.toFixed(
                  decimalPlaces,
                )} ${priceUnit}`}</p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Seat Number')}</p>
                <p className="item-key-value">{ticketsDetailData.seat}</p>
              </Col>
            </Row>
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('NFT Ticket')}</p>
                <p className="item-key-value action-view">
                  <span>{ticketsDetailData.ticketType}</span>
                  {ticketsDetailData.collectionAddress && (
                    <a
                      href={ticketsDetailData.collectionAddress}
                      target="_blank"
                    >
                      {t('View on blockchain')}
                    </a>
                  )}
                </p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Last Updates')}</p>
                <p className="item-key-value">
                  {(ticketsDetailData.updatedAt &&
                    formatTimeStrByTimeString(
                      ticketsDetailData.updatedAt,
                      FormatTimeKeys.norm,
                    )) ||
                    '-'}
                </p>
              </Col>
            </Row>
            <Row className="item">
              <Col span={6} className="item-key">
                <p className="item-key-title">{t('Ticket Status')}</p>
                <div className="item-key-value">
                  {(edit && (
                    <Select
                      defaultValue={
                        ticketStatus.find(
                          (item) => item.key === ticketsDetailData.status,
                        )?.text
                      }
                      onChange={(status: string) =>
                        setTicketStatusKey(
                          ticketStatus.find((item) => item.text === status)
                            ?.key as number,
                        )
                      }
                      defaultActiveFirstOption={false}
                    >
                      {ticketStatus.map((item) => (
                        <Option key={item.key} value={item.text}>
                          {item.text}
                        </Option>
                      ))}
                    </Select>
                  )) ||
                    ticketStatus.find(
                      (item) => item.key === ticketsDetailData.status,
                    )?.text}
                </div>
              </Col>
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
