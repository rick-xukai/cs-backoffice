import styled from 'styled-components';

import { Colors, BreakPoints } from '../../theme';

const CreateEditEmailContainer = styled.div`
  height: 100%;
  padding-bottom: 80px;
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .upload-img-loading {
      width: calc(100% - 240px);
      right: 0;
      position: fixed;
      background: #6666;
      height: 100%;
      z-index: 1;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      background: ${Colors.white};
      border-radius: 2px;
    }
    .main-title {
      padding: 12px 12px;
      font-size: 17px;
      font-weight: 700;
      color: ${Colors.black4};
      .basic-info {
        display: flex;
        align-items: center;
        height: 100%;
      }
      @media (max-width: ${BreakPoints.lg}px) {
        font-size: 15px;
      }
    }
    .basic-info-item {
      padding: 12px 12px;
      .ant-select-selector {
        height: 36px;
        input {
          height: 36px;
        }
        .ant-select-selection-item {
          line-height: 36px;
        }
      }
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
        .ant-form-item {
          margin-bottom: 0;
        }
        .error-message {
          font-size: 12px;
          color: ${Colors.branding};
        }
        .ant-input-affix-wrapper {
          padding-top: 0;
          padding-bottom: 0;
        }
        .ant-input {
          height: 36px;
        }
        .ant-select {
          width: 100%;
        }
        .date-time-picker {
          margin-top: 16px;
        }
        .ant-picker {
          height: 36px;
        }
        button,
        .ql-picker-label {
          &.ql-active {
            color: ${Colors.branding};
            .ql-stroke {
              stroke: ${Colors.branding};
            }
            .ql-fill {
              fill: ${Colors.branding};
            }
          }
        }
        .ql-editor {
          min-height: 300px;
        }
        .ql-toolbar {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          button,
          .ql-picker-label {
            :hover {
              color: ${Colors.branding};
              .ql-stroke {
                stroke: ${Colors.branding};
              }
              .ql-fill {
                fill: ${Colors.branding};
              }
            }
          }
        }
        .ql-snow {
          border: 1px solid ${Colors.grey4};
        }
        .ql-container {
          min-height: 300px;
          &.ql-snow {
            border-top: none;
          }
        }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
          content: 'Small';
        }
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
          font-size: 12px;
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='15px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='15px']::before {
          content: 'Normal';
        }
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='15px']::before {
          font-size: 15px;
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
          content: 'Large';
        }
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
          font-size: 20px;
        }

        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='40px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='40px']::before {
          content: 'Huge';
        }
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='40px']::before {
          font-size: 40px;
        }
        .show-editor-length {
          padding: 7px 12px;
          border: 1px solid ${Colors.grey4};
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top: 0;
          text-align: right;
          font-size: 12px;
          color: ${Colors.grey7};
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
    }
    .email-review {
      .content {
        background: ${Colors.white};
        border-radius: 2px;
        padding: 12px 0;
        .review-subject {
          padding: 0 24px;
          margin-bottom: 20px;
          .subject-content {
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .label {
            font-size: 13px;
            color: ${Colors.grey6};
          }
          .value {
            margin-left: 5px;
            font-size: 15px;
            color: ${Colors.black10};
            font-weight: 500;
          }
        }
        .dear-user-name {
          padding: 0 24px;
          font-size: 15px;
          margin-bottom: 24px;
        }
      }
    }
    .ant-select-disabled.ant-select:not(.ant-select-customize-input)
      .ant-select-selector,
    .ant-input-affix-wrapper-disabled,
    .ant-picker.ant-picker-disabled,
    .ant-radio-disabled .ant-radio-inner {
      background: ${Colors.grey9};
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
  @media (min-width: 992px) {
    .page-main {
      .email-form {
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
      }
    }
    .page-bottom {
      padding: 16px 20px;
    }
  }
`;

export { CreateEditEmailContainer };
