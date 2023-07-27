import styled from 'styled-components';
import { Row } from 'antd';

import { Colors, BreakPoints } from '../../theme';

interface EventStatusBadgeProps {
  color: string;
  background: string;
}

const EventsContainer = styled.div`
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
          padding-top: 8px;
          padding-bottom: 8px;
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
        .filter-select-content {
          align-items: center;
          > :last-child {
            padding-left: 16px;
          }
        }
        .ant-select {
          width: 100%;
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
      }
    }
    .ant-btn {
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      color: ${Colors.white};
    }

    .create-event {
      text-align: right;
      margin-bottom: 12px;
      .ant-btn {
        height: 32px;
        background: ${Colors.branding};
        border-radius: 2px;
        border: none;
        font-weight: 400;
        font-size: 15px;
        color: #fff;
        padding: 5px 12px;
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
  .event-list-action {
    display: flex;
    float: right;
    > :first-child {
      margin-right: 20px;
    }
    .icon-content,
    .icon-content-disable {
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
  .ant-btn[disabled] {
    background: unset;
    color: ${Colors.grey7};
    :hover {
      a {
        text-decoration: unset;
      }
    }
  }
  @media (max-width: ${BreakPoints.lg}px) {
    .page-main {
      padding: calc(98px + 24px) 24px 24px;
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
      .create-new-event {
        width: 100%;
        border-radius: 2px;
      }
    }
  }
`;

const AddNewEventContainer = styled.div`
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
      margin-bottom: 0;
    }
    .description {
      font-size: 17px;
      font-weight: 400;
      line-height: 24px;
      color: ${Colors.grey6};
      margin-bottom: 16px;
      margin-top: 10px;
    }
  }
  @media (max-width: ${BreakPoints.lg}px) {
    > :first-child {
      max-width: 315px;
    }
  }
`;

const EventListTableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 184px);
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
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .table-event {
      padding-left: 15px;
      .event-name {
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        color: ${Colors.black4};
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        :hover {
          text-decoration: underline;
        }
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
  }
  .responsive-card-container {
    padding: 20px;
  }
`;

const EventStatusBadge = styled.span`
  padding: 2px 6px;
  border-radius: 42px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  color: ${(props: EventStatusBadgeProps) => props.color};
  background: ${(props: EventStatusBadgeProps) => props.background};
`;

const EventInfoCardResponsive = styled(Row)`
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 0.6px solid ${Colors.grey8};
  .event-list-action {
    > :first-child {
      margin-right: 15px;
    }
    .icon-content {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export {
  EventsContainer,
  AddNewEventContainer,
  EventListTableContainer,
  EventStatusBadge,
  EventInfoCardResponsive,
};
