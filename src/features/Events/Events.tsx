import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Row, Col, message, Spin, Input, Select } from 'antd';
import {
  LoadingOutlined,
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import qs from 'qs';

import {
  priceUnit,
  defaultPageSize,
  defaultCurrentPage,
  TokenExpireResponseCode,
} from '../../constants/General';
import {
  FormatTimeKeys,
  CookieKeys,
  UserRoleKeys,
  FilterEventStatus,
} from '../../constants/Keys';
import { formatTimeStrByTimeString, checkEventStatus } from '../../utils/func';
import { Images, Colors } from '../../theme';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { useCookie } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import {
  EventsContainer,
  AddNewEventContainer,
  EventListTableContainer,
  EventStatusBadge,
} from './EventsComponent';
import {
  reset,
  selectError,
  getEventsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
  EventsListDataType,
  setSearchKeyword,
  setFilterStatus,
  selectFilterStatus,
  selectSearchKeyword,
} from './Events.slice';

const { Option } = Select;

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
  const filterStatus = useAppSelector(selectFilterStatus);
  const searchKeyword = useAppSelector(selectSearchKeyword);

  const [tableColumns, setTableColumns] = useState([]);
  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    currentPage: defaultCurrentPage,
    currentPageSize: defaultPageSize,
  });

  const columns = [
    {
      title: 'Event',
      dataIndex: 'name',
      key: 'name',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      width: 480,
      render: (text: string, record: EventsListDataType) => (
        <Row>
          <Col span={6}>
            <div className="event-img">
              <img src={Images.NoEventBanner} alt="" />
            </div>
          </Col>
          <Col span={18} className="table-event">
            <Row>
              <Col span={24} className="event-name">
                {record.name}
              </Col>
              <Col span={24} className="event-date">
                {`${formatTimeStrByTimeString(
                  record.startTime,
                  FormatTimeKeys.norm,
                )} - ${formatTimeStrByTimeString(
                  record.endTime,
                  FormatTimeKeys.norm,
                )}`}
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Sold',
      dataIndex: 'startTime',
      key: 'startTime',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: () => <div>2917 / 3000</div>,
    },
    {
      title: 'Revenue',
      dataIndex: 'location',
      key: 'location',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: () => <div>{`${'482,038'}${priceUnit}`}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (status: number) => {
        const background =
          FilterEventStatus.find((item) => item.key === status)?.background ||
          Colors.orange2;
        const color =
          FilterEventStatus.find((item) => item.key === status)?.color ||
          Colors.orange3;
        return (
          <EventStatusBadge color={color} background={background}>
            {checkEventStatus(status)}
          </EventStatusBadge>
        );
      },
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'action',
    //   role: [
    //     UserRoleKeys.organizerAdmin,
    //     UserRoleKeys.organizerUser,
    //     UserRoleKeys.partnerAdmin,
    //     UserRoleKeys.superAdmin,
    //   ],
    //   render: () => <p></p>,
    // },
  ];

  const handleStatusChange = (status: string) => {
    let currentStatus: number | null = null;
    currentStatus =
      FilterEventStatus.find((item) => item.text === status)?.key || null;
    dispatch(setFilterStatus(currentStatus));
  };

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
      {(loading && (
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined spin />}
          size="large"
        />
      )) || (
        <div className="page-main">
          <Row className="event-filter-container">
            <Col span={24} lg={14}>
              <Row className="content">
                <Col span={14}>
                  <Input
                    value={searchKeyword}
                    placeholder={t('Search event')}
                    allowClear={{ clearIcon: <CloseOutlined /> }}
                    suffix={!searchKeyword && <SearchOutlined />}
                    onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
                  />
                </Col>
                <Col span={10} className="filter-status">
                  <span>{t('Status')}:</span>
                  <Select
                    defaultValue={
                      FilterEventStatus.find(
                        (item) => item.key === filterStatus,
                      )?.text
                    }
                    onChange={handleStatusChange}
                    defaultActiveFirstOption={false}
                  >
                    {FilterEventStatus.map((item) => (
                      <Option key={item.text} value={item.text}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
            {eventsListData.length && (
              <Col span={10}>
                <Link to={UserRoutes.createEvent}>
                  <Button type="primary" className="create-new-event">
                    <PlusOutlined />
                    {t('Create New Event')}
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
          {(eventsListData.length && (
            <EventListTableContainer>
              <TableComponent
                loading={false}
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
            </EventListTableContainer>
          )) || (
            <AddNewEventContainer>
              <div>
                <img src={Images.AddNewEventIcon} alt="" />
                <p className="title">{t('Create New Event')}</p>
                <p className="description">
                  {t(
                    'Be the catalyst for extraordinary moments. Create your event and captivate your audience now!',
                  )}
                </p>
                <Link to={UserRoutes.createEvent}>
                  <Button type="primary">
                    <PlusOutlined />
                    {t('Create New Event')}
                  </Button>
                </Link>
              </div>
            </AddNewEventContainer>
          )}
        </div>
      )}
    </EventsContainer>
  );
};

export default Events;
