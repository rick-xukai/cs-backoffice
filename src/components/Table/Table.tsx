import React from 'react';
import styled from 'styled-components';
import { Table, Spin } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { LoadingOutlined } from '@ant-design/icons';

import { Colors } from '../../theme';
import Pagination from '../Pagination';

const TableContainer = styled.div`
  padding: 24px;
  background: ${Colors.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  .ant-table-content {
    font-size: 15px;
    font-weight: 400;
  }
  .ant-table-cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-table-thead {
    th {
      height: 40px;
      background: ${Colors.grey9};
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: none;
      border-top-left-radius: unset !important;
      border-top-right-radius: unset !important;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.grey6};
      ::before {
        display: none;
      }
      &.ant-table-column-sort,
      &.ant-table-column-has-sorters:hover {
        background: ${Colors.grey9};
      }
    }
    .ant-table-column-sorters {
      padding-right: 15px;
      .ant-table-column-title {
        white-space: nowrap;
        margin-right: 8px;
      }
    }
  }
  .ant-table-tbody {
    td {
      padding-top: 10px;
      padding-bottom: 10px;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.black5};
      p {
        margin-bottom: 0;
      }
      &.ant-table-column-sort {
        background: unset;
      }
    }
    .ant-table-row:hover {
      td {
        background: ${Colors.white};
      }
    }
    .ellipsis {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .status-container {
      display: flex;
      justify-content: space-between;
      padding-right: 5px;
      .view-detail {
        font-weight: 400;
        font-size: 15px;
        color: ${Colors.branding};
        a:hover {
          text-decoration: underline;
        }
      }
    }
    .ant-badge {
      white-space: nowrap;
    }
    .ant-badge-status-text {
      font-weight: 400 !important;
      font-size: 15px !important;
      color: ${Colors.grey6} !important;
    }
    .ant-table-row-selected {
      td {
        background: ${Colors.white};
      }
    }
    .ant-checkbox-inner {
      border: 1px solid ${Colors.grey8};
    }
  }
  .ant-btn[disabled] {
    background: unset;
    color: ${Colors.grey7};
    :hover {
      a {
        text-decoration: unset;
      }
    }
  }
`;

const TableComponent = ({
  rowKey = 'id',
  rowSelection = undefined,
  showHeader,
  children,
  loading,
  currentPage,
  currentPageSize,
  columns,
  tableData,
  tableDataTotal,
  scrollY = 'calc(100vh - 254px)',
  paginationChange,
  onChange,
}: {
  rowKey?: string;
  rowSelection?: object;
  showHeader?: boolean;
  children?: React.ReactChild;
  loading: boolean;
  currentPage: number;
  currentPageSize: number;
  columns: ColumnsType<any>;
  tableData: object[];
  tableDataTotal: number;
  scrollY?: string;
  paginationChange: (page: number, pageSize?: number) => void;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | any,
  ) => void;
}) => (
  <TableContainer>
    <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
      {children && <div>{children}</div>}
      <Table
        scroll={{ x: 950, y: scrollY }}
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        locale={{ emptyText: loading ? <div /> : null }}
        rowSelection={rowSelection}
        showHeader={showHeader}
        onChange={onChange}
      />
      <Pagination
        current={currentPage}
        pageSize={currentPageSize}
        total={tableDataTotal}
        onChange={paginationChange}
      />
    </Spin>
  </TableContainer>
);

export default TableComponent;
