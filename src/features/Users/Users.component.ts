import styled from 'styled-components';
import { Row } from 'antd';

import { Colors } from '../../theme';

const UsersContainer = styled.div`
  background: #fff;
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .email {
      overflow: hidden;
      text-overflow: ellipsis;
    }
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

const ListTableContainer = styled.div`
  padding: 20px;
  background: ${Colors.white};
  border-radius: 4px;
  .ant-table-ping-right:not(.ant-table-has-fix-right)
    > .ant-table-container::after {
    box-shadow: unset;
  }
  .ant-table-ping-left:not(.ant-table-has-fix-left)
    > .ant-table-container::before {
    box-shadow: unset;
  }
  .table-container {
    width: 100%;
    padding: 0;
    box-shadow: unset;
    .ant-table-thead {
      th {
        background: ${Colors.grayScale10};
        color: ${Colors.grayScale90};
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
      }
    }
    .ant-table-tbody {
      td {
        color: ${Colors.grayScale70};
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
      }
    }
    .item-label {
      color: ${Colors.grey6};
      font-size: 13px;
      font-weight: 400;
      line-height: 19px;
    }
    .item-action {
      color: ${Colors.branding};
      cursor: pointer;
    }
  }
  .list-action {
    display: flex;
    float: right;
    .icon-content {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      :hover {
        cursor: pointer;
        border-radius: 50%;
        background: ${Colors.grey9};
      }
    }
  }
  .ant-input-affix-wrapper {
    height: 32px;
    background: ${Colors.grey5};
    border: none;
    padding: 5px 11px;
    input {
      background: ${Colors.grey5};
    }
  }
  .ant-select {
    width: 100%;
    .ant-select-selector {
      height: 32px !important;
      border-radius: 2px !important;
      border: 1px solid ${Colors.grey8} !important;
      .ant-select-selection-item,
      .ant-select-selection-placeholder {
        line-height: 32px;
      }
      .ant-select-selection-placeholder {
        color: ${Colors.grey7};
      }
    }
  }
  .export-action {
    text-align: right;
    > :first-child {
      margin-right: 16px;
    }
    &.single {
      > :first-child {
        margin-right: 0px;
      }
    }
    .action-button {
      height: 32px;
      border-radius: 2px;
      border: 1px solid ${Colors.grey6};
      padding: 0 12px;
      color: ${Colors.grey6};
      font-size: 13px;
      font-weight: 500;
      line-height: 19px;
      :hover {
        color: ${Colors.branding};
        border-color: ${Colors.branding};
      }
    }
    .ant-btn[disabled] {
      border: 1px solid ${Colors.grey8};
      background: ${Colors.grey9};
      color: ${Colors.grayScale40};
    }
    .loading-icon {
      color: ${Colors.grayScale50};
    }
  }
  @media (max-width: 992px) {
    .export-action {
      margin-top: 16px;
    }
  }
`;

export { UsersContainer, TableFilterContainer, ListTableContainer };
