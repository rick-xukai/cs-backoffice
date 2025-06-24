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
  @media (max-width: 996px) {
    min-height: 100%;
  }
  @media (min-width: ${BreakPoints.lg}px) {
    height: calc(100% - 120px);
  }
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    .anticon {
      font-size: 40px;
    }
  }
  .loading-message {
    width: 100%;
    position: absolute;
    top: 55%;
    text-align: center;
    font-size: 15px;
    display: flex;
    justify-content: center;
    left: 0;
    font-weight: 400;
    p {
      width: 50%;
      color: ${Colors.black};
    }
  }
  .page-main {
    background: ${Colors.white};
    border-radius: 2px;
    margin-top: 20px;
    @media (min-width: ${BreakPoints.lg}px) {
      margin-top: 14px;
    }
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
    z-index: 2;
    .bottom-btn {
      > :first-child {
        .anticon {
          color: ${Colors.grey6};
        }
      }
      > :last-child {
        .anticon {
          color: ${Colors.white};
        }
      }
    }
    .ant-btn {
      height: 44px;
      border-radius: 2px;
      font-size: 15px;
      font-weight: 500;
      &.ant-btn-primary {
        margin-left: 20px;
      }
    }
  }
  .end-date-error {
    font-size: 12px;
    color: #e16058;
    margin-top: -12px;
  }
  .show-error {
    border-color: #e16058;
  }
  .contact-email-input {
    margin-top: 16px;
  }
  .contact-email-error {
    color: ${Colors.branding};
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
        label {
          margin-bottom: 10px;
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
      aspect-ratio: 2 / 1;
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
  .form-item {
    margin-bottom: 20;
  }
`;

const CreateEventFormContainer = styled.div`
  background: ${Colors.white};
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
    &.ticket-tab {
      min-height: unset;
      border-top-left-radius: 0px;
      box-shadow: unset;
    }
    .ant-form-item-row {
      display: block;
    }
    .ant-form-item-label > label {
      font-weight: 400;
      color: ${Colors.grey6};
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: 400;
      line-height: 19px;
      height: 19px;
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
      > label.ant-form-item-required:not(
        .ant-form-item-required-mark-optional
      )::before {
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
      aspect-ratio: 2 / 1;
      .ant-upload-btn {
        padding: 0;
      }
      &.ant-upload-drag {
        min-height: unset;
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
    border-radius: 2px;
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
  .eventShortDescription {
    margin-bottom: 40px !important;
  }
  .ant-form-item {
    margin-bottom: 15px;
  }
  .price-free-content {
    margin-top: 5px;
    font-weight: 400;
    font-size: 12px;
    color: rgb(171, 172, 182);
  }
  @media (max-width: 992px) {
    .item-suggest-description {
      margin-bottom: 30px !important;
    }
    .main-box {
      .ant-form-item {
        margin-bottom: 20px;
      }
      .eventShortDescription {
        margin-bottom: 30px;
      }
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
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0 8px;
    .ant-select-selection-item {
      margin-top: 1px;
    }
  }
  .ant-form-item-explain {
    margin-top: 3px;
    font-size: 11px;
    margin-bottom: 6px;
  }
  .ant-input-affix-wrapper,
  .ant-picker {
    border-radius: 2px;
  }
  .ant-input {
    height: 36px;
    border-radius: 2px;
  }
  .ant-radio-button-wrapper {
    height: 38px;
    span:not(.ant-radio-button) {
      position: relative;
      top: -2px;
    }
  }
  .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked) {
    border-color: ${Colors.grey4};
  }
  .ant-radio-button-wrapper:last-child,
  .ant-radio-button-wrapper:first-child {
    border-radius: 0 2px 2px 0;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    line-height: 35px;
  }
  .ticket-price {
    .ant-form-item-explain {
      min-height: 19px;
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

const ImageDragger = styled(Dragger as any)``;

const DraggetForm = styled(Form.Item as any)`
  .ant-upload-list {
    display: none;
  }
`;

const ImagesContainer = styled(Row as any)`
  margin-bottom: 16px;
`;

const ImageItem = styled(Col as any)`
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
    margin-top: 22px;
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
  .form-item {
    margin-bottom: 25;
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

export const SelectEventsTable = styled(Row as any)`
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

export const ModalFooterButton = styled(Button as any)`
  height: 32px;
  min-width: 83px;
  line-height: 11px;
`;

export const TicketList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  gap: 16px;
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
`;
export const TicketListItemDesktop = styled.li`
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 20px;
  width: 100%;
  .banner {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 2px;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.black4};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .label {
    color: ${Colors.grey6};
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 4px;
    margin-top: 20px;
  }
  .value {
    color: ${Colors.black4};
    font-size: 15px;
    font-weight: 500;
  }
`;

export const TicketListItemMobile = styled.li`
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 20px;
  .banner {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 2px;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    color: ${Colors.black4};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 23px;
  }
  .label {
    color: ${Colors.grey6};
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 4px;
    margin-top: 20px;
    margin-top: 12px;
    width: 96%;
  }
  .value {
    color: ${Colors.black4};
    font-size: 15px;
    font-weight: 500;
    margin: 0;
  }
`;

export const TotalAvailableQuantitySold = styled.div`
  color: ${Colors.black};
  font-size: 15px;
  font-weight: 500;
  line-height: 30px;
`;

const PublishComponentContainer = styled(Row as any)`
  .main-box {
    background: ${Colors.white};
    padding: 20px;
    .preview-event {
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      color: ${Colors.branding};
      margin-bottom: 14px;
      > :first-child {
        cursor: pointer;
      }
      > :last-child {
        margin-left: 8px;
        cursor: pointer;
        img {
          margin-top: -2px;
        }
      }
    }
    .set-refund-title {
      margin-top: 24px;
      margin-bottom: 16px;
      .title-label {
        color: ${Colors.black4} !important;
        margin-left: 0 !important;
        &.contact-email-label {
          ::after {
            display: none;
          }
        }
      }
      > :first-child {
        font-size: 17px;
        font-weight: 500;
        line-height: 24px;
        color: ${Colors.black4};
        ::after {
          display: inline-block;
          margin-left: 5px;
          color: rgb(252, 0, 6);
          font-weight: 400;
          font-size: 15px;
          line-height: 1;
          content: '*';
        }
      }
      > :last-child {
        cursor: pointer;
        margin-left: 10px;
        color: ${Colors.grey6};
      }
    }
  }
  @media (max-width: 992px) {
    .main-box {
      .set-refund-title {
        > :first-child {
          font-size: 16px;
        }
      }
    }
  }
`;

const EventInfoCard = styled(Col as any)`
  padding: 20px;
  border-radius: 2px;
  border: 1px solid ${Colors.grey9};
  background: ${Colors.white};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  .event-image {
    background: ${Colors.black};
    img {
      width: 100%;
      aspect-ratio: 2 / 1;
      object-fit: contain;
      border-radius: 2px;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  .info-detail {
    padding-left: 20px;
    .info-detail-name {
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      color: ${Colors.black4};
      margin-bottom: 10px;
    }
    .info-detail-items {
      margin-bottom: 5px;
      display: flex;
      > :first-child {
        margin-right: 5px;
        img {
          margin-top: -4px;
        }
      }
      > :last-child {
        font-size: 13px;
        font-weight: 400;
        line-height: 19px;
        color: ${Colors.black4};
      }
    }
  }
  .event-ticket {
    margin-top: 20px;
    .table-container {
      box-shadow: unset;
      padding: 0;
      .ant-table-body {
        table {
          max-width: 100%;
        }
      }
      .ant-table-ping-right:not(.ant-table-has-fix-right)
        > .ant-table-container::after {
        box-shadow: unset;
      }
      .ant-table-thead {
        th {
          background: ${Colors.white2};
          font-size: 12px;
          font-weight: 700;
          line-height: 18px;
          color: ${Colors.black6};
        }
      }
      .ant-table-tbody {
        > :last-child {
          td {
            border-bottom: 0;
          }
        }
        td {
          font-size: 15px;
          font-weight: 400;
          line-height: 21px;
          color: ${Colors.black6};
          border-bottom: 0.6px solid ${Colors.grey8};
        }
      }
    }
  }
  @media (max-width: 992px) {
    .info-detail {
      padding-left: 0;
      padding-top: 20px;
    }
  }
`;

export const PromoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  gap: 16px;
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
`;

const promoListStyle = `
 box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  padding: 40px 20px 20px 20px;
  width: 100%;
  flex-shrink: 0;
  position: relative;
  .badge {
    background: ${Colors.grey9};
    color: ${Colors.grey6};
    font-size: 14px;
    font-weight: 700;
    padding: 2px 8px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 2px;
  }
  .more-icon{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
  }
  .title{
    color: ${Colors.black4};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 95%;
  }
`;

export const PromoListCode = styled.li`
  ${promoListStyle}
`;

export const PromoListBundle = styled.li`
  ${promoListStyle}
`;

export const LabelAndValueArea = styled(Row as any)``;

export const LabelAndValue = styled(Col as any)`
  .label {
    font-size: 13px;
    font-weight: 400;
    color: ${Colors.grey6};
    margin-top: 16px;
  }
  .value {
    font-size: 15px;
    font-weight: 500;
    color: ${Colors.black4};
    margin-top: 4px;
    span {
      font-weight: 400;
    }
  }
  .table {
    margin-top: 10px;
    .head {
      display: flex;
      justify-content: space-between;
      background: ${Colors.white2};
      gap: 20px;
      .head-item {
        padding: 8px 16px;
        width: 50%;
        font-size: 12px;
        font-weight: 700;
      }
    }
    .body {
      display: flex;
      justify-content: space-between;
      background: ${Colors.white};
      gap: 20px;
      .body-item {
        padding: 8px 16px;
        width: 50%;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
`;

export const ActionTextButton = styled.span`
  color: ${Colors.branding};
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  cursor: pointer;
  margin-bottom: 0;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 1);
  width: calc(100vw - 240px);
  height: 100vh;
  z-index: 11;
  @media (max-width: 996px) {
    left: 0;
    width: 100vw;
    right: unset;
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
  SpinContainer,
  FoldingPanel,
  ConnectTicketsTitle,
  NoSearchResultButton,
  PublishComponentContainer,
  EventInfoCard,
};
