import styled from 'styled-components';
import { Row } from 'antd';

import { Colors } from '../../theme';

const TicketsSoldContainer = styled.div`
  padding: calc(113px + 24px) 24px 24px;
  padding-bottom: 100px;
  background: ${Colors.grey5};
  @media (min-width: 992px) {
    padding: calc(60px + 24px) 24px 24px;
  }
`;

const ContainerTitle = styled(Row)`
  padding: 20px;
  background: ${Colors.white};
  margin-bottom: 16px;
  .right {
    .info-content {
      justify-content: end;
    }
    .content-title,
    .content-info {
      text-align: right;
    }
  }
  .info-content {
    display: flex;
    align-items: center;
    height: 100%;
    p {
      margin-bottom: 0;
    }
    .content-title {
      color: ${Colors.grayScale70};
      font-family: Oswald;
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      text-transform: uppercase;
    }
    .content-name {
      color: ${Colors.black4};
      font-size: 17px;
      font-weight: 400;
      line-height: 24px;
      margin-top: 10px;
      text-transform: capitalize;
    }
    .content-info {
      color: ${Colors.grey6};
      font-size: 13px;
      font-weight: 400;
      line-height: 19px;
      margin-top: 5px;
      .bold {
        color: ${Colors.black4};
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        margin-left: 5px;
      }
    }
  }
`;

const ListTableContainer = styled.div`
  padding: 20px;
  background: ${Colors.white};
  .table-overflow {
    overflow-y: auto;
    min-height: 250px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .table-container {
    width: 180%;
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
`;

const TableFilterContainer = styled(Row)`
  margin-bottom: 20px;
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
    .ant-btn[disabled] {
      border: 1px solid ${Colors.grey8};
      background: ${Colors.grey9};
      color: ${Colors.grayScale40};
    }
  }
  @media (max-width: 992px) {
    .export-action {
      margin-top: 16px;
    }
  }
`;

export {
  TicketsSoldContainer,
  ContainerTitle,
  ListTableContainer,
  TableFilterContainer,
};
