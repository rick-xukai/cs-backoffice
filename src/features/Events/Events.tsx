import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Tooltip, Row, Col, message } from 'antd';
import qs from 'qs';

import {
  defaultPageSize,
  defaultCurrentPage,
  TokenExpireResponseCode,
} from '../../constants/General';
import { FormatTimeKeys, CookieKeys, UserRoleKeys } from '../../constants/Keys';
import { formatTimeStrByTimeString, checkEventStatus } from '../../utils/func';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { useCookie } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventsContainer } from './EventsComponent';
import {
  reset,
  selectError,
  getEventsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
  EventsListDataType,
} from './Events.slice';

const Events = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const cookie = useCookie([CookieKeys.authUserRole]);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const eventsListData = useAppSelector(selectData);
  const eventsListDataTotal = useAppSelector(selectDataTotal);

  const [tableColumns, setTableColumns] = useState([]);
  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    currentPage: defaultCurrentPage,
    currentPageSize: defaultPageSize,
  });

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'name',
      key: 'name',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (text: string, record: EventsListDataType) => (
        <Tooltip title={text}>
          <Button className="name-btn ellipsis">
            <Link
              to={{
                pathname: UserRoutes.eventInfo.replace(
                  ':id',
                  record.id.toString(),
                ),
                state: currentPaginationConfig,
              }}
            >
              {text}
            </Link>
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Event Time',
      dataIndex: 'startTime',
      key: 'startTime',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (text: string, record: EventsListDataType) => (
        <div>
          <p>{formatTimeStrByTimeString(text, FormatTimeKeys.norm)} -</p>
          <p>
            {formatTimeStrByTimeString(record.endTime, FormatTimeKeys.norm)}
          </p>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="text-ellipsis">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Organizer',
      dataIndex: 'organizerName',
      key: 'organizerName',
      role: [UserRoleKeys.superAdmin],
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="text-ellipsis">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Partner',
      dataIndex: 'partnerName',
      key: 'partnerName',
      role: [UserRoleKeys.superAdmin],
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (text: string) => (
        <div>
          <p>{formatTimeStrByTimeString(text, FormatTimeKeys.mdy)}</p>
          <p style={{ fontSize: 13 }}>
            {formatTimeStrByTimeString(text, FormatTimeKeys.hm)}
          </p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => <p>{checkEventStatus(status)}</p>,
    },
  ];

  useEffect(() => {
    const roleColumns: any = [];
    columns.forEach((item) => {
      if (item.role?.includes(cookie.getCookie(CookieKeys.authUserRole))) {
        roleColumns.push(item);
      }
    });
    setTableColumns(roleColumns);
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
    const { page, pageSize } = qs.parse(location.search.slice(1));
    if (page && pageSize) {
      setCurrentPaginationConfig({
        currentPage: Number(page),
        currentPageSize: Number(pageSize),
      });
    }
    dispatch(
      getEventsListAction({
        page: Number(page) || currentPaginationConfig.currentPage,
        size: Number(pageSize) || currentPaginationConfig.currentPageSize,
      }),
    );
  }, [location.search]);

  return (
    <EventsContainer>
      <PageHeaderComponent title={t('Events')} />
      <div className="page-main">
        <Row>
          <Col span={24} className="create-event">
            <Link to={UserRoutes.createEvent}>
              <Button>{t('Create New Event')}</Button>
            </Link>
          </Col>
        </Row>
        <TableComponent
          loading={loading}
          currentPage={currentPaginationConfig.currentPage}
          currentPageSize={currentPaginationConfig.currentPageSize}
          columns={tableColumns}
          tableData={eventsListData}
          tableDataTotal={eventsListDataTotal}
          paginationChange={(page, pageSize) =>
            history.push(
              `${UserRoutes.events}?page=${
                (pageSize === currentPaginationConfig.currentPageSize &&
                  page) ||
                defaultCurrentPage
              }&pageSize=${pageSize}`,
            )
          }
        />
      </div>
    </EventsContainer>
  );
};

export default Events;
