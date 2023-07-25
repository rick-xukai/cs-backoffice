import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  message,
  Spin,
  Input,
  Select,
  Tooltip,
  Dropdown,
  Modal,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  LoadingOutlined,
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import qs from 'qs';
import copy from 'copy-to-clipboard';
import { debounce } from 'lodash';

import {
  priceUnit,
  defaultPageSize,
  defaultCurrentPage,
  TokenExpireResponseCode,
} from '../../constants/General';
import { constructUrlGetParameters } from '../../utils/requestClient';
import {
  CookieKeys,
  UserRoleKeys,
  FilterEventStatus,
} from '../../constants/Keys';
import { checkEventStatus } from '../../utils/func';
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
  cancelEventAction,
  deleteEventAction,
  EventListRequestProps,
} from './Events.slice';

const { Option } = Select;
const { confirm } = Modal;

export enum EventStatusKeys {
  upcoming = 1,
  draft = 0,
  ended = 2,
  cancelled = 3,
}

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
  const [currentFilterKey, setCurrentFilterKey] = useState<number>(
    EventStatusKeys.upcoming,
  );
  const [currentFilterText, setCurrentFilterText] = useState<string>('');

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
      render: (_: string, record: EventsListDataType) => (
        <Row>
          <Col span={6}>
            <div className="event-img">
              <img src={record.image || Images.NoEventBanner} alt="" />
            </div>
          </Col>
          <Col span={18} className="table-event">
            <Row>
              <Col
                span={24}
                className="event-name"
                onClick={() =>
                  history.push(
                    (record.status === EventStatusKeys.draft &&
                      UserRoutes.editEvent.replace(':id', record.id)) ||
                      `${UserRoutes.dashboard}/${record.id}`,
                  )
                }
              >
                {record.name}
              </Col>
              <Col span={24} className="event-date">
                {record.time}
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Sold',
      dataIndex: 'soldTotal',
      key: 'soldTotal',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (soldTotal: number, record: EventsListDataType) => (
        <div>{`${soldTotal} / ${record.total}`}</div>
      ),
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (revenue: number) => (
        <div>{`${revenue.toLocaleString()} ${priceUnit}`}</div>
      ),
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
    {
      title: '',
      dataIndex: '',
      key: 'action',
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (_: any, record: EventsListDataType) => {
        const items: MenuProps['items'] = [
          {
            label: t('Dashboard'),
            key: 'Dashboard',
            style: {
              display:
                (record.status !== EventStatusKeys.draft && 'block') || 'none',
            },
            onClick: () => {
              history.push(`${UserRoutes.dashboard}/${record.id}`);
            },
          },
          {
            label: (
              <a
                href={`${process.env.REACT_APP_WEB_APP_LINK}/events/${record.slug}`}
                target="_blank"
              >
                {t('View on CrowdServe')}
              </a>
            ),
            key: 'View on CrowdServe',
            style: {
              display:
                (record.status === EventStatusKeys.upcoming && 'block') ||
                'none',
            },
          },
          {
            label: t('Edit'),
            key: 'Edit',
            onClick: () => {
              history.push(UserRoutes.editEvent.replace(':id', record.id));
            },
            style: {
              display:
                ((record.status === EventStatusKeys.upcoming ||
                  record.status === EventStatusKeys.draft) &&
                  'block') ||
                'none',
            },
          },
          {
            label: t('Delete'),
            key: 'Delete',
            style: {
              display:
                (record.status === EventStatusKeys.draft && 'block') || 'none',
            },
            onClick: () => {
              confirm({
                centered: true,
                closable: false,
                okText: t('Delete'),
                cancelText: t('Cancel'),
                title: t('Delete Event'),
                icon: <ExclamationCircleOutlined />,
                content: t('Are you sure you want to delete this event?'),
                onOk: async () => {
                  const response = await dispatch(deleteEventAction(record.id));
                  if (
                    response.type === deleteEventAction.fulfilled.toString()
                  ) {
                    message.success(t('Deleted successfully'));
                    dispatch(
                      getEventsListAction({
                        page: currentPaginationConfig.currentPage,
                        size: currentPaginationConfig.currentPageSize,
                      }),
                    );
                  }
                },
              });
            },
          },
          {
            label: t('Copy Link'),
            key: 'Copy Link',
            style: {
              display:
                (record.status !== EventStatusKeys.draft && 'block') || 'none',
            },
            onClick: () => {
              copy(
                `${process.env.REACT_APP_WEB_APP_LINK}/events/${record.slug}`,
              );
              message.success(t('Link copied.'));
            },
          },
          {
            label: t('Cancel Event'),
            key: 'Cancel Event',
            style: {
              display:
                (record.status === EventStatusKeys.upcoming && 'block') ||
                'none',
            },
            onClick: () => {
              confirm({
                centered: true,
                closable: false,
                okText: t('Cancel Event'),
                cancelText: t('Back'),
                title: t('Cancel Event'),
                icon: <ExclamationCircleOutlined />,
                content: t(
                  'Are you sure you want to cancel this event? All the user tickets will be refunded',
                ),
                onOk: async () => {
                  const response = await dispatch(cancelEventAction(record.id));
                  if (
                    response.type === cancelEventAction.fulfilled.toString()
                  ) {
                    message.success(t('Canceled successfully'));
                    dispatch(
                      getEventsListAction({
                        page: currentPaginationConfig.currentPage,
                        size: currentPaginationConfig.currentPageSize,
                      }),
                    );
                  }
                },
              });
            },
          },
        ];

        const actionIcon =
          (record.status ===
            FilterEventStatus.find((item) => item.text === 'Upcoming')?.key &&
            Images.Editor) ||
          Images.EditorDisable;

        return (
          <div className="event-list-action">
            {(actionIcon === Images.EditorDisable && (
              <div className="icon-content-disable">
                <img src={actionIcon} alt="" />
              </div>
            )) || (
              <Tooltip
                title={t('Edit')}
                overlayClassName="event-edit"
                placement="bottom"
              >
                <Link to={UserRoutes.editEvent.replace(':id', record.id)}>
                  <div className="icon-content">
                    <img src={actionIcon} alt="" />
                  </div>
                </Link>
              </Tooltip>
            )}
            <div className="icon-content">
              <Dropdown
                menu={{ items }}
                trigger={['click']}
                overlayClassName="event-more-action"
              >
                <img src={Images.MoreOutlinedIcon} alt="" />
              </Dropdown>
            </div>
          </div>
        );
      },
    },
  ];

  const handleStatusChange = (status: string) => {
    setCurrentFilterText(status);
    dispatch(
      setFilterStatus(
        FilterEventStatus.find((item) => item.text === status)?.key,
      ),
    );
    const payload: EventListRequestProps = {
      page: defaultCurrentPage,
      pageSize: defaultPageSize,
    };
    if (searchKeyword) {
      payload.keyword = searchKeyword;
    }
    if (status !== 'All') {
      payload.status = FilterEventStatus.find(
        (item) => item.text === status,
      )?.key?.toString();
    } else {
      payload.status = null;
    }
    history.push(constructUrlGetParameters(UserRoutes.events, payload));
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
    const { page, pageSize, keyword, status } = qs.parse(
      location.search.slice(1),
    ) as any;
    const payload: EventListRequestProps = {
      page: page || currentPaginationConfig.currentPage,
      pageSize: pageSize || currentPaginationConfig.currentPageSize,
      status:
        (!currentFilterText && EventStatusKeys.upcoming.toString()) || null,
    };
    if (page && pageSize) {
      setCurrentPaginationConfig({
        currentPage: Number(page),
        currentPageSize: Number(pageSize),
      });
    }
    if (keyword) {
      dispatch(setSearchKeyword(keyword));
      payload.keyword = keyword;
    }
    if (status) {
      setCurrentFilterKey(Number(status));
      if (currentFilterText !== 'All') {
        payload.status = status;
      }
    }
    dispatch(getEventsListAction(payload));
  }, [location.search]);

  const handleSearchEvent = (value: string) => {
    const payload: EventListRequestProps = {
      page: defaultCurrentPage,
      pageSize: defaultPageSize,
      keyword: value.replace(/\s*/g, ''),
      status: filterStatus?.toString(),
    };
    history.push(constructUrlGetParameters(UserRoutes.events, payload));
  };

  const searchInputChange = useCallback(
    debounce((e) => handleSearchEvent(e.target.value), 300),
    [],
  );

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
                    onChange={(e) => {
                      dispatch(setSearchKeyword(e.target.value));
                      searchInputChange(e);
                    }}
                  />
                </Col>
                <Col span={10} className="filter-status">
                  <span>{t('Status')}:</span>
                  <Select
                    defaultValue={
                      (currentFilterText !== 'All' &&
                        FilterEventStatus.find(
                          (item) => item.key === currentFilterKey,
                        )?.text) ||
                      currentFilterText
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
            {(eventsListData.length && (
              <Col span={10}>
                <Link to={UserRoutes.createEvent}>
                  <Button type="primary" className="create-new-event">
                    <PlusOutlined />
                    {t('Create New Event')}
                  </Button>
                </Link>
              </Col>
            )) ||
              null}
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
