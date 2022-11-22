import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import styled from 'styled-components';

import { Colors } from '../../theme';

const PaginationContainer = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: flex-end;
  .container-text {
    display: flex;
    align-items: center;
    p {
      margin-bottom: 0;
      margin-right: 10px;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.black4};
    }
  }
  .ant-pagination {
    .ant-pagination-item-link {
      border: none;
    }
    .ant-pagination-item-active {
      border: 1px solid ${Colors.branding} !important;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item {
      min-width: 28px;
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      font-size: 15px;
      border: none;
      font-family: Heebo;
    }
  }
`;

const PaginationCmp = (props: PaginationProps) => (
  <PaginationContainer>
    <div className="container-text">
      <p>Total {props.total} items</p>
      <Pagination {...props} />
    </div>
  </PaginationContainer>
);

export default PaginationCmp;
