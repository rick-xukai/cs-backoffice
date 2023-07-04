import styled from 'styled-components';

import { Colors } from '../../theme';

const ProfileContainer = styled.div`
  padding: calc(60px + 24px) 24px 24px;
  background: ${Colors.grey5};
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
  .page-main {
    background: ${Colors.white};
    border-radius: 2px;
    .main-title {
      padding: 16px 20px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: ${Colors.black4};
      border-bottom: 0.6px solid ${Colors.grey8};
    }
    .profile-info-item {
      padding: 20px;
      .item-title {
        margin-bottom: 10px;
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.grey6};
      }
      .item-value {
        margin-bottom: 16px;
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
          .info {
            max-width: 190px;
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
    .profile-tips {
      padding: 16px 40px;
      .tips-content {
        padding: 24px;
        background: ${Colors.white2};
        .tips-content-title {
          font-size: 18px;
          font-weight: 700;
          color: ${Colors.black};
          margin-bottom: 16px;
        }
        .tips-content-value {
          font-size: 13px;
          font-weight: 400;
          color: ${Colors.grey6};
        }
        .tips-content-image {
          margin-top: 10px;
          img {
            max-width: 150px;
          }
        }
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
      height: 44px;
      border-radius: 2px;
      background: ${Colors.branding};
      font-size: 15px;
      font-weight: 400;
      color: ${Colors.white};
      border: none;
    }
    .ant-btn[disabled] {
      background: ${Colors.grey9};
      color: ${Colors.grey7};
    }
  }
  @media (max-width: 996px) {
    padding: calc(70px + 15px) 15px 73px;
    .page-main {
      .profile-tips {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    .page-bottom {
      padding: 8px 15px;
      height: 58px;
      width: 100%;
    }
  }
`;

export { ProfileContainer };
