import styled from 'styled-components';

import { Colors } from '../../theme';

const UserDetailContainer = styled.div`
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
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
  }
  .detail-container {
    background: ${Colors.white};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 24px;
    margin-top: 24px;
    > :last-child {
      margin-bottom: 0 !important;
    }
    .item {
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.black5};
      .item-key {
        color: ${Colors.grey7};
      }
      .item-key-title {
        color: ${Colors.grey7};
      }
      .item-key-value {
        margin-bottom: 0;
        color: ${Colors.black5};
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ant-badge-status-text {
        font-weight: 400;
        font-size: 15px;
      }
    }
    .edit-status {
      display: flex;
      align-items: center;
      margin-left: 24px;
      SVG:hover {
        cursor: pointer;
        path {
          fill: ${Colors.black5};
        }
      }
    }
    .ant-select {
      width: 100%;
    }
    .ant-select-selector,
    .ant-select-selection-search-input {
      height: 32px !important;
    }
    .ant-select-focused:not(.ant-select-disabled),
    .ant-select:not(.ant-select-customize-input),
    .ant-select-selector {
      border-color: ${Colors.grey4} !important;
      box-shadow: unset !important;
    }
    .ant-select-selection-item {
      line-height: 32px !important;
    }
    .ticket-list-title {
      font-weight: 700;
      font-size: 18px;
      color: ${Colors.black4};
    }
    .ticket-table {
      margin-top: 24px;
      > :first-child {
        padding: 0 !important;
        box-shadow: unset;
      }
    }
  }
`;

export { UserDetailContainer };
