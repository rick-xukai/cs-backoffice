import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Dropdown,
  Tooltip,
  Modal,
  message,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import PageHeader from '../../components/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import { FilterOrganisersStatus, FormatTimeKeys } from '../../constants/Keys';
import { Images, Colors } from '../../theme';
import BallLoading from '../../components/BallLoading';
import TableComponent from '../../components/Table/Table';
import {
  formatTimeStrByTimeString,
  checkOrganiserStatus,
} from '../../utils/func';
import useTokenExpire from '../../hooks/useTokenExpire';
import {
  TokenExpireResponseCode,
  defaultCurrentPage,
} from '../../constants/General';
import {
  OrganisersContainer,
  AddNewOrganiserContainer,
  OrganisersListTableContainer,
  OrganiserStatusBadge,
} from './OrganisersComponent';
import {
  resetState,
  selectData,
  selectLoading,
  selectError,
  selectPage,
  selectPageSize,
  selectSearchKeyword,
  selectFilterStatus,
  setPage,
  setPageSize,
  setSearchKeyword,
  setFilterStatus,
  getOrganizerListAction,
  selectDataTotal,
  selectDeleteLoading,
  deleteOrganizerAction,
} from './Organisers.slice';

const { Option } = Select;
const { confirm } = Modal;

const Organisers = () => {
  const { t } = useTranslation();
  const { tokenExpireFunction } = useTokenExpire();
  const dispatch = useAppDispatch();
  const summary = true;

  const loading = useAppSelector(selectLoading);
  const listData = useAppSelector(selectData);
  const listTotal = useAppSelector(selectDataTotal);
  const error = useAppSelector(selectError);
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const searchKeyword = useAppSelector(selectSearchKeyword);
  const filterStatus = useAppSelector(selectFilterStatus);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const [showNoSearchData, setShowNoSearchData] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const requestEventsList = async () => {
    const response: any = await dispatch(
      getOrganizerListAction({
        page: (searchKeyword && defaultCurrentPage) || page,
        size: pageSize,
        status: filterStatus,
        keyword: searchKeyword,
        summary,
      }),
    );
    if (
      response.type === getOrganizerListAction.fulfilled.toString() &&
      response.payload
    ) {
      if (
        (searchKeyword || filterStatus !== null) &&
        !response.payload.length
      ) {
        setShowNoSearchData(true);
      } else {
        setShowNoSearchData(false);
      }
    }
  };

  const getBadge = (status: number) => {
    const background =
      FilterOrganisersStatus.find((item) => item.key === status)?.background ||
      Colors.grayScale20;
    const color =
      FilterOrganisersStatus.find((item) => item.key === status)?.color ||
      Colors.grey7;
    return (
      <OrganiserStatusBadge color={color} background={background}>
        {checkOrganiserStatus(status)}
      </OrganiserStatusBadge>
    );
  };

  const renderListItemAction = (record: any) => {
    const items: MenuProps['items'] = [
      {
        label: t('Delete'),
        key: 'Delete',
        onClick: () => {
          setDeleteSuccess(false);
          let confirmModalProps = {
            centered: true,
            closable: false,
            okText: (record.eventTotal > 0 && t('Ok')) || t('Delete'),
            okButtonProps: {
              className: 'action-button',
              disabled: deleteLoading,
            },
            cancelButtonProps: {
              style: {
                display: (record.eventTotal > 0 && 'none') || 'inline-block',
              },
            },
            cancelText: t('Cancel'),
            title:
              (record.eventTotal > 0 && `Unable to Delete ${record.name}`) ||
              `Delete ${record.name}`,
            icon: <ExclamationCircleOutlined />,
            content:
              (record.eventTotal > 0 &&
                t(
                  'Deletion is not possible for this organizer as there are already published events associated with it.',
                )) ||
              t('Are you sure you want to delete this organizer?'),
            onOk: () => {},
          };

          if (record.eventTotal === 0) {
            confirmModalProps = {
              ...confirmModalProps,
              onOk: async () => {
                if (record.eventTotal > 0) return;
                const response = await dispatch(
                  deleteOrganizerAction({ id: record.id }),
                );
                if (
                  response.type === deleteOrganizerAction.fulfilled.toString()
                ) {
                  message.success(t('Deleted successfully'));
                  setDeleteSuccess(true);
                }
              },
            };
          }

          confirm(confirmModalProps);
        },
      },
    ];

    return (
      <div className="organiser-list-action">
        <Tooltip
          title={t('Edit')}
          overlayClassName="organiser-edit"
          placement="bottom"
        >
          <Link
            to={UserRoutes.editOrganiser.replace(':organiserId', record.id)}
          >
            <div className="icon-content">
              <img src={Images.Editor} alt="" />
            </div>
          </Link>
        </Tooltip>
        <div className="icon-content">
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
            overlayClassName="organiser-more-action"
          >
            <img src={Images.MoreOutlinedIcon} alt="" />
          </Dropdown>
        </div>
      </div>
    );
  };

  const tableColumns = [
    {
      title: 'Organizer Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Tooltip title={name}>{name}</Tooltip>,
    },
    {
      title: 'Users',
      dataIndex: 'adminUserTotal',
      key: 'adminUserTotal',
    },
    {
      title: 'Events',
      dataIndex: 'eventTotal',
      key: 'eventTotal',
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span>{formatTimeStrByTimeString(createdAt, FormatTimeKeys.mdy)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => getBadge(status),
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      width: 100,
      render: (_: any, record: any) => renderListItemAction(record),
    },
  ];

  const createNewEventPlaceholder = (
    <AddNewOrganiserContainer>
      <div>
        <img
          src={
            (!showNoSearchData && Images.AddNewEventIcon) ||
            Images.NoSearchDataIcon
          }
          alt=""
        />
        <p className="title">
          {(!showNoSearchData && t('Create New Org')) ||
            t('No Matching Results')}
        </p>
        <Link to={UserRoutes.createOrganiser}>
          <Button type="primary">
            <PlusOutlined />
            {t('Create New Org')}
          </Button>
        </Link>
      </div>
    </AddNewOrganiserContainer>
  );

  const handleSearchEvent = (keyword: string) => {
    dispatch(setSearchKeyword(keyword));
  };

  const searchInputChange = useCallback(
    debounce((e) => handleSearchEvent(e.target.value), 300),
    [],
  );

  const handleStatusChange = (status: string) => {
    dispatch(
      setFilterStatus(
        FilterOrganisersStatus.find((item) => item.text === status)?.key,
      ),
    );
    dispatch(setPage(defaultCurrentPage));
  };

  useEffect(() => {
    if (page !== 0) {
      requestEventsList();
    }
  }, [page, pageSize, filterStatus, searchKeyword]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(
        getOrganizerListAction({
          page: (searchKeyword && defaultCurrentPage) || page,
          size: pageSize,
          status: filterStatus,
          keyword: searchKeyword,
          summary,
        }),
      );
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        tokenExpireFunction();
      }
      message.error(error.message);
    }
  }, [error]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <OrganisersContainer>
      <PageHeader title={t('Organisers')} />
      <div className="page-main">
        <Row className="organisers-filter-container">
          <Col span={24} lg={14}>
            <Row className="content">
              <Col lg={14} span={24}>
                <Input
                  defaultValue={searchKeyword}
                  placeholder={t('Search organizer')}
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
                        FilterOrganisersStatus.find(
                          (item) => item.key === filterStatus,
                        )?.text || null
                      }
                      onChange={handleStatusChange}
                      defaultActiveFirstOption={false}
                    >
                      <Option key="All" value={null}>
                        All
                      </Option>
                      {FilterOrganisersStatus.map((item) => (
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
            <Link to={UserRoutes.createOrganiser}>
              <Button type="primary" className="create-new-org">
                <PlusOutlined />
                {t('Create New Org')}
              </Button>
            </Link>
          </Col>
        </Row>
        <OrganisersListTableContainer>
          {(loading && <BallLoading />) || (
            <>
              {(listData.length && (
                <Col lg={24} span={24}>
                  <TableComponent
                    loading={loading}
                    currentPage={page}
                    currentPageSize={pageSize}
                    columns={tableColumns}
                    tableData={listData}
                    tableDataTotal={listTotal}
                    paginationChange={(currentPage, currentPageSize) => {
                      dispatch(setPage(currentPage));
                      dispatch(setPageSize(currentPageSize));
                    }}
                  />
                </Col>
              )) ||
                createNewEventPlaceholder}
            </>
          )}
        </OrganisersListTableContainer>
      </div>
    </OrganisersContainer>
  );
};

export default Organisers;
