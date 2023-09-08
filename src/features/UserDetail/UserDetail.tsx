import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Spin, message, Avatar } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import qs from 'qs';

import { useCookie } from '../../hooks';
import TableComponent from '../../components/Table/Table';
import { FormatTimeKeys, CookieKeys } from '../../constants/Keys';
import { formatTimeStrByTimeString, formatLabelDate } from '../../utils/func';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  defaultCurrentPage,
  defaultPageSize,
  TokenExpireResponseCode,
} from '../../constants/General';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { columns } from '../Tickets/Tickets';
import { logoutAction } from '../Authentication/Login/Login.slice';
import {
  UserDetailContainer,
  UserStatusContainer,
  UserInfoItemContainer,
} from './UserDetail.component';
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
import { Images } from '../../theme';

interface RouteConfigType {
  search: string;
  pathname: string;
  state: {
    ticketListPage: number;
    ticketListPageSize: number;
    userListPage: number;
    userListPageSize: number;
  };
}

const UserDetail = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location: RouteConfigType = useLocation();
  const dispatch = useAppDispatch();
  const { userId }: { userId: string } = useParams();
  const cookies = useCookie([CookieKeys.authUser]);

  const userDetailData = useAppSelector(selectUserDetailData);
  const loadingForDetail = useAppSelector(selectLoadingForDetail);
  const loadingForTickets = useAppSelector(selectLoadingForTickets);
  const userDetailTicketsData = useAppSelector(selectUserDetailTicketsData);
  const error = useAppSelector(selectError);
  const total = useAppSelector(selectDataTotal);

  const [edit, setEdit] = useState(false);
  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    ticketListPage: defaultCurrentPage,
    ticketListPageSize: defaultPageSize,
  });

  const onLogout = async () => {
    cookies.removeCookie(CookieKeys.authUser);
    await dispatch(logoutAction());
    history.push(AuthRoutes.login);
  };

  useEffect(() => {
    dispatch(getUserDetailAction(userId.split('?')[0]));
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const { page, pageSize } = qs.parse(location.pathname.split('?')[1]);
    if (page && pageSize) {
      setCurrentPaginationConfig({
        ticketListPage: Number(page),
        ticketListPageSize: Number(pageSize),
      });
    }
    dispatch(
      getUserDetailTicketsAction({
        userId: userId.split('?')[0],
        parameters: {
          page: Number(page) || currentPaginationConfig.ticketListPage,
          size: Number(pageSize) || currentPaginationConfig.ticketListPageSize,
        },
      }),
    );
  }, [location.pathname]);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        onLogout();
        message.error(t('User token is deprecated, please log in again.'));
        return;
      }
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
              (location.state && location.state.userListPage) ||
              defaultCurrentPage
            }&pageSize=${
              (location.state && location.state.userListPageSize) ||
              defaultPageSize
            }`,
          )
        }
      />
      {(!loadingForDetail && (
        <div className="page-main">
          <Row style={{ display: 'none' }}>
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
            <Row className="container-user">
              <Col xl={2} xs={6} lg={3} sm={4}>
                <Avatar>{userDetailData.name.charAt(0)}</Avatar>
              </Col>
              <Col xl={22} xs={18} lg={21} sm={20}>
                <Row className="container-user-top">
                  <Col span={24}>
                    <div className="user-name-content">
                      <span className="user-name">{userDetailData.name}</span>
                      <UserStatusContainer
                        isActive={userDetailData.isActivated}
                      >
                        {(!userDetailData.isActivated && 'Inactive') ||
                          'Active'}
                      </UserStatusContainer>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="user-info-content">
                      <UserInfoItemContainer>
                        <img src={Images.EmailIcon} alt="" />
                        <span>{userDetailData.email || '-'}</span>
                      </UserInfoItemContainer>
                      <UserInfoItemContainer>
                        <img src={Images.GenderIcon} alt="" />
                        <span>{userDetailData.gender || '-'}</span>
                      </UserInfoItemContainer>
                      <UserInfoItemContainer>
                        <img
                          style={{ marginTop: '-2px' }}
                          src={Images.BirthIcon}
                          alt=""
                        />
                        <span>
                          {(userDetailData.birthday &&
                            formatTimeStrByTimeString(
                              formatLabelDate(userDetailData.birthday),
                              FormatTimeKeys.mdy,
                            )) ||
                            '-'}
                        </span>
                      </UserInfoItemContainer>
                      <UserInfoItemContainer>
                        <img
                          style={{ marginTop: '-2px' }}
                          src={Images.CountryIcon}
                          alt=""
                        />
                        <span>{userDetailData.country || '-'}</span>
                      </UserInfoItemContainer>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="item" style={{ marginBottom: 0 }}>
              <Col span={24} md={12} className="item-key">
                <p className="item-key-title">{t('Crypto Wallet')}</p>
                <p className="item-key-value mobile-top">
                  {userDetailData.walletAddress || '-'}
                </p>
              </Col>
              <Col span={24} md={12} className="item-key">
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
                currentPage={currentPaginationConfig.ticketListPage}
                currentPageSize={currentPaginationConfig.ticketListPageSize}
                columns={columns(
                  {
                    ...currentPaginationConfig,
                    userListPage:
                      (location.state && location.state.userListPage) ||
                      defaultCurrentPage,
                    useListPageSize:
                      (location.state && location.state.userListPageSize) ||
                      defaultPageSize,
                  },
                  userId.split('?')[0],
                  UserRoutes.userDetail,
                ).filter(
                  (item) => item.key !== 'userName' && item.key !== 'userEmail',
                )}
                tableData={userDetailTicketsData}
                tableDataTotal={total}
                paginationChange={(page, pageSize) =>
                  history.push({
                    pathname: `${UserRoutes.userDetail.replace(
                      ':userId',
                      userId.split('?')[0],
                    )}?page=${
                      (pageSize === currentPaginationConfig.ticketListPage &&
                        page) ||
                      defaultCurrentPage
                    }&pageSize=${pageSize}`,
                    state: {
                      userListPage:
                        (location.state && location.state.userListPage) ||
                        defaultCurrentPage,
                      userListPageSize:
                        (location.state && location.state.userListPageSize) ||
                        defaultPageSize,
                      ticketListPage: currentPaginationConfig.ticketListPage,
                      ticketListPageSize:
                        currentPaginationConfig.ticketListPageSize,
                    },
                  })
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
