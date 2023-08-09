import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  message,
  Input,
  Select,
  Tooltip,
  Dropdown,
  Modal,
  Spin,
  Pagination,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { debounce } from 'lodash';

import {
  priceUnit,
  defaultCurrentPage,
  TokenExpireResponseCode,
} from '../../constants/General';
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
  EventInfoCardResponsive,
} from './EventsComponent';
import {
  resetState,
  selectError,
  setPage,
  setPageSize,
  selectPage,
  selectPageSize,
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
  EventStatusKeys,
} from './Events.slice';
import { SGD_UNIT } from '../../constants/constants';

const { Option } = Select;
const { confirm } = Modal;

export const getBadge = (status: number) => {
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
};
const Events = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookie = useCookie([CookieKeys.authUserRole]);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const eventsListData = useAppSelector(selectData);
  const eventsListDataTotal = useAppSelector(selectDataTotal);
  const page = useAppSelector(selectPage);
  const size = useAppSelector(selectPageSize);
  const filterStatus = useAppSelector(selectFilterStatus);
  const searchKeyword = useAppSelector(selectSearchKeyword);

  const [tableColumns, setTableColumns] = useState([]);
  const [showNoSearchData, setShowNoSearchData] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [cancelSuccess, setCancelSuccess] = useState<boolean>(false);
  const goToDashboard = (id: any, name: any) => {
    history.push(
      UserRoutes.eventDashbaord.replace(':id', id).replace(':name', name),
    );
  };
  const renderListItemAction = (record: EventsListDataType) => {
    const items: MenuProps['items'] = [
      {
        label: t('Dashboard'),
        key: 'Dashboard',
        style: {
          display:
            (record.status !== EventStatusKeys.draft && 'block') || 'none',
        },
        onClick: () => {
          goToDashboard(record.id, record.name);
        },
      },
      {
        label: (
          <a
            href={`${process.env.REACT_APP_WEB_APP_LINK}/scan-qr-code/${
              record.slug.split('-')[record.slug.split('-').length - 1]
            }`}
            target="_blank"
          >
            {t('Scanner Link')}
          </a>
        ),
        key: 'Scanner Link',
        style: {
          display:
            (record.status === EventStatusKeys.upcoming && 'block') || 'none',
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
            (record.status === EventStatusKeys.upcoming && 'block') || 'none',
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
          setCancelSuccess(false);
          setDeleteSuccess(false);
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
              if (response.type === deleteEventAction.fulfilled.toString()) {
                message.success(t('Deleted successfully'));
                setDeleteSuccess(true);
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
          copy(`${process.env.REACT_APP_WEB_APP_LINK}/events/${record.slug}`);
          message.success(t('Link copied.'));
        },
      },
      {
        label: t('Cancel Event'),
        key: 'Cancel Event',
        style: {
          display:
            (record.status === EventStatusKeys.upcoming && 'block') || 'none',
        },
        onClick: () => {
          setCancelSuccess(false);
          setDeleteSuccess(false);
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
              if (response.type === cancelEventAction.fulfilled.toString()) {
                message.success(t('Canceled successfully'));
                setCancelSuccess(true);
              }
            },
          });
        },
      },
    ];

    let iconDisable = false;

    if (
      record.status !== EventStatusKeys.upcoming &&
      record.status !== EventStatusKeys.draft
    ) {
      iconDisable = true;
    }

    return (
      <div className="event-list-action">
        {(iconDisable && (
          <div className="icon-content-disable">
            <img src={Images.EditorDisable} alt="" />
          </div>
        )) || (
          <Tooltip
            title={t('Edit')}
            overlayClassName="event-edit"
            placement="bottom"
          >
            <Link to={UserRoutes.editEvent.replace(':id', record.id)}>
              <div className="icon-content">
                <img src={Images.Editor} alt="" />
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
  };

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
            <div
              className={
                (record.image.includes('.gif') && 'event-img type-gif') ||
                'event-img'
              }
            >
              <img src={record.image || Images.NoEventBanner} alt="" />
            </div>
          </Col>
          <Col span={18} className="table-event">
            <Row>
              <Col
                span={24}
                className="event-name"
                onClick={() =>
                  record.status === EventStatusKeys.draft
                    ? history.push(
                        UserRoutes.editEvent.replace(':id', record.id),
                      )
                    : goToDashboard(record.id, record.name)
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
      render: (status: number) => getBadge(status),
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
      render: (_: any, record: EventsListDataType) =>
        renderListItemAction(record),
    },
  ];

  const handleStatusChange = (status: string) => {
    dispatch(
      setFilterStatus(
        FilterEventStatus.find((item) => item.text === status)?.key,
      ),
    );
    dispatch(setPage(defaultCurrentPage));
  };

  const requestEventsList = async () => {
    const response: any = await dispatch(
      getEventsListAction({
        page,
        size,
        status: filterStatus,
        keyword: searchKeyword,
      }),
    );
    if (
      response.type === getEventsListAction.fulfilled.toString() &&
      response.payload
    ) {
      if (
        (searchKeyword || filterStatus !== null) &&
        !response.payload.list.length
      ) {
        setShowNoSearchData(true);
      } else {
        setShowNoSearchData(false);
      }
    }
  };

  const handleSearchEvent = (keyword: string, status: number | null) => {
    if (!keyword) {
      dispatch(
        getEventsListAction({
          page,
          size,
          status,
        }),
      );
    } else {
      dispatch(setPage(defaultCurrentPage));
    }
  };

  const searchInputChange = useCallback(
    debounce((e, status) => handleSearchEvent(e.target.value, status), 300),
    [],
  );

  useEffect(() => {
    const roleColumns: any = [];
    columns.forEach((item) => {
      if (item.role?.includes(cookie.getCookie(CookieKeys.authUserRole))) {
        roleColumns.push(item);
      }
    });
    setTableColumns(roleColumns);
    return () => {
      dispatch(resetState());
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
    if (page !== 0) {
      requestEventsList();
    }
  }, [page, size, filterStatus]);

  useEffect(() => {
    if (deleteSuccess || cancelSuccess) {
      dispatch(
        getEventsListAction({
          page,
          size,
          status: filterStatus,
          keyword: searchKeyword,
        }),
      );
    }
  }, [deleteSuccess, cancelSuccess]);

  const createNewEventPlaceholder = (
    <AddNewEventContainer>
      <div>
        <img
          src={
            (!showNoSearchData && Images.AddNewEventIcon) ||
            Images.NoSearchDataIcon
          }
          alt=""
        />
        <p className="title">
          {(!showNoSearchData && t('Create New Event')) ||
            t('No Matching Results')}
        </p>
        {!showNoSearchData && (
          <p className="description">
            {t(
              'Be the catalyst for extraordinary moments. Create your event and captivate your audience now!',
            )}
          </p>
        )}
        <Link to={UserRoutes.createEvent}>
          <Button type="primary">
            <PlusOutlined />
            {t('Create New Event')}
          </Button>
        </Link>
      </div>
    </AddNewEventContainer>
  );

  return (
    <EventsContainer>
      <PageHeaderComponent title={t('Events')} />
      <div className="page-main">
        <Row className="event-filter-container">
          <Col span={24} lg={14}>
            <Row className="content">
              <Col lg={14} span={24}>
                <Input
                  defaultValue={searchKeyword}
                  placeholder={t('Search event')}
                  allowClear={{
                    clearIcon: <CloseOutlined />,
                  }}
                  suffix={!searchKeyword && <SearchOutlined />}
                  onChange={(e) => {
                    dispatch(setPage(0));
                    dispatch(setSearchKeyword(e.target.value));
                    searchInputChange(e, filterStatus);
                  }}
                />
              </Col>
              <Col lg={10} span={24} className="filter-status">
                <div className="filter-select-content">
                  <div>
                    <span>{t('Status')}:</span>
                  </div>
                  <div>
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
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={10} span={24}>
            <Link to={UserRoutes.createEvent}>
              <Button type="primary" className="create-new-event">
                <PlusOutlined />
                {t('Create New Event')}
              </Button>
            </Link>
          </Col>
        </Row>
        <EventListTableContainer>
          {(loading && (
            <Spin
              spinning
              indicator={<LoadingOutlined spin />}
              size="large"
              style={{ margin: 'auto' }}
            />
          )) || (
            <>
              {(eventsListData.length && (
                <>
                  <Col lg={24} span={0}>
                    <TableComponent
                      loading={loading}
                      currentPage={page}
                      currentPageSize={size}
                      columns={tableColumns}
                      tableData={eventsListData}
                      tableDataTotal={eventsListDataTotal}
                      paginationChange={(currentPage, currentPageSize) => {
                        dispatch(setPage(currentPage));
                        dispatch(setPageSize(currentPageSize));
                      }}
                    />
                  </Col>
                  <Col lg={0} span={24} className="responsive-card-container">
                    {eventsListData.map((item: EventsListDataType) => (
                      <EventInfoCardResponsive key={item.id} gutter={[0, 8]}>
                        <Col span={24}>
                          <Row>
                            <Col span={12}>
                              <img
                                className="image"
                                src={item.image || Images.NoEventBanner}
                                alt={item.name}
                              />
                            </Col>
                            <Col span={12}>{renderListItemAction(item)}</Col>
                          </Row>
                        </Col>
                        <Col span={24}>
                          <h4 className="title">{item.name}</h4>
                          <p className="date">{item.time}</p>
                        </Col>
                        <Col span={24}>
                          <p className="stock">
                            {item.soldTotal} / {item.total}
                          </p>
                          <p className="price">
                            {item.revenue.toLocaleString()} {SGD_UNIT}
                          </p>
                        </Col>
                        <Col span={24}>{getBadge(item.status)}</Col>
                      </EventInfoCardResponsive>
                    ))}
                    <Row justify="end">
                      <Col>
                        <Pagination
                          size="small"
                          current={page}
                          pageSize={size}
                          total={eventsListDataTotal}
                          hideOnSinglePage
                          showTotal={(total) => `Total ${total} items`}
                          showSizeChanger={false}
                          onChange={(currentPage) => {
                            dispatch(setPage(currentPage));
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </>
              )) ||
                createNewEventPlaceholder}
            </>
          )}
        </EventListTableContainer>
      </div>
    </EventsContainer>
  );
};

export default Events;
