import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getUnixTime } from 'date-fns';
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
import type { TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult, SortOrder } from 'antd/es/table/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { UserRoutes } from '../../navigation/Routes';
import { StatusKeys, SortKeys } from '../../constants/Keys';
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
  selectCurrentPage,
  selectCurrentPageSize,
  selectData,
  selectError,
  getTransactionsListAction,
  paginationChangeAction,
  TransactionsListDataType,
  updateTransactionsStatusAction,
  selectChangeStatusSuccess,
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

  const loading = useAppSelector(selectLoading);
  const data = useAppSelector(selectData);
  const sort = useAppSelector(selectSort);
  const error = useAppSelector(selectError);
  const total = useAppSelector(selectDataTotal);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageSize = useAppSelector(selectCurrentPageSize);
  const changeStatusSuccess = useAppSelector(selectChangeStatusSuccess);
  const filters = useAppSelector(selectFilters);

  const [showTableHeader, setShowTableHeader] = useState<boolean>(true);
  const [allRowKeys, setAllRowKeys] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [changeStatusItems, setChangeStatusItems] = useState<number[]>([]);
  const [selectItemsQuantity, setSelectItemsQuantity] = useState<number>(0);
  const [canSelectItemsQuantity, setCanSelectItemsQuantity] =
    useState<number>(0);

  const columns = [
    {
      title: 'User Email',
      dataIndex: 'user_email',
      key: 'user_email',
      width: 200,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Bank Holder',
      dataIndex: 'bank_holder',
      key: 'bank_holder',
    },
    {
      title: 'Bank Account',
      dataIndex: 'bank_account',
      key: 'bank_account',
      width: 170,
    },
    {
      title: 'Amount reflected',
      dataIndex: 'amount_reflected',
      key: 'amount_reflected',
      width: 160,
    },
    {
      title: 'Submitted At',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      showSorterTooltip: false,
      width: 140,
      sorter: true,
      defaultSortOrder: SortKeys.descend as SortOrder,
      sortOrder: sort.sortValue as SortOrder,
      sortDirections: [SortKeys.descend, SortKeys.ascend] as SortOrder[],
      render: (text: { date: string; timeRange: string }) => (
        <div>
          <p>{text.date}</p>
          <p style={{ fontSize: 13 }}>{text.timeRange}</p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <div className="status-container">
          <Badge
            status={(text === StatusKeys.pending && 'warning') || 'success'}
            text={text}
          />
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'view_detail',
      key: 'view_detail',
      width: 80,
      render: (_: string, record: TransactionsListDataType) => (
        <div className="status-container">
          <span className="view-detail">
            <Link
              to={UserRoutes.transactionsDetail.replace(
                ':transactionsId',
                record.id.toString(),
              )}
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
      selectedRowKeys: number[],
      selectedRows: TransactionsListDataType[],
    ) => {
      const changeStatus: number[] = [];
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
    getCheckboxProps: (record: TransactionsListDataType) => ({
      disabled: record.status === StatusKeys.completed,
      name: record.status,
    }),
    onSelectAll: (selected: boolean) => {
      setSelectAll(selected);
    },
    selectedRowKeys: allRowKeys,
  };

  const onSelectAll = (event: any) => {
    const canSelectDataKeys: number[] = [];
    const changeStatus: number[] = [];
    if (event.target.checked) {
      data
        .filter((record) => record.status !== StatusKeys.completed)
        .forEach((item, index) => {
          changeStatus.push(item.id);
          canSelectDataKeys.push(index + 1);
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
            status: StatusKeys.completed,
            transactions: changeStatusItems,
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
        data.filter((item) => item.status !== StatusKeys.completed).length,
      );
    }
  }, [data]);

  useEffect(() => {
    dispatch(getTransactionsListAction());
  }, [currentPage, currentPageSize, filters, sort]);

  useEffect(() => {
    if (error) {
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
          currentPage={currentPage}
          currentPageSize={currentPageSize}
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
            dispatch(paginationChangeAction({ page, pageSize }))
          }
        >
          <div>
            <TableFilterContainer>
              <Col span={20}>
                <Row>
                  <Col span={8} className="filter-status">
                    <span>{t('Status')}</span>
                    <Select
                      defaultValue={StatusKeys.all}
                      onChange={(status) =>
                        dispatch(filtersChangeAction({ status }))
                      }
                      defaultActiveFirstOption={false}
                    >
                      {Object.values(StatusKeys).map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={16} className="filter-picker">
                    <span>{t('Submitted Date')}</span>
                    <RangePicker
                      onChange={(date: any) =>
                        dispatch(
                          filtersChangeAction({
                            start_date:
                              (date && getUnixTime(new Date(date[0]))) || null,
                            end_date:
                              (date && getUnixTime(new Date(date[1]))) || null,
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
