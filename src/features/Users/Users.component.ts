import styled from 'styled-components';
import { Row } from 'antd';

import { Colors } from '../../theme';

const UsersContainer = styled.div`
  background: #fff;
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
  }
  .name-btn {
    border: none;
    padding: 0;
    height: auto;
    color: ${Colors.branding};
    transition: unset;
    :hover {
      a {
        text-decoration: underline;
      }
    }
  }
  .ant-table-column-sorters {
    padding-right: 85px !important;
  }
  @media (max-width: 992px) {
    .page-main {
      padding: calc(98px + 24px) 15px 15px;
    }
  }
`;

const TableFilterContainer = styled(Row)`
  margin-bottom: 24px;
  .filter-status {
    padding-right: 16px;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    color: ${Colors.black};
    .ant-select {
      width: 100%;
      margin-left: 12px;
      .ant-select-selector {
        border-radius: 2px;
      }
      .ant-select-selector,
      .ant-select-selection-search-input {
        height: 32px;
      }
      .ant-select-selection-item {
        font-weight: 400;
        font-size: 15px;
        color: ${Colors.black5};
        line-height: 32px;
      }
      .ant-select-focused:not(.ant-select-disabled),
      .ant-select:not(.ant-select-customize-input),
      .ant-select-selector {
        border: 1px solid ${Colors.grey8};
        border-color: ${Colors.grey8} !important;
        box-shadow: unset !important;
      }
    }
  }
`;

export { UsersContainer, TableFilterContainer };
