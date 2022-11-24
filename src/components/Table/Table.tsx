import React from 'react';
import styled from 'styled-components';
import { Table, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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
  .ant-table-thead {
    th {
      height: 40px;
      background: ${Colors.grey5};
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: none;
      border-top-left-radius: unset !important;
      border-top-right-radius: unset !important;
      font-weight: 400;
      font-size: 14px;
      color: ${Colors.grey6};
      ::before {
        display: none;
      }
    }
  }
  .ant-table-tbody {
    td {
      padding-top: 10px;
      padding-bottom: 10px;
      p {
        margin-bottom: 0;
      }
    }
    .ant-table-row:hover {
      td {
        background: ${Colors.white};
      }
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
  loading,
  currentPage,
  currentPageSize,
  columns,
  tableData,
  tableDataTotal,
  paginationChange,
}: {
  rowKey?: string;
  loading: boolean;
  currentPage: number;
  currentPageSize: number;
  columns: ColumnsType<any>;
  tableData: object[];
  tableDataTotal: number;
  paginationChange: (page: number) => void;
}) => (
  <TableContainer>
    <Spin
      spinning={loading}
      indicator={<LoadingOutlined style={{ color: 'black' }} spin />}
      size="large"
    >
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        locale={{ emptyText: loading ? <div /> : null }}
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
