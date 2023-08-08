import styled from 'styled-components';

import { Colors } from '../../theme';

const OrdersContainer = styled.div`
  padding: calc(60px + 24px) 24px 24px;
  padding-bottom: 100px;
  background: ${Colors.grey5};
  .page-main {
    padding: 20px;
    background: ${Colors.white};
    .filter-container {
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
          height: 32px;
          border-radius: 2px;
          border: 1px solid ${Colors.grey8};
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
            color: ${Colors.grey6};
          }
        }
      }
    }
    .orders-tabs {
      margin-top: 20px;
      .ant-tabs-top > .ant-tabs-nav::before {
        border-bottom: 0;
      }
      .ant-tabs-top > .ant-tabs-nav {
        margin: 0 0 20px 0;
      }
      .ant-tabs-tab-btn {
        color: ${Colors.backgorund};
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${Colors.branding};
        }
      }
      .ant-tabs-content-holder {
        overflow-y: auto;
        min-height: 250px;
        ::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
`;

const OrdersTableContainer = styled.div`
  &.large-table {
    .table-container {
      width: 150%;
    }
  }
  .table-container {
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
`;

export { OrdersContainer, OrdersTableContainer };
