import styled from 'styled-components';

import { Colors } from '../../theme';

interface UserStatusContainerProps {
  isActive: boolean;
}

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
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.grey6};
      }
      .item-key-value {
        color: ${Colors.grayScale70};
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        margin-bottom: 0;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: 768px) {
          &.mobile-top {
            margin-bottom: 20px;
          }
        }
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
      margin-top: 16px;
      > :first-child {
        padding: 0 !important;
        box-shadow: unset;
      }
    }
    .container-user {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: solid 0.6px ${Colors.grey8};
      .ant-avatar {
        width: 64px;
        height: 64px;
        line-height: 64px;
        background: ${Colors.grayScale10};
        color: ${Colors.backgorund};
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 40px;
        text-transform: uppercase;
      }
      .user-name-content {
        display: flex;
        align-items: center;
      }
      .user-name {
        color: ${Colors.grayScale70};
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
      }
      .user-info-content {
        display: flex;
        > :first-child {
          padding-left: 0;
        }
        > :last-child {
          border: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .container-user-top {
        height: 100%;
        align-items: center;
      }
    }
  }
  @media (max-width: 992px) {
    .page-main {
      padding: calc(98px + 24px) 15px 15px;
    }
  }
  @media (max-width: 768px) {
    .detail-container {
      .container-user {
        .user-info-content {
          display: block;
          margin-top: 10px;
          > :nth-child(1) {
            img {
              margin-left: -1px;
            }
          }
          > :nth-child(2) {
            img {
              margin-right: 8px;
            }
          }
          > :nth-child(3) {
            img {
              margin-top: -2px;
              margin-left: -2px;
            }
          }
          > :nth-child(4) {
            img {
              margin-top: -2px;
              margin-left: -2px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 375px) {
    .detail-container {
      padding: 15px;
    }
  }
`;

const UserStatusContainer = styled.span`
  border-radius: 35px;
  background: ${(props: UserStatusContainerProps) =>
    (props.isActive && Colors.green2) || Colors.grey9};
  color: ${(props: UserStatusContainerProps) =>
    (props.isActive && Colors.green1) || Colors.grey6};
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  padding: 4px 8px;
  margin-left: 10px;
`;

const UserInfoItemContainer = styled.div`
  color: ${Colors.black4};
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid ${Colors.grey9};
  white-space: nowrap;
  img {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    padding: 0;
    border-right: 0;
    margin-bottom: 5px;
  }
`;

export { UserDetailContainer, UserStatusContainer, UserInfoItemContainer };
