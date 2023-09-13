import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Select,
  DatePicker,
  message,
  Tooltip,
  Badge,
  Row,
  Button,
  Typography,
  Checkbox,
  Modal,
} from 'antd';
import qs from 'qs';
import type { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult, SortOrder } from 'antd/es/table/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
  defaultPageSize,
  defaultCurrentPage,
  decimalPlaces,
  TokenExpireResponseCode,
} from '../../constants/General';
import { useCookie } from '../../hooks';
import { formatTimeStrByTimeString } from '../../utils/func';
import { UserRoutes, AuthRoutes } from '../../navigation/Routes';
import {
  StatusKeys,
  SortKeys,
  FormatTimeKeys,
  CookieKeys,
} from '../../constants/Keys';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import {
  TransactionsContainer,
  TableFilterContainer,
  TableSelectItemsContainer,
} from './TransactionsComponent';
import {
  reset,
  selectLoading,
  selectDataTotal,
  selectData,
  selectError,
  getTransactionsListAction,
  TransactionsDataType,
  updateTransactionsStatusAction,
  selectchangeStatusSuccess,
  sortChangeAction,
  selectSort,
  filtersChangeAction,
  selectFilters,
} from './Transactions.slice';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { confirm } = Modal;

const Transactions = () => {
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
  const changeStatusSuccess = useAppSelector(selectchangeStatusSuccess);
  const filters = useAppSelector(selectFilters);

  const [showTableHeader, setShowTableHeader] = useState<boolean>(true);
  const [allRowKeys, setAllRowKeys] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [changeStatusItems, setChangeStatusItems] = useState<string[]>([]);
  const [selectItemsQuantity, setSelectItemsQuantity] = useState<number>(0);
  const [canSelectItemsQuantity, setCanSelectItemsQuantity] =
    useState<number>(0);
  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    currentPage: defaultCurrentPage,
    currentPageSize: defaultPageSize,
  });

  const columns = [
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 165,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="ellipsis">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Card Holder',
      dataIndex: 'cardHolder',
      key: 'cardHolder',
      width: 120,
    },
    {
      title: 'Bank Account',
      dataIndex: 'bankName',
      key: 'bankName',
      width: 240,
      render: (text: string, record: TransactionsDataType) => (
        <Tooltip
          title={
            <span>
              {text}
              <br />
              {record.cardNo}
            </span>
          }
        >
          <p className="bank_account">
            {text}
            <br />
            {record.cardNo}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 85,
      render: (text: number, record: TransactionsDataType) => (
        <p style={{ whiteSpace: 'nowrap' }}>
          {`${text.toFixed(decimalPlaces)} ${record.currency}`}
        </p>
      ),
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      showSorterTooltip: false,
      width: 120,
      sorter: false,
      defaultSortOrder: SortKeys.descend as SortOrder,
      sortOrder: sort.sortValue as SortOrder,
      sortDirections: [SortKeys.descend, SortKeys.ascend] as SortOrder[],
      render: (text: string) => (
        <div>
          <p>{formatTimeStrByTimeString(text, FormatTimeKeys.mdy)}</p>
          <p style={{ fontSize: 13 }}>
            {formatTimeStrByTimeString(text, FormatTimeKeys.hms)}
          </p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: number) => (
        <div className="status-container">
          <Badge
            status={(text === StatusKeys.pending.key && 'warning') || 'success'}
            text={
              (text === StatusKeys.pending.key && StatusKeys.pending.text) ||
              StatusKeys.completed.text
            }
          />
        </div>
      ),
      width: 100,
    },
    {
      title: '',
      dataIndex: 'view_detail',
      key: 'view_detail',
      width: 55,
      render: (_: string, record: TransactionsDataType) => (
        <div className="status-container">
          <span className="view-detail">
            <Link
              to={{
                pathname: UserRoutes.transactionsDetail.replace(
                  ':transactionsId',
                  record.id.toString(),
                ),
                state: currentPaginationConfig,
              }}
            >
              {t('View')}
            </Link>
          </span>
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: string[],
      selectedRows: TransactionsDataType[],
    ) => {
      const changeStatus: string[] = [];
      if (!isEmpty(selectedRows)) {
        selectedRows.forEach((item) => {
          changeStatus.push(item.id);
        });
      }
      setChangeStatusItems(changeStatus);
      setShowTableHeader(isEmpty(selectedRowKeys));
      setSelectAll(selectedRowKeys.length === canSelectItemsQuantity);
      setAllRowKeys(selectedRowKeys);
      setSelectItemsQuantity(selectedRowKeys.length);
    },
    getCheckboxProps: (record: TransactionsDataType) => ({
      disabled: record.status === StatusKeys.completed.key,
      name: record.status,
    }),
    onSelectAll: (selected: boolean) => {
      setSelectAll(selected);
    },
    selectedRowKeys: allRowKeys,
  };

  const onSelectAll = (event: any) => {
    const canSelectDataKeys: string[] = [];
    const changeStatus: string[] = [];
    if (event.target.checked) {
      data
        .filter((record) => record.status !== StatusKeys.completed.key)
        .forEach((item) => {
          changeStatus.push(item.id);
          canSelectDataKeys.push(item.id);
        });
    } else {
      setShowTableHeader(true);
    }
    setChangeStatusItems(changeStatus);
    setSelectAll(event.target.checked);
    setAllRowKeys(canSelectDataKeys);
    setSelectItemsQuantity(canSelectDataKeys.length);
  };

  const showConfirmModal = () => {
    confirm({
      centered: true,
      title: t('Transactions completed'),
      okText: t('Yes'),
      cancelText: t('No'),
      icon: <ExclamationCircleOutlined />,
      content: t(
        'Are you sure these transactions have been completed? This action cannot be undone',
      ),
      onOk() {
        setShowTableHeader(true);
        dispatch(
          updateTransactionsStatusAction({
            note: StatusKeys.completed.text,
            ids: changeStatusItems,
          }),
        );
      },
    });
  };

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
    let currentStatus: number | null = null;
    if (status === StatusKeys.pending.text) {
      currentStatus = StatusKeys.pending.key;
    } else if (status === StatusKeys.completed.text) {
      currentStatus = StatusKeys.completed.key;
    }
    dispatch(filtersChangeAction({ status: currentStatus }));
  };

  useEffect(() => {
    if (showTableHeader) {
      setSelectItemsQuantity(0);
      setAllRowKeys([]);
      setSelectAll(false);
    }
  }, [showTableHeader]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (data) {
      setCanSelectItemsQuantity(
        data.filter((item) => item.status !== StatusKeys.completed.key).length,
      );
    }
  }, [data]);

  useEffect(() => {
    const { page, pageSize } = qs.parse(location.search.slice(1));
    if (page && pageSize) {
      setCurrentPaginationConfig({
        currentPage: Number(page),
        currentPageSize: Number(pageSize),
      });
    }
    dispatch(
      getTransactionsListAction({
        page: Number(page) || currentPaginationConfig.currentPage,
        size: Number(pageSize) || currentPaginationConfig.currentPageSize,
        filters,
        sort,
      }),
    );
  }, [location.search, filters, sort]);

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
    if (changeStatusSuccess) {
      message.success(
        t('TransactionCompleted', { count: changeStatusItems.length }),
      );
    }
  }, [changeStatusSuccess]);

  return (
    <TransactionsContainer>
      <PageHeaderComponent title={t('Transactions')} />
      <div className="page-main">
        <TableComponent
          loading={loading}
          currentPage={currentPaginationConfig.currentPage}
          currentPageSize={currentPaginationConfig.currentPageSize}
          columns={columns}
          tableData={data}
          tableDataTotal={total}
          showHeader={showTableHeader}
          onChange={onTableChange}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          paginationChange={(page, pageSize) =>
            history.push(
              `${UserRoutes.transactions}?page=${
                (pageSize === currentPaginationConfig.currentPageSize &&
                  page) ||
                defaultCurrentPage
              }&pageSize=${pageSize}`,
            )
          }
        >
          <div>
            <TableFilterContainer>
              <Col span={20}>
                <Row>
                  <Col span={8} className="filter-status">
                    <span>{t('Status')}:</span>
                    <Select
                      defaultValue={StatusKeys.all.text}
                      onChange={handleStatusChange}
                      defaultActiveFirstOption={false}
                    >
                      {Object.values(StatusKeys).map((item) => (
                        <Option key={item.text} value={item.text}>
                          {item.text}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={16} className="filter-picker">
                    <span>{t('Submitted Date')}:</span>
                    <RangePicker
                      onChange={(_date: any, dateString: string[]) =>
                        dispatch(
                          filtersChangeAction({
                            startDate: dateString[0] || null,
                            endDate:
                              (dateString[1] &&
                                `${dateString[1]} ${'23:59:59'}`) ||
                              null,
                          }),
                        )
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                {!showTableHeader && (
                  <Button
                    type="primary"
                    danger
                    className="change-status-btn"
                    onClick={showConfirmModal}
                  >
                    {t('Change status')}
                  </Button>
                )}
              </Col>
            </TableFilterContainer>
            {!showTableHeader && (
              <TableSelectItemsContainer>
                <Col span={12}>
                  <Checkbox
                    className="select-all"
                    checked={selectAll}
                    onChange={onSelectAll}
                  />
                  Selected {selectItemsQuantity} Items
                </Col>
                <Col span={12} className="clear-selected">
                  <Text onClick={() => setShowTableHeader(true)}>
                    {t('Clear')}
                  </Text>
                </Col>
              </TableSelectItemsContainer>
            )}
          </div>
        </TableComponent>
      </div>
    </TransactionsContainer>
  );
};

export default Transactions;
