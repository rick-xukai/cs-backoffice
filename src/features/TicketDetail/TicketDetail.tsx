import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Select, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SVG from 'react-inlinesvg';

import { FormatTimeKeys } from '../../constants/Keys';
import {
  ticketStatus,
  priceUnit,
  decimalPlaces,
  defaultCurrentPage,
  defaultPageSize,
} from '../../constants/General';
import { formatTimeStrByTimeString } from '../../utils/func';
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
  reset,
} from './TicketDetail.slice';

const { Option } = Select;

interface RouteConfigType {
  state: {
    currentPage: number;
    currentPageSize: number;
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

  const [changeStatusFlag, setChangeStatusFlag] = useState<boolean>(false);
  const [ticketStatusKey, setTicketStatusKey] = useState<number>(0);

  useEffect(() => {
    dispatch(getTicketsDetailAction({ userTicketId: ticketId }));
    return () => {
      dispatch(reset());
    };
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
        userTicketId: ticketId,
        data: { status: ticketStatusKey },
      }),
    );
  };

  return (
    <TicketDetailContainer>
      {showHeader && (
        <PageHeaderComponent
          title={t('Tickets Details')}
          showBackArrow
          clickBack={() =>
            history.push(
              `${UserRoutes.tickets}?page=${
                (location.state && location.state.currentPage) ||
                defaultCurrentPage
              }&pageSize=${
                (location.state && location.state.currentPageSize) ||
                defaultPageSize
              }`,
            )
          }
        />
      )}
      {(!loading && (
        <div className={`${showHeader && 'page-main'}`}>
          <div className="detail-container">
            <Row className="item">
              <Col span={8} className="item-key">
                {t('User Name')}
              </Col>
              <Col span={16}>{ticketsDetailData.userName}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('User Email')}
              </Col>
              <Col span={16}>{ticketsDetailData.userEmail}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Event Name')}
              </Col>
              <Col span={16}>{ticketsDetailData.event.name}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Organizer')}
              </Col>
              <Col span={16}>{ticketsDetailData.organizerName}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Type')}
              </Col>
              <Col span={16}>{ticketsDetailData.ticketType}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Seat Number')}
              </Col>
              <Col span={16}>{ticketsDetailData.seat}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Price')}
              </Col>
              <Col span={16}>{`${ticketsDetailData.price.toFixed(
                decimalPlaces,
              )} ${priceUnit}`}</Col>
            </Row>
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Number')}
              </Col>
              <Col span={16}>{ticketsDetailData.ticketNo}</Col>
            </Row>
            {ticketsDetailData.collectionAddress && (
              <Row className="item">
                <Col span={8} className="item-key">
                  {t('NFT Ticket')}
                </Col>
                <Col span={16} className="action-view">
                  <span>{ticketsDetailData.ticketType}</span>
                  <a href={ticketsDetailData.collectionAddress} target="_blank">
                    {t('View on blockchain')}
                  </a>
                </Col>
              </Row>
            )}
            <Row className="item">
              <Col span={8} className="item-key">
                {t('Ticket Status')}
              </Col>
              <Col
                span={16}
                style={{
                  display: `${(!changeStatusFlag && 'flex') || 'block'}`,
                }}
              >
                {(!changeStatusFlag && (
                  <>
                    <span>
                      {
                        ticketStatus.find(
                          (item) => item.key === ticketsDetailData.status,
                        )?.text
                      }
                    </span>
                    <span className="edit-status">
                      <SVG
                        src={Images.Edit}
                        onClick={() => setChangeStatusFlag(true)}
                      />
                    </span>
                  </>
                )) || (
                  <Row>
                    <Col span={14} style={{ paddingRight: 24 }}>
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
              <Col span={16}>
                {(ticketsDetailData.updatedAt &&
                  formatTimeStrByTimeString(
                    ticketsDetailData.updatedAt,
                    FormatTimeKeys.norm,
                  )) ||
                  '-'}
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
