import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Tooltip, message, Badge, Button, Row, Col, Select } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import { SortOrder, FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';

import { UserRoutes } from '../../navigation/Routes';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { formatTimeStrByTimeString } from '../../utils/func';
import { SortKeys, FormatTimeKeys } from '../../constants/Keys';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import {
  defaultPageSize,
  defaultCurrentPage,
  activeStatus,
} from '../../constants/General';
import { UsersContainer, TableFilterContainer } from './Users.component';
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
} from './Users.slice';

const { Option } = Select;

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const sort = useAppSelector(selectSort);
  const error = useAppSelector(selectError);
  const total = useAppSelector(selectDataTotal);
  const filters = useAppSelector(selectFilters);

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
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text || '-'}</p>
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

  const handleStatusChange = (status: string) => {
    let currentStatus: boolean | null = null;
    if (status === activeStatus.active.text) {
      currentStatus = activeStatus.active.status;
    } else if (status === activeStatus.inActive.text) {
      currentStatus = activeStatus.inActive.status;
    }
    dispatch(filtersChangeAction({ status: currentStatus }));
  };

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (error) {
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
        >
          <TableFilterContainer style={{ display: 'none' }}>
            <Col span={24}>
              <Row>
                <Col span={6} className="filter-status">
                  <span>{t('Status')}:</span>
                  <Select
                    defaultValue={activeStatus.all.text}
                    onChange={handleStatusChange}
                    defaultActiveFirstOption={false}
                  >
                    {Object.values(activeStatus).map((item) => (
                      <Option key={item.text} value={item.text}>
                        {item.text}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </TableFilterContainer>
        </TableComponent>
      </div>
    </UsersContainer>
  );
};

export default Users;
