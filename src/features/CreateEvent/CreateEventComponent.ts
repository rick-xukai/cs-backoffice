import styled from 'styled-components';
import { Row } from 'antd';

import { Colors } from '../../theme';

const CreateEventContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .publish-event {
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
      .ant-btn[disabled] {
        background: ${Colors.grey9};
        color: ${Colors.grey7};
      }
    }
    .ant-tabs-nav {
      margin: 0;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
      border-width: 1px 1px 0px 1px;
      border-style: solid;
      border-color: ${Colors.grey8};
      background: ${Colors.grey9};
      margin-right: 5px;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
      border: none;
      background: ${Colors.white};
    }
    .ant-tabs-nav-add {
      background: ${Colors.grey9};
      border-width: 1px 1px 0px 1px;
      border-style: solid;
      border-color: ${Colors.grey8};
    }
    .ant-tabs-tab-remove {
      font-size: 15px;
    }
    .ant-tabs-tab-btn {
      font-weight: 400;
      font-size: 15px;
    }
    .ant-select-selection-item {
      line-height: 32px !important;
    }
  }
`;

const CreateEventFormContainer = styled(Row)`
  margin: 0 !important;
  .ant-input,
  .ant-select-selector,
  .ant-picker {
    height: 32px !important;
  }
  .ant-input-affix-wrapper {
    padding: 0 11px;
  }
  .main-box {
    background: ${Colors.white};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 24px;
    min-height: calc(100vh - 154px);
    &.ticket-tab {
      min-height: calc(100vh - 194px);
      border-top-left-radius: 0px;
    }
    .ant-form-item-row {
      display: block;
    }
    .ant-form-item-label > label {
      height: unset;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.grey6};
      margin-bottom: 5px;
    }
    .ant-form-item-label > label::after {
      display: inline-block;
      margin-right: 4px;
      color: ${Colors.branding};
      font-weight: 400;
      font-size: 15px;
      line-height: 1;
      content: '*';
    }
    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }
    .ant-picker {
      width: 100%;
    }
    textarea.ant-input {
      min-height: 98px;
    }
    .upload-component {
      display: flex;
      align-items: center;
      .ant-upload-picture-card-wrapper {
        width: unset;
      }
      .info {
        margin-left: 12px;
        font-weight: 400;
        font-size: 15px;
        color: ${Colors.grey7};
      }
    }
    .not-required {
      .ant-form-item-label > label::after {
        display: none;
      }
    }
  }
`;

export { CreateEventContainer, CreateEventFormContainer };
