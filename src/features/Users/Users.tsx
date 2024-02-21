/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Tooltip, message, Badge, Button, Row, Col, Select, Input } from 'antd';
import {
  CloseOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd/es/table';
import { SortOrder, FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { CSVLink } from 'react-csv';

import { useCookie } from '../../hooks';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { formatTimeStrByTimeString, formatLabelDate } from '../../utils/func';
import { SortKeys, FormatTimeKeys, CookieKeys } from '../../constants/Keys';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import BallLoading from '../../components/BallLoading';
import {
  defaultPageSize,
  defaultCurrentPage,
  activeStatus,
  TokenExpireResponseCode,
  GetAllDataPageSize,
} from '../../constants/General';
import {
  UsersContainer,
  TableFilterContainer,
  ListTableContainer,
} from './Users.component';
import {
  reset,
  selectLoading,
  selectDataTotal,
  selectData,
  selectError,
  selectFilters,
  selectSort,
  getUsersListAction,
  filtersChangeAction,
  sortChangeAction,
  UsersListDataType,
  selectAllUserList,
  selectGetAllUserListLoading,
  getAllUsersListAction,
} from './Users.slice';

const { Option } = Select;

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const cookies = useCookie([
    CookieKeys.authUser,
    CookieKeys.authUserName,
    CookieKeys.userNotActiveToken,
  ]);

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const sort = useAppSelector(selectSort);
  const error = useAppSelector(selectError);
  const total = useAppSelector(selectDataTotal);
  const filters = useAppSelector(selectFilters);
  const allUserList = useAppSelector(selectAllUserList);
  const getAllUserListLoading = useAppSelector(selectGetAllUserListLoading);

  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    userListPage: defaultCurrentPage,
    userListPageSize: defaultPageSize,
  });

  const columns = [
    {
      title: 'User Email',
      dataIndex: 'email',
      key: 'email',
      width: 110,
      render: (text: string, record: UsersListDataType) => (
        <Tooltip title={text}>
          <Button className="name-btn ellipsis">
            <Link
              to={{
                pathname: UserRoutes.userDetail.replace(
                  ':userId',
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 100,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 100,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Sex',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Date of Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150,
      render: (text: string) => (
        <Tooltip
          title={
            (text &&
              formatTimeStrByTimeString(
                formatLabelDate(text),
                FormatTimeKeys.mdy,
              )) ||
            ''
          }
        >
          <p className="email">
            {(text &&
              formatTimeStrByTimeString(
                formatLabelDate(text),
                FormatTimeKeys.mdy,
              )) ||
              '-'}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Crypto Wallet',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      width: 100,
      render: (text: string) => {
        const formatText = text.slice(5, text.length - 5);
        return (
          <Tooltip title={text}>
            <p className="email">
              {(text && text.replace(formatText, '...')) || '-'}
            </p>
          </Tooltip>
        );
      },
    },
    {
      title: 'Last Action',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      showSorterTooltip: false,
      width: 110,
      sorter: false,
      defaultSortOrder: SortKeys.descend as SortOrder,
      sortOrder: sort.sortValue as SortOrder,
      sortDirections: [SortKeys.descend, SortKeys.ascend] as SortOrder[],
      render: (text: string) => (
        <div>
          {(text && (
            <>
              <p>{formatTimeStrByTimeString(text, FormatTimeKeys.mdy)}</p>
              <p style={{ fontSize: 13 }}>
                {formatTimeStrByTimeString(text, FormatTimeKeys.hms)}
              </p>
            </>
          )) ||
            '-'}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActivated',
      key: 'isActivated',
      render: (status: boolean) => (
        <div className="status-container">
          <Badge
            status={(!status && 'warning') || 'success'}
            text={
              (status && activeStatus.active.text) || activeStatus.inActive.text
            }
          />
        </div>
      ),
      width: 100,
    },
  ];

  const onTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | any,
  ) => {
    dispatch(
      sortChangeAction({
        sortName: sorter.field,
        sortValue: sorter.order || SortKeys.descend,
      }),
    );
  };

  // const handleStatusChange = (status: string) => {
  //   let currentStatus: boolean | null = null;
  //   if (status === activeStatus.active.text) {
  //     currentStatus = activeStatus.active.status;
  //   } else if (status === activeStatus.inActive.text) {
  //     currentStatus = activeStatus.inActive.status;
  //   }
  //   dispatch(filtersChangeAction({ status: currentStatus }));
  // };

  const handleExportAllUserList = async () => {
    const response = await dispatch(
      getAllUsersListAction({
        page: defaultCurrentPage,
        size: GetAllDataPageSize,
        filters,
        sort,
      }),
    );
    if (response.type === getAllUsersListAction.fulfilled.toString()) {
      const exportButton: any = document.querySelector('.export-user-list');
      if (exportButton) {
        exportButton.click();
      }
    }
  };

  const formatExportData = () => {
    const headers: any = [];
    columns.map((headersItem) => {
      if (headersItem.title) {
        headers.push({
          label: headersItem.title,
          key: headersItem.dataIndex,
        });
      }
      return headersItem;
    });
    const downloadData = allUserList.map((item) => ({
      ...item,
      birthday:
        (item.birthday &&
          `${formatTimeStrByTimeString(
            formatLabelDate(item.birthday),
            FormatTimeKeys.mdy,
          )}\n${''}`) ||
        '',
      lastLoginAt:
        (item.lastLoginAt &&
          `${formatTimeStrByTimeString(
            item.lastLoginAt,
            FormatTimeKeys.mdy,
          )}\n${formatTimeStrByTimeString(
            item.lastLoginAt,
            FormatTimeKeys.hms,
          )}`) ||
        '',
      isActivated:
        (item.isActivated && activeStatus.active.text) ||
        activeStatus.inActive.text,
    }));
    return { headers, data: downloadData };
  };

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === TokenExpireResponseCode) {
        cookies.removeCookie(CookieKeys.authUser, { path: '/' });
        cookies.removeCookie(CookieKeys.authUserName, { path: '/' });
        cookies.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
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
        userListPage: Number(page),
        userListPageSize: Number(pageSize),
      });
    }
    dispatch(
      getUsersListAction({
        page: Number(page) || currentPaginationConfig.userListPage,
        size: Number(pageSize) || currentPaginationConfig.userListPageSize,
        filters,
        sort,
      }),
    );
  }, [location.search, filters, sort]);

  return (
    <UsersContainer>
      <PageHeaderComponent title={t('Users')} />
      <div className="page-main">
        <ListTableContainer>
          <TableFilterContainer>
            <Col lg={17} span={24}>
              {/* <Row className="filter-items" gutter={[16, 16]}>
                <Col lg={9} span={24}>
                  <Input
                    placeholder={t('Search name or email')}
                    allowClear={{
                      clearIcon: <CloseOutlined />,
                    }}
                  />
                </Col>
                <Col lg={5} span={24} className="filter-status">
                  <Select
                    allowClear
                    placeholder={t('Status')}
                    defaultActiveFirstOption={false}
                  >
                    <Option value="Active">Active</Option>
                  </Select>
                </Col>
              </Row> */}
            </Col>
            <Col lg={7} span={24} className="export-action">
              <Button
                onClick={handleExportAllUserList}
                className="action-button"
                disabled={!data.length || getAllUserListLoading}
              >
                {(getAllUserListLoading && (
                  <LoadingOutlined className="loading-icon" />
                )) || <DownloadOutlined />}
                {t('Export')}
              </Button>
              <CSVLink
                filename="Users_Export.csv"
                headers={formatExportData().headers}
                data={formatExportData().data}
                className="export-user-list"
              />
            </Col>
          </TableFilterContainer>
          {(loading && <BallLoading />) || (
            <TableComponent
              loading={loading}
              currentPage={currentPaginationConfig.userListPage}
              currentPageSize={currentPaginationConfig.userListPageSize}
              columns={columns}
              tableData={data}
              tableDataTotal={total}
              onChange={onTableChange}
              paginationChange={(page, pageSize) =>
                history.push(
                  `${UserRoutes.users}?page=${
                    (pageSize === currentPaginationConfig.userListPageSize &&
                      page) ||
                    defaultCurrentPage
                  }&pageSize=${pageSize}`,
                )
              }
            />
          )}
        </ListTableContainer>
      </div>
    </UsersContainer>
  );
};

export default Users;
