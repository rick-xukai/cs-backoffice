import styled from 'styled-components';
import { Row } from 'antd';
import { Colors } from '../../theme';

const TransactionsContainer = styled.div`
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
  .bank_account {
    min-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 992px) {
    .page-main {
      padding: calc(98px + 24px) 15px 15px;
    }
  }
`;

const TableFilterContainer = styled(Row)`
  margin-bottom: 24px;
  .filter-picker,
  .filter-status {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    color: ${Colors.black};
  }
  .filter-status {
    padding-right: 16px;
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
  .filter-picker {
    padding-left: 16px;
    .ant-picker {
      margin-left: 12px;
      height: 32px;
      border-radius: 2px;
      border: 1px solid ${Colors.grey8};
      .anticon {
        color: ${Colors.black5};
      }
      .anticon-calendar {
        color: ${Colors.grey7};
      }
      &.ant-picker-focused {
        box-shadow: unset;
      }
      .ant-picker-active-bar {
        display: none;
      }
    }
  }
  .change-status-btn {
    width: 120px;
    height: 32px;
    background: ${Colors.branding};
    padding: 0;
    border: none;
    font-weight: 400;
    font-size: 15px;
    border-radius: 2px;
  }
`;

const TableSelectItemsContainer = styled(Row)`
  padding-left: 12px;
  padding-right: 24px;
  height: 40px;
  background: ${Colors.white2};
  font-weight: 400;
  font-size: 15px;
  color: ${Colors.grey6};
  border-radius: 2px;
  .ant-col {
    display: flex;
    align-items: center;
  }
  .ant-typography {
    font-weight: 400;
    font-size: 15px;
    color: ${Colors.grey6};
  }
  .clear-selected {
    justify-content: flex-end;
    span {
      cursor: pointer;
    }
  }
  .select-all {
    .ant-checkbox {
      .ant-checkbox-inner::after {
        position: absolute;
        display: table;
        transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background-color: ${Colors.branding};
        border: 0;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        content: ' ';
      }
    }
    .ant-checkbox-checked {
      .ant-checkbox-inner::after {
        position: absolute;
        display: table;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        content: ' ';
        left: 22%;
        width: 6px;
        height: 9px;
      }
    }
  }
  .ant-checkbox-wrapper {
    margin-right: 26px;
  }
`;

export {
  TransactionsContainer,
  TableFilterContainer,
  TableSelectItemsContainer,
};
