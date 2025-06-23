import styled from 'styled-components';

import { Colors, BreakPoints } from '../../theme';

const EmailsContainer = styled.div`
  position: relative;
  height: 100%;
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .main-header {
      display: flex;
      margin-bottom: 20px;
      .tab-item {
        margin-right: 20px;
        font-size: 15px;
        color: ${Colors.grey6};
        height: 37px;
        line-height: 37px;
        cursor: pointer;
        padding: 0 12px;
        &.active {
          border: 1px solid ${Colors.branding};
          background: ${Colors.white};
          color: ${Colors.branding};
        }
      }
    }
    .event-filter-container {
      padding: 12px 16px;
      border-radius: 2px;
      background: ${Colors.white};
      > :last-child {
        text-align: right;
      }
      .content {
        height: 100%;
        display: flex;
        align-items: center;
        .ant-input-affix-wrapper {
          padding-top: 6px;
          padding-bottom: 6px;
        }
      }
      .ant-input-affix-wrapper {
        height: 36px;
        background: ${Colors.grey5};
        border: 1px solid ${Colors.grey5};
        :hover {
          border: 1px solid ${Colors.black5};
        }
        input {
          background: ${Colors.grey5};
          ::-webkit-input-placeholder {
            color: ${Colors.grey7};
          }
        }
      }
      .filter-status {
        padding-left: 24px;
      }
      .filter-select-content {
        display: flex;
        width: 100%;
        align-items: center;
        > :last-child {
          width: 90%;
          padding-left: 16px;
        }
        .ant-select-selection-placeholder {
          line-height: 32px;
        }
      }
      .ant-select {
        width: 100%;
      }
      .ant-select-selection-search {
        .ant-select-selection-search-input {
          height: 32px;
        }
      }
      .ant-select-selector {
        height: 32px;
        border-radius: 2px;
        border: 1px solid ${Colors.grey8};
        background: ${Colors.white};
        .ant-select-selection-item {
          line-height: 32px;
        }
      }
      .create-new {
        font-weight: 500;
      }
    }
  }
  @media (max-width: ${BreakPoints.lg}px) {
    .page-main {
      padding: calc(98px + 24px) 15px 15px;
      .event-filter-container {
        padding: 20px;
        .filter-status {
          padding-left: 0;
          margin-top: 16px;
          margin-bottom: 20px;
          .ant-select-selector {
            width: 100%;
          }
        }
      }
      .create-new {
        width: 100%;
        border-radius: 2px;
      }
    }
  }
`;

const EmailsListTableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 184px);
  @media (max-width: ${BreakPoints.lg}px) {
    height: auto;
  }
  border-radius: 2px;
  background: ${Colors.white};
  margin-top: 16px;
  .table-container {
    box-shadow: unset;
  }
  thead {
    .ant-table-cell {
      background: ${Colors.white2};
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      color: ${Colors.black6};
    }
  }
  tbody {
    .event-img {
      height: 44px;
      width: 88px;
      background: ${Colors.black};
      text-align: center;
      border-radius: 4px;
      overflow: hidden;
      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .email-subject-content {
      white-space: pre-wrap;
    }
    .email-subject {
      margin-right: 10px;
    }
    .time-info {
      font-size: 13px;
      color: ${Colors.grey6};
      margin-top: 4px;
    }
    .table-event {
      padding-left: 10px;
      .event-name {
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        color: ${Colors.black4};
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        /* cursor: pointer; */
        /* :hover {
          text-decoration: underline;
        } */
      }
      .event-date {
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.black6};
      }
    }
    .ant-table-cell {
      color: ${Colors.black4};
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
    }
    .action-content {
      display: flex;
      justify-content: end;
      .content {
        display: flex;
        align-items: center;
      }
      span {
        cursor: pointer;
      }
      .icon-content {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-content {
        :hover {
          cursor: pointer;
          border-radius: 50%;
          background: ${Colors.grey9};
        }
      }
    }
  }
  .responsive-card-container {
    padding: 20px;
    min-height: 220px;
  }
`;

const AddNewEmailContainer = styled.div`
  width: 100%;
  height: calc(100vh - 184px);
  border-radius: 2px;
  background: ${Colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  > :first-child {
    text-align: center;
    max-width: 422px;
    .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      color: ${Colors.black4};
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .description {
      font-size: 17px;
      font-weight: 400;
      line-height: 24px;
      color: ${Colors.grey6};
      margin-top: 10px;
      margin-bottom: 16px;
    }
  }
  @media (max-width: ${BreakPoints.lg}px) {
    > :first-child {
      max-width: 315px;
    }
  }
`;

export { EmailsContainer, EmailsListTableContainer, AddNewEmailContainer };
