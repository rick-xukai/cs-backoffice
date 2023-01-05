import styled from 'styled-components';
import { Colors } from '../../theme';

const TransactionsDetailContainer = styled.div`
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .edit-status {
      text-align: right;
      .ant-btn {
        font-weight: 400;
        font-size: 15px;
        border: 1px solid ${Colors.grey6};
        color: ${Colors.grey6};
        height: 32px;
        background: unset;
        border-radius: 2px;
        padding: 0;
        padding: 2px 10px 0 10px;
        margin-left: 24px;
        &:disabled {
          background: ${Colors.grey9};
          color: ${Colors.grey7};
        }
      }
      .ant-btn-primary {
        background: ${Colors.branding};
        color: ${Colors.white};
        border: none;
      }
    }
    .main-container {
      padding: 24px;
      margin-top: 24px;
      border-radius: 4px;
      background: ${Colors.white};
      font-weight: 400;
      font-size: 15px;
      .item-row {
        margin-bottom: 24px;
      }
      .item {
        color: ${Colors.grey7};
      }
      .value {
        margin-bottom: 0;
        color: ${Colors.black5};
      }
      > :last-child {
        margin-bottom: 0;
      }
      .ant-select {
        width: 35%;
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

export { TransactionsDetailContainer };
