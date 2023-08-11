import styled from 'styled-components';
import { Colors } from '../../theme';

interface TicketTypesContainerProps {
  containerHight: string;
}

const EventDetailContainer = styled.div`
  .ant-spin {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
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
    .edit-event {
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
  .ant-btn[disabled] {
    background: unset;
    color: ${Colors.grey7};
    :hover {
      a {
        text-decoration: unset;
      }
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
  @media (max-width: 992px) {
    .page-main {
      padding: calc(98px + 24px) 15px 15px;
    }
  }
`;

const EventInfoContainer = styled.div`
  .ant-tabs-content-holder {
    height: calc(
      ${(props: TicketTypesContainerProps) => props.containerHight} - 38px
    );
    background: ${Colors.white};
  }
  .main-box {
    background: ${Colors.white};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 24px;
    min-height: calc(100vh - 154px);
    .item {
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 17px;
      color: ${Colors.black5};
      .item-key {
        color: ${Colors.grey6};
        font-size: 15px;
      }
    }
  }
  .event-img,
  .ticket-img {
    margin-top: 6px;
    width: 86px;
    height: 86px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .scanner-link,
  .external-link {
    color: ${Colors.black5};
    text-decoration-line: underline;
  }
`;

const TicketTypesContainer = styled.div`
  padding: 24px;
  background: ${Colors.white};
  .ticket-item-row {
    margin-bottom: 24px;
    .ticket-item-key {
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.grey6};
    }
    .ticket-item-value {
      font-weight: 400;
      font-size: 17px;
      color: ${Colors.black5};
    }
  }
  .ant-upload-list-item-name {
    color: ${Colors.grey6};
  }
  /* background: ${Colors.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 24px;
  .ticket-info {
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    > :last-child {
      border: none;
      margin-bottom: 0;
      > :last-child {
        margin-bottom: 0;
      }
    }
  }
  .title {
    font-weight: 700;
    font-size: 18px;
    color: ${Colors.black};
    padding-left: 8px;
    border-left: 5px solid ${Colors.branding};
    margin-bottom: 24px;
  }
  .item-main {
    margin-bottom: 24px;
    background: rgba(238, 238, 243, 0.5);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 24px;
    .nft-img {
      width: 104px;
      height: 104px;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
  .item {
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 15px;
    color: ${Colors.black5};
    .item-key {
      color: ${Colors.grey7};
    }
  } */
`;

export { EventDetailContainer, EventInfoContainer, TicketTypesContainer };
