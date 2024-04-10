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
  Pagination,
  Switch,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { debounce, isEmpty } from 'lodash';

import {
  priceUnit,
  defaultCurrentPage,
  TokenExpireResponseCode,
  GetSettingsType,
} from '../../constants/General';
import {
  CookieKeys,
  UserRoleKeys,
  FilterEventStatus,
} from '../../constants/Keys';
import { checkEventStatus } from '../../utils/func';
import { Images, Colors } from '../../theme';
import { UserRoutes } from '../../navigation/Routes';
import { useCookie } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useTokenExpire from '../../hooks/useTokenExpire';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import BallLoading from '../../components/BallLoading';
import AnnouncementPopup from '../../components/AnnouncementPopup';
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
  hideEventAction,
  duplicateEventAction,
  selectPopupSetting,
  getPopupSettingAction,
  savePopupSettingAction,
  selectSavePopupSettingLoading,
  updateOnControlAction,
  updateSellStateAction,
  updateTransferStateAction,
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
  const { tokenExpireFunction } = useTokenExpire();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookie = useCookie([
    CookieKeys.authUserRole,
    CookieKeys.authUser,
    CookieKeys.authUserName,
    CookieKeys.userNotActiveToken,
  ]);

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const eventsListData = useAppSelector(selectData);
  const eventsListDataTotal = useAppSelector(selectDataTotal);
  const page = useAppSelector(selectPage);
  const size = useAppSelector(selectPageSize);
  const filterStatus = useAppSelector(selectFilterStatus);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const popupSetting = useAppSelector(selectPopupSetting);
  const savePopupSettingLoading = useAppSelector(selectSavePopupSettingLoading);

  const [tableColumns, setTableColumns] = useState([]);
  const [showNoSearchData, setShowNoSearchData] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [cancelSuccess, setCancelSuccess] = useState<boolean>(false);
  const [hideSuccess, setHideSuccess] = useState<boolean>(false);
  const [updateEventOnControlSuccess, setUpdateEventOnControlSuccess] =
    useState<boolean>(false);
  const [duplicateSuccess, setDuplicateSuccess] = useState<boolean>(false);
  const [updateEventSellStateSuccess, setUpdateEventSellStateSuccess] =
    useState<boolean>(false);
  const [updateEventTransferStateSuccess, setUpdateEventTransferStateSuccess] =
    useState<boolean>(false);
  const goToDashboard = (id: any, name: any) => {
    history.push(
      UserRoutes.eventDashboard.replace(':id', id).replace(':name', name),
    );
  };
  const authUserRole = cookie.getCookie(CookieKeys.authUserRole);
  const isSuperAdmin = authUserRole === UserRoleKeys.superAdmin;

  // const showHideEvent = (record: EventsListDataType) => ({
  //   label: t('Hide Event'),
  //   key: 'showHideEvent',
  //   style: {
  //     display: (record.status !== EventStatusKeys.draft && 'block') || 'none',
  //   },
  //   onClick: () => {
  //     // goToDashboard(record.id, record.name);
  //   },
  // });
  const resetSuccessState = () => {
    setDeleteSuccess(false);
    setCancelSuccess(false);
    setHideSuccess(false);
    setDuplicateSuccess(false);
    setUpdateEventSellStateSuccess(false);
    setUpdateEventTransferStateSuccess(false);
    setUpdateEventOnControlSuccess(false);
  };

  const renderListItemAction = (record: EventsListDataType) => {
    const userRoles = cookie.getCookie(CookieKeys.authUserRole);

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
            href={`${process.env.REACT_APP_WEB_APP_LINK}/scan-event`}
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
          resetSuccessState();
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
        label: t('Duplicate Event'),
        key: 'Duplicate Event',
        onClick: async () => {
          const response = await dispatch(
            duplicateEventAction({ eventId: Number(record.id) }),
          );
          if (response.type === duplicateEventAction.fulfilled.toString()) {
            message.success(
              <>
                A duplicate of &apos;<b>{record.name}</b>&apos; has been created
                and can now be found under draft events.
              </>,
            );
            setDuplicateSuccess(true);
          }
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
          resetSuccessState();
          confirm({
            centered: true,
            closable: false,
            okText: t('Cancel Event'),
            cancelText: t('Back'),
            title: t('Cancel Event'),
            icon: <ExclamationCircleOutlined />,
            content: t(
              'Are you sure you want to cancel the event? Please contact the attendees to make refund arrangements',
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
      {
        label:
          (record.hidden && t('Unhide event on CrowdServe')) ||
          t('Hide Event on CrowdServe'),
        key: 'Hide Event',
        style: {
          display:
            (record.status === EventStatusKeys.upcoming && 'block') || 'none',
        },
        onClick: () => {
          resetSuccessState();
          confirm({
            centered: true,
            closable: false,
            okText: (record.hidden && t('Show Event')) || t('Hide Event'),
            cancelText: t('Back'),
            title: (record.hidden && t('Show Event')) || t('Hide Event'),
            icon: <ExclamationCircleOutlined />,
            content: t('Are you sure you want to [status] this event?', {
              status: (record.hidden && 'show') || 'hide',
            }),
            onOk: async () => {
              const response = await dispatch(
                hideEventAction({ id: record.id, hiddenState: !record.hidden }),
              );
              if (response.type === hideEventAction.fulfilled.toString()) {
                if (record.hidden) {
                  message.success(t('Show success'));
                } else {
                  message.success(t('Hide success'));
                }
                setHideSuccess(true);
              }
            },
          });
        },
      },
      {
        label:
          (record.canSell && t('Deactivate Secondary Market')) ||
          t('Open Secondary Market'),
        key: 'sell',
        style: {
          display: (userRoles === UserRoleKeys.superAdmin && 'block') || 'none',
        },
        onClick: () => {
          resetSuccessState();
          confirm({
            centered: true,
            closable: false,
            okText: t('Confirm'),
            cancelText: t('Cancel'),
            title:
              (record.canSell && t('Stop Secondary Market')) ||
              t('Open Secondary Market'),
            icon: <ExclamationCircleOutlined />,
            content:
              (record.canSell &&
                t(
                  'Are you sure you want to deactivate the secondary market for this event? This action will automatically recall all on-listing tickets.',
                )) ||
              t(
                'Are you sure you want to reopen the secondary market for this event?',
              ),
            onOk: async () => {
              const response = await dispatch(
                updateSellStateAction({
                  id: record.id,
                  state: !record.canSell,
                }),
              );
              if (
                response.type === updateSellStateAction.fulfilled.toString()
              ) {
                message.success(t('Event is successfully updated.'));
                setUpdateEventSellStateSuccess(true);
              }
            },
          });
        },
      },
      {
        label:
          (record.canTransfer && t('Deactivate Tickets Transfers')) ||
          t('Open Tickets Transferring'),
        key: 'transfer',
        style: {
          display: (userRoles === UserRoleKeys.superAdmin && 'block') || 'none',
        },
        onClick: () => {
          resetSuccessState();
          confirm({
            centered: true,
            closable: false,
            okText: t('Confirm'),
            cancelText: t('Cancel'),
            title:
              (record.canTransfer && t('Stop Ticket Transfers')) ||
              t('Open Ticket Transfers'),
            icon: <ExclamationCircleOutlined />,
            content:
              (record.canTransfer &&
                t(
                  'Are you sure you want to deactivate ticket transfers for this event? This action will automatically recall all the in transferring tickets.',
                )) ||
              t(
                'Are you sure you want to reopen the ticket transfers for this event?',
              ),
            onOk: async () => {
              const response = await dispatch(
                updateTransferStateAction({
                  id: record.id,
                  state: !record.canTransfer,
                }),
              );
              if (
                response.type === updateTransferStateAction.fulfilled.toString()
              ) {
                message.success(t('Event is successfully updated.'));
                setUpdateEventTransferStateSuccess(true);
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
            menu={{
              items: isSuperAdmin ? [...items] : items,
            }}
            trigger={['click']}
            overlayClassName="event-more-action"
          >
            <img src={Images.MoreOutlinedIcon} alt="" />
          </Dropdown>
        </div>
      </div>
    );
  };

  const onSwitchChange = (state: boolean, id: string) => {
    resetSuccessState();
    confirm({
      centered: true,
      closable: false,
      okText: t('Confirm'),
      cancelText: t('Cancel'),
      title:
        (state && t('Show on CrowdControl')) || t('Remove from CrowdControl'),
      icon: <ExclamationCircleOutlined />,
      content:
        (state &&
          t('Are you sure you want to show this event on CrowdControl?')) ||
        t('Are you sure you want to remove this event from CrowdControl?'),
      onOk: async () => {
        const response = await dispatch(updateOnControlAction({ id, state }));
        if (response.type === updateOnControlAction.fulfilled.toString()) {
          message.success(t('Event is successfully updated.'));
          setUpdateEventOnControlSuccess(true);
        }
      },
    });
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
      width: 400,
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
      title: 'Organizer Name',
      dataIndex: 'organizerName',
      key: 'organizerName',
      role: [UserRoleKeys.superAdmin],
      width: 200,
    },
    {
      title: 'Sold',
      dataIndex: 'soldTotal',
      width: 120,
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
      width: 120,
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
      width: 120,
      role: [
        UserRoleKeys.organizerAdmin,
        UserRoleKeys.organizerUser,
        UserRoleKeys.partnerAdmin,
        UserRoleKeys.superAdmin,
      ],
      render: (status: number) => getBadge(status),
    },
    {
      title: 'Show on Ctrl',
      dataIndex: '',
      key: '',
      width: 120,
      role: [UserRoleKeys.superAdmin],
      render: (_: any, record: EventsListDataType) => (
        <Switch
          checked={record.onControl}
          onChange={(state) => onSwitchChange(state, record.id)}
        />
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      width: 100,
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
        page: (searchKeyword && defaultCurrentPage) || page,
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

  const handleSearchEvent = (keyword: string) => {
    dispatch(setSearchKeyword(keyword));
  };

  const searchInputChange = useCallback(
    debounce((e) => handleSearchEvent(e.target.value), 300),
    [],
  );

  const updatePopupSetting = async () => {
    const response = await dispatch(
      savePopupSettingAction({
        config: GetSettingsType.eventPopup,
        value: '1',
      }),
    );
    if (response.type === savePopupSettingAction.fulfilled.toString()) {
      dispatch(getPopupSettingAction({ config: GetSettingsType.eventPopup }));
    }
  };

  useEffect(() => {
    const userRoles = cookie.getCookie(CookieKeys.authUserRole);
    if (userRoles !== UserRoleKeys.superAdmin) {
      dispatch(getPopupSettingAction({ config: GetSettingsType.eventPopup }));
    }
    const roleColumns: any = [];
    columns.forEach((item) => {
      if (item.role?.includes(userRoles)) {
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
        tokenExpireFunction();
      }
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (page !== 0) {
      requestEventsList();
    }
  }, [page, size, filterStatus, searchKeyword]);

  useEffect(() => {
    if (
      deleteSuccess ||
      cancelSuccess ||
      hideSuccess ||
      duplicateSuccess ||
      updateEventOnControlSuccess ||
      updateEventSellStateSuccess ||
      updateEventTransferStateSuccess
    ) {
      dispatch(
        getEventsListAction({
          page,
          size,
          status: filterStatus,
          keyword: searchKeyword,
        }),
      );
    }
  }, [
    deleteSuccess,
    cancelSuccess,
    hideSuccess,
    duplicateSuccess,
    updateEventOnControlSuccess,
    updateEventSellStateSuccess,
    updateEventTransferStateSuccess,
  ]);

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
                    searchInputChange(e);
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
          {(loading && <BallLoading />) || (
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
                          <h4
                            className="title"
                            onClick={() => {
                              if (item.status === EventStatusKeys.draft) {
                                history.push(
                                  UserRoutes.editEvent.replace(':id', item.id),
                                );
                              } else {
                                goToDashboard(item.id, item.name);
                              }
                            }}
                          >
                            {item.name}
                          </h4>
                          {isSuperAdmin ? <p>{item.organizerName}</p> : null}

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
                        <Col span={24}>
                          <Switch
                            checked={item.onControl}
                            onChange={(state: boolean) =>
                              onSwitchChange(state, item.id)
                            }
                          />
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
                          showTotal={(total) =>
                            `Total ${total} ${total !== 1 ? 'items' : 'item'}`
                          }
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
      <AnnouncementPopup
        modalOpen={isEmpty(popupSetting) || popupSetting.value !== '1'}
        buttonLoading={savePopupSettingLoading}
        buttonFunction={updatePopupSetting}
      />
    </EventsContainer>
  );
};

export default Events;
