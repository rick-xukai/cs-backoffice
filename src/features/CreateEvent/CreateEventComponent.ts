import styled from 'styled-components';
import { Button, Col, Collapse, Form, Row, Upload } from 'antd';

import { BreakPoints, Colors } from '../../theme';

// interface TicketTypesContainerProps {
//   containerHight: string;
// }

const { Dragger } = Upload;

const CreateEventContainer = styled.div`
  padding: calc(60px + 20px) 24px 24px;
  padding-bottom: 100px;
  background: ${Colors.grey5};
  position: relative;
  @media (min-width: ${BreakPoints.lg}px) {
    height: calc(100% - 120px);
  }
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
  .page-main {
    background: ${Colors.white};
    border-radius: 2px;
    margin-top: 20px;
    height: 100%;
    form {
      height: 100%;
    }
    .ant-input-show-count-suffix,
    .ant-input-textarea-show-count::after {
      color: ${Colors.grey7};
      font-size: 12px;
      font-weight: 300;
    }
    .main-title {
      padding: 16px 20px;
      font-size: 20px;
      line-height: 28px;
      font-weight: 700;
      color: ${Colors.black4};
      border-bottom: 0.6px solid ${Colors.grey8};
    }
    .main-form {
      margin-top: 20px;
    }
    .banner-image-dragger {
      .ant-upload-list {
        display: none;
      }
    }
  }
  .page-bottom {
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
      font-size: 15px;
      font-weight: 500;
      color: ${Colors.grey6};
      border: 1px solid ${Colors.grey6};
      &.ant-btn-primary {
        background: ${Colors.branding};
        border: none;
        color: ${Colors.white};
        margin-left: 20px;
      }
    }
    .ant-btn[disabled] {
      background: ${Colors.grey9};
      color: ${Colors.grey7};
    }
  }
  @media (max-width: 992px) {
    padding: calc(98px + 15px) 15px 85px;
    overflow-x: hidden;
    .main-box {
      .event-detailed-description {
        align-items: center;
      }
      .ant-form-item-label {
        padding-bottom: 0;
        label {
          margin-bottom: 0;
        }
      }
      .banner-image-dragger {
        .dragger-content {
          &.ant-upload-drag {
            min-height: 153px;
          }
        }
      }
      .detail-image-dragger {
        .dragger-content {
          &.ant-upload-drag {
            min-height: 68px;
          }
        }
      }
    }
    .page-bottom {
      width: 100%;
      padding: 8px 20px;
    }
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
  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: ${Colors.grey4};
  }
  .dragger-content {
    position: relative;
    &.ant-upload-drag {
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
    .ant-upload {
      padding: 0;
    }
    .content-preview {
      position: relative;
      width: 100%;
      height: 123px;
      :hover {
        .content-action-icon {
          display: flex;
        }
      }
      .content-action-icon {
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
`;

const CreateEventFormContainer = styled.div`
  .address,
  .ant-select-selector,
  .ant-select-selection-search-input,
  .ant-picker {
    height: 36px !important;
  }
  .ant-input-affix-wrapper {
    padding: 0 11px;
    .ant-input {
      height: 36px !important;
    }
  }
  .left-form {
    transition: all 0.3s ease-out;
  }
  .main-box {
    background: ${Colors.white};
    border-radius: 4px;
    padding: 20px;
    .map-container {
      margin-top: 20px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-preview {
      height: 340px;
    }
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
      color: ${Colors.grey6};
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: 400;
      line-height: 19px;
    }
    .ant-form-item-label > label::after {
      display: none;
    }
    .ant-form-item-label > .ant-form-item-required::after {
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
    .dragger-content {
      background: ${Colors.white};
      &.ant-upload-drag {
        min-height: 340px;
        max-height: 340px;
        min-width: 100%;
      }
      .ant-upload-drag-icon {
        .anticon {
          color: ${Colors.grey7};
        }
      }
      .ant-upload-text {
        font-size: 13px;
        font-weight: 400;
        color: ${Colors.grey7};
      }
    }
    .dragger-tips {
      font-size: 12px;
      font-weight: 400;
      color: ${Colors.grey7};
      margin-top: 10px;
      margin-bottom: 0;
      line-height: 10px;
    }
    .event-detailed-description {
      justify-content: space-between;
      margin-bottom: 8px;
      > :first-child {
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.grey6};
      }
      > :last-child {
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        color: ${Colors.branding};
        text-align: right;
        span {
          margin-left: 8px;
        }
      }
    }
    .item-suggest-description {
      margin-bottom: 40px;
      .ant-form-item-label {
        width: 100%;
        > :first-child {
          width: 100%;
        }
      }
      .create_event_description,
      .event-detailed-description {
        width: 100%;
      }
      .ant-form-item-label > label::after {
        display: none;
      }
    }
    .detail-image-dragger {
      margin-top: 40px;
      margin-bottom: 0px;
      .dragger-content {
        min-height: 92px;
      }
    }
  }
  .search-location-items {
    position: absolute;
    width: 100%;
    z-index: 1;
    list-style: none;
    margin-top: 5px;
    padding: 0;
    border-radius: 4px;
    background: ${Colors.white};
    box-shadow: 0px 6px 20px 4px rgba(0, 0, 0, 0.05),
      0px 3px 6px -2px rgba(0, 0, 0, 0.1);
    li {
      padding: 10px 12px;
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      color: ${Colors.grey6};
      :hover {
        background: ${Colors.grey10};
      }
      .add-location {
        color: ${Colors.branding};
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .ant-input-number {
    height: 36px;
    .ant-input-number-input {
      height: 36px;
    }
    .ant-input-number-handler-wrap {
      opacity: 1;
    }
    .ant-input-number-handler-down,
    .ant-input-number-handler-up {
      height: 50%;
    }
    .ant-input-number-handler-wrap:hover .ant-input-number-handler {
      height: 50%;
    }
    .ant-input-number-handler-down:hover,
    .ant-input-number-handler-up:hover {
      height: 50% !important;
      background: ${Colors.grey8};
      .anticon {
        color: ${Colors.grey11};
      }
    }
  }
  .noSearchResult {
    width: 100%;
    padding: 10px 12px;
    border-radius: 2px;
    background: ${Colors.white};
    margin-top: 4px;
    box-shadow: 0px 6px 20px 4px rgba(0, 0, 0, 0.05),
      0px 3px 6px -2px rgba(0, 0, 0, 0.1);
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    color: ${Colors.grey6};
  }
  @media (max-width: 992px) {
    .item-suggest-description {
      margin-bottom: 40px;
    }
  }
  .loading {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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

const SpinContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const FoldingPanel = styled(Collapse)`
  &.ant-collapse {
    background: unset;
    border: none;
  }
  .ant-collapse-item:not(.ant-collapse-item-active) > .ant-collapse-header {
    border-bottom: 1px solid ${Colors.grey8};
  }
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0 0 18px 0;
    font-size: 15px;
    color: ${Colors.black5};
    display: flex;
    flex-direction: row-reverse;
    border-radius: 0;
    transition: none;
  }
  &.ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 0;
  }
  .ant-collapse > .ant-collapse-item:last-child {
    border-radius: 0;
  }
  .ant-collapse-content {
    border: none;
    .ant-collapse-content-box {
      padding: 0;
    }
  }
  &.ant-collapse > .ant-collapse-item {
    border: none;
  }
  &.ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-arrow {
    transform: rotate(90deg);
    color: ${Colors.grey7};
    font-size: 17px;
    position: relative;
    left: 10px;
    top: 2px;
  }
  &.ant-collapse
    > .ant-collapse-item-active
    > .ant-collapse-header
    .ant-collapse-arrow {
    transform: rotate(180deg);
  }
`;

const ConnectTicketsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    color: ${Colors.black5};
    margin-bottom: 0;
  }
  .action {
    color: ${Colors.branding};
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    cursor: pointer;
    margin-bottom: 0;
  }
`;

export const ConnectTicketsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`;
export const ConnectTicketItem = styled.li`
  min-height: 57px;
  border: 1px solid ${Colors.grey8};
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  align-items: center;
  margin-bottom: 10px;
  .title {
    font-size: 15px;
    font-weight: 500;
    line-height: 21px;
    color: ${Colors.black4};
    margin-bottom: 0;
  }
  .sub-title {
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    color: ${Colors.grey6};
    margin-bottom: 0;
  }
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const SelectEventsTable = styled(Row)`
  .header {
    background: ${Colors.white2};
    padding: 8px 16px;
    color: ${Colors.black6};
    font-size: 12px;
    font-weight: 700;
    line-height: 23px;
  }
  .item {
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 400;
  }
`;

const NoSearchResultButton = styled.span`
  color: ${Colors.branding};
  cursor: pointer;
  margin-left: 5px;
`;

export const ModalFooterButton = styled(Button)`
  height: 32px;
  min-width: 83px;
  line-height: 11px;
`;

export const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  padding: 0 20px 20px 20px;
`;
export const EventListItemDesktop = styled.li`
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 20px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.black4};
  }
`;

export const EventListItemMobile = styled.li``;

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
  SpinContainer,
  FoldingPanel,
  ConnectTicketsTitle,
  NoSearchResultButton,
};
