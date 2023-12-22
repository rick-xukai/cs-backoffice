import styled from 'styled-components';

import { Colors, BreakPoints } from '../../theme';

const CreateOrganisersContainer = styled.div`
  height: 100%;
  padding-bottom: 80px;
  .ant-btn-primary[disabled] {
    background: ${Colors.buttonDisable};
    color: ${Colors.white};
    border: none;
  }
  .ant-input-affix-wrapper-disabled {
    background: ${Colors.grey9};
    color: ${Colors.grey7};
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 2px;
    .ant-input[disabled] {
      background-color: unset;
      border-color: unset;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .input-email-error {
    color: ${Colors.branding};
    font-size: 12px;
    margin-top: 2px;
  }
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .content {
      background: ${Colors.white};
      border-radius: 2px;
    }
    .main-title {
      padding: 0px 20px;
      font-size: 28px;
      line-height: 28px;
      font-weight: 700;
      color: ${Colors.black4};
      border-bottom: 0.6px solid ${Colors.grey8};
      height: 68px;
      .profile {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .title-action {
        align-items: center;
        height: 100%;
        .button-content {
          text-align: right;
        }
        .ant-btn {
          height: 32px;
          padding-top: 0;
          padding-bottom: 0;
          font-weight: 500;
        }
      }
      @media (max-width: ${BreakPoints.lg}px) {
        font-size: 20px;
      }
    }
    .profile-info-item {
      padding: 20px;
      .item-title {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.grey6};
        &.requied {
          ::after {
            display: inline-block;
            margin-left: 4px;
            color: ${Colors.branding};
            font-weight: 400;
            font-size: 15px;
            line-height: 1;
            content: '*';
          }
        }
      }
      .item-value {
        margin-bottom: 16px;
        .ant-select {
          width: 100%;
        }
        .org-logo {
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .logo-text {
          background: linear-gradient(
            179.81deg,
            ${Colors.branding} 1.16%,
            ${Colors.branding100} 99.83%
          );
          color: ${Colors.white};
          border-radius: 50%;
          width: 80px;
          height: 80px;
          font-weight: 700;
          font-size: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Oswald;
        }
        .upload-content {
          align-items: center;
          .logo-preview {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .customUploadButtonContent {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              object-fit: cover;
            }
          }
          .info {
            font-size: 12px;
            max-width: 190px;
            line-height: 16px;
            p {
              margin: 0;
            }
          }
          .ant-upload.ant-upload-select-picture-card {
            border-radius: 50%;
            width: 80px;
            height: 80px;
            margin: 0;
            border: none;
            background: ${Colors.grey9};
            position: relative;
            :hover {
              .custom-upload-button {
                display: block;
              }
            }
          }
          .custom-upload-button {
            display: none;
            .upload-button-bg {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.7);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .upload-button-content {
              color: ${Colors.white};
            }
          }
        }
        .ant-upload-drag {
          min-height: 123px;
          display: flex;
          align-items: center;
          .ant-upload-drag-icon {
            margin-bottom: 0;
            .anticon {
              font-size: 18px;
              color: ${Colors.grey7};
            }
          }
          .ant-upload-text {
            font-size: 13px;
            font-weight: 400;
            color: ${Colors.grey7};
          }
        }
        .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
          border-color: ${Colors.grey4};
        }
        .dragger-banner {
          position: relative;
          .ant-upload {
            padding: 0;
          }
          .banner-preview {
            position: relative;
            width: 100%;
            height: 123px;
            :hover {
              .banner-action-icon {
                display: flex;
              }
            }
            .banner-action-icon {
              display: none;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              align-items: center;
              justify-content: center;
              background: rgba(0, 0, 0, 0.5);
              > :last-child {
                img {
                  margin-right: 0;
                }
              }
              img {
                width: 36px;
                height: 36px;
                cursor: pointer;
                margin-right: 20px;
              }
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
      }
      .ant-input[disabled] {
        background-color: ${Colors.grey9};
        border-color: ${Colors.grey8};
        color: ${Colors.grey7};
        font-size: 15px;
        font-weight: 400;
        height: 36px;
      }
      .ant-input-group-addon {
        background: transparent;
        font-size: 15px;
        font-weight: 400;
        color: ${Colors.grey7};
      }
      .dragger-tips {
        font-size: 12px;
        font-weight: 400;
        color: ${Colors.grey7};
        margin-top: 5px;
      }
    }
    .users-permissions {
      .users-list-content-empty {
        padding: 20px;
        min-height: calc(100vh - 250px);
        display: flex;
        align-items: center;
        justify-content: center;
        .empty-content {
          text-align: center;
          .title {
            color: ${Colors.grayScale70};
            font-size: 20px;
            font-weight: 700;
            line-height: 28px;
            margin-top: 24px;
          }
          .info {
            color: ${Colors.grey6};
            font-size: 17px;
            font-weight: 400;
            line-height: 24px;
            margin-top: 10px;
          }
          .add-button {
            margin-top: 32px;
            .ant-btn {
              color: ${Colors.white};
              font-size: 15px;
              font-weight: 500;
              line-height: 21px;
            }
          }
        }
      }
      .users-list-content {
        padding: 20px;
        min-height: calc(100vh - 250px);
      }
    }
  }
  .page-bottom {
    height: 76px;
    padding: 16px 64px 16px 20px;
    background: ${Colors.white};
    border-top: 1px solid ${Colors.grey9};
    position: fixed;
    bottom: 0;
    width: calc(100% - 240px);
    right: 0;
    text-align: right;
    .ant-btn {
      width: 95px;
      font-size: 15px;
      font-weight: 500;
    }
    .ant-btn-primary {
      height: 44px;
      border-radius: 2px;
      background: ${Colors.branding};
      color: ${Colors.white};
      border: none;
      margin-left: 20px;
    }
    .ant-btn[disabled] {
      background: ${Colors.buttonDisable};
      color: ${Colors.white};
    }
  }
  .ant-modal-body {
    padding: 0px 0px 80px 0px !important;
    position: relative;
    .form-footer-button {
      display: flex;
      justify-content: end;
      box-shadow: 0px 1px 0px 0px #f0f0f0 inset;
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      padding: 10px 16px;
      > :first-child {
        margin-right: 10px;
      }
      .ant-form-item-control-input {
        min-height: unset;
      }
      .ant-form-item {
        margin-bottom: 0;
        .ant-btn {
          height: 32px;
          padding-top: 0;
          padding-bottom: 0;
        }
      }
    }
    .form-item {
      margin-bottom: 24px;
    }
    .item-label {
      color: ${Colors.grey6};
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 8px;
      &.no-requied {
        ::after {
          display: none;
        }
      }
      ::after {
        display: inline-block;
        margin-left: 4px;
        color: ${Colors.branding};
        font-weight: 400;
        font-size: 15px;
        line-height: 1;
        content: '*';
      }
    }
    .item-field {
      .ant-form-item {
        margin: 0;
        .ant-form-item-control-input {
          min-height: unset;
        }
        .ant-input-status-error {
          border-color: ${Colors.branding};
        }
        .ant-form-item-explain-error {
          color: ${Colors.branding};
        }
      }
      .notes {
        .ant-input {
          height: 115px;
        }
      }
      .ant-input {
        height: 32px;
      }
      .ant-select {
        width: 100%;
        height: 32px;
        .ant-select-selector {
          height: 32px;
        }
        .ant-select-selection-search {
          .ant-select-selection-search-input {
            height: 32px;
          }
        }
        .ant-select-selection-item {
          line-height: 32px;
        }
      }
      .ant-input-affix-wrapper {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
  .form-footer-button {
    .ant-btn {
      width: 95px;
      height: 34px;
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 15px;
      font-weight: 500;
      .anticon {
        color: ${Colors.white};
      }
    }
  }
  .organiser-user-form-content {
    padding: 24px 20px;
    > :last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: 768px) {
    .ant-modal {
      width: 700px !important;
    }
  }
  @media (min-width: 992px) {
    .page-main {
      .profile-form {
        position: relative;
      }
      .content {
        position: sticky;
        top: 78px;
      }
    }
  }
  @media (max-width: 992px) {
    .page-main {
      padding: calc(120px + 24px) 24px 24px;
    }
    .page-bottom {
      width: 100%;
    }
  }
  @media (max-width: 576px) {
    .page-main {
      .main-title {
        height: auto;
        padding-top: 16px;
        padding-bottom: 16px;
        .title-action {
          .button-content {
            margin-top: 10px;
            text-align: left !important;
          }
        }
      }
    }
    .page-bottom {
      padding: 16px 20px;
    }
  }
`;

const UsersListItem = styled.div`
  padding: 12px 20px;
  border-radius: 2px;
  border: 1px solid ${Colors.grey9};
  background: ${Colors.white};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  > :last-child {
    margin-bottom: 0 !important;
  }
  .user-name {
    color: ${Colors.grayScale70};
    font-size: 20px;
    font-weight: 700;
    margin-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-type {
    border-radius: 42px;
    background: ${Colors.grey5};
    padding: 2px 6px;
    color: ${Colors.grayScale70};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    img {
      margin-top: -2px;
      margin-right: 4px;
    }
  }
  .user-item-action {
    display: flex;
    float: right;
    > :first-child {
      margin-right: 15px;
    }
    .icon-content {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: ${BreakPoints.lg}px) {
        position: relative;
        top: -3px;
      }
    }
    .icon-content {
      :hover {
        cursor: pointer;
        border-radius: 50%;
        background: ${Colors.grey9};
      }
    }
  }
  .item {
    margin-bottom: 10px;
    > :first-child {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .item-icon {
    margin-right: 8px;
    &.time {
      img {
        margin-top: -3px;
      }
    }
  }
  .item-value {
    color: ${Colors.grayScale70};
    font-size: 15px;
    font-weight: 400;
  }
  .status {
    text-align: right;
  }
  @media (max-width: 576px) {
    padding: 12px 12px;
    .icon-content {
      margin-right: 0 !important;
    }
    .user-name {
      font-size: 16px;
    }
    .user-type {
      font-size: 12px;
      img {
        width: 12px;
      }
    }
  }
`;

export { CreateOrganisersContainer, UsersListItem };
