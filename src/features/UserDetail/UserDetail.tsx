import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Spin, Badge, message, Select } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import qs from 'qs';

import TableComponent from '../../components/Table/Table';
import { FormatTimeKeys } from '../../constants/Keys';
import { formatTimeStrByTimeString } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  defaultCurrentPage,
  defaultPageSize,
  activeStatus,
} from '../../constants/General';
import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { columns } from '../Tickets/Tickets';
import { UserDetailContainer } from './UserDetail.component';
import {
  reset,
  getUserDetailAction,
  getUserDetailTicketsAction,
  selectLoadingForDetail,
  selectUserDetailData,
  selectUserDetailTicketsData,
  selectLoadingForTickets,
  selectError,
  selectDataTotal,
} from './UserDetail.slice';

const { Option } = Select;

interface RouteConfigType {
  search: string;
  state: {
    currentPage: number;
    currentPageSize: number;
  };
}

const UserDetail = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location: RouteConfigType = useLocation();
  const dispatch = useAppDispatch();
  const { userId }: { userId: string } = useParams();

  const userDetailData = useAppSelector(selectUserDetailData);
  const loadingForDetail = useAppSelector(selectLoadingForDetail);
  const loadingForTickets = useAppSelector(selectLoadingForTickets);
  const userDetailTicketsData = useAppSelector(selectUserDetailTicketsData);
  const error = useAppSelector(selectError);
  const total = useAppSelector(selectDataTotal);

  const [edit, setEdit] = useState(false);
  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    currentPage: defaultCurrentPage,
    currentPageSize: defaultPageSize,
  });

  useEffect(() => {
    dispatch(getUserDetailAction(userId));
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const { page, pageSize } = qs.parse(location.search.slice(1));
    if (page && pageSize) {
      setCurrentPaginationConfig({
        currentPage: Number(page),
        currentPageSize: Number(pageSize),
      });
    }
    dispatch(
      getUserDetailTicketsAction({
        userId,
        parameters: {
          page: Number(page) || currentPaginationConfig.currentPage,
          size: Number(pageSize) || currentPaginationConfig.currentPageSize,
        },
      }),
    );
  }, [location.search]);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  return (
    <UserDetailContainer>
      <PageHeaderComponent
        title={t('User Details')}
        showBackArrow
        clickBack={() =>
          history.push(
            `${UserRoutes.users}?page=${
              (location.state && location.state.currentPage) ||
              defaultCurrentPage
            }&pageSize=${
              (location.state && location.state.currentPageSize) ||
              defaultPageSize
            }`,
          )
        }
      />
      {(!loadingForDetail && (
        <div className="page-main">
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
                  <Button type="primary" danger onClick={() => setEdit(false)}>
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
                <p className="item-key-value">{userDetailData.name}</p>
              </Col>
              <Col span={4} className="item-key">
                <p className="item-key-title">{t('Status')}</p>
                <div className="item-key-value">
                  {(edit && (
                    <Select
                      defaultValue={
                        (userDetailData.isActivated &&
                          activeStatus.active.text) ||
                        activeStatus.inActive.text
                      }
                      defaultActiveFirstOption={false}
                    >
                      {Object.values(activeStatus).map((item) => {
                        if (item.text !== activeStatus.all.text) {
                          return (
                            <Option key={item.text} value={item.text}>
                              {item.text}
                            </Option>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  )) || (
                    <Badge
                      status={
                        (!userDetailData.isActivated && 'warning') || 'success'
                      }
                      text={
                        (userDetailData.isActivated &&
                          activeStatus.active.text) ||
                        activeStatus.inActive.text
                      }
                    />
                  )}
                </div>
              </Col>
            </Row>
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('User Email')}</p>
                <p className="item-key-value">{userDetailData.email}</p>
              </Col>
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Crypto Wallet')}</p>
                <p className="item-key-value">{userDetailData.walletAddress}</p>
              </Col>
            </Row>
            <Row className="item">
              <Col span={12} className="item-key">
                <p className="item-key-title">{t('Last Action Time')}</p>
                <p className="item-key-value">
                  {(userDetailData.lastLoginAt &&
                    formatTimeStrByTimeString(
                      userDetailData.lastLoginAt,
                      FormatTimeKeys.norm,
                    )) ||
                    '-'}
                </p>
              </Col>
            </Row>
          </div>
          <div className="detail-container">
            <Row>
              <Col className="ticket-list-title">{t('Ticket List')}</Col>
            </Row>
            <div className="ticket-table">
              <TableComponent
                loading={loadingForTickets}
                currentPage={currentPaginationConfig.currentPage}
                currentPageSize={currentPaginationConfig.currentPageSize}
                columns={columns(
                  currentPaginationConfig,
                  userId,
                  UserRoutes.userDetail,
                ).filter(
                  (item) => item.key !== 'userName' && item.key !== 'userEmail',
                )}
                tableData={userDetailTicketsData}
                tableDataTotal={total}
                paginationChange={(page, pageSize) =>
                  history.push(
                    `${UserRoutes.userDetail.replace(':userId', userId)}?page=${
                      (pageSize === currentPaginationConfig.currentPageSize &&
                        page) ||
                      defaultCurrentPage
                    }&pageSize=${pageSize}`,
                  )
                }
              />
            </div>
          </div>
        </div>
      )) || (
        <Spin
          spinning={loadingForDetail}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      )}
    </UserDetailContainer>
  );
};

export default UserDetail;
