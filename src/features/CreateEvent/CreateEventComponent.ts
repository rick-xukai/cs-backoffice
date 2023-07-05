import styled from 'styled-components';
import { Col, Form, Row, Upload } from 'antd';

import { Colors } from '../../theme';

interface TicketTypesContainerProps {
  containerHight: string;
}

const { Dragger } = Upload;

const CreateEventContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
  }
  .edit-event-page-main {
  }
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
    .cancel-btn {
      border: 1px solid ${Colors.grey6};
      background: transparent;
      margin-right: 18px;
      color: ${Colors.grey6};
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
`;

const CreateEventFormContainer = styled.div`
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
      min-height: unset;
      border-top-left-radius: 0px;
      box-shadow: unset;
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
  .ant-tabs-content-holder {
    height: calc(
      ${(props: TicketTypesContainerProps) => props.containerHight} - 40px
    );
    background: ${Colors.white};
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 0;
`;

const UploadText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${Colors.grey6};
`;

const ImageDragger = styled(Dragger)``;

const DraggetForm = styled(Form.Item)`
  .ant-upload-list {
    display: none;
  }
`;

const ImagesContainer = styled(Row)`
  margin-bottom: 16px;
`;

const ImageItem = styled(Col)`
  overflow: hidden;
  transition: 0.2s;
  img {
    width: 100%;
    object-fit: cover;
  }

  .image-handler {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.2s;
    left: 0;
    top: 0;
    opacity: 0;
    background: ${Colors.fadingBlack};
    .handler-list {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  .image-content {
    position: relative;
    :hover {
      .image-handler {
        opacity: 1;
      }
    }
  }
`;

const ImageHandlerContainer = styled.div`
  width: 36px;
  height: 36px;
  background: ${Colors.fadingBlack2};
  border-radius: 50%;
  color: ${Colors.white};
  cursor: pointer;
  transition: 0.2s;
  img {
    width: 20px;
    display: block;
    margin: auto;
    margin-top: 8px;
    user-select: none;
    transition: 0.2s;
  }
  :hover {
    background: ${Colors.white};
    img {
      filter: invert(100%);
    }
  }
`;

export {
  CreateEventContainer,
  CreateEventFormContainer,
  UploadIcon,
  UploadText,
  ImageDragger,
  DraggetForm,
  ImagesContainer,
  ImageItem,
  ImageHandlerContainer,
};
