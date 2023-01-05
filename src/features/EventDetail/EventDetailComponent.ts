import { Row } from 'antd';
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
    padding: calc(106px + 24px) 24px 24px;
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
`;

const EventInfoContainer = styled(Row)`
  .main-box {
    background: ${Colors.white};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 24px;
    min-height: calc(100vh - 154px);
    .item {
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 15px;
      color: ${Colors.black5};
      .item-key {
        color: ${Colors.grey7};
      }
    }
  }
`;

const TicketTypesContainer = styled.div`
  background: ${Colors.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 24px;
  height: ${(props: TicketTypesContainerProps) => props.containerHight};
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
  }
`;

export { EventDetailContainer, EventInfoContainer, TicketTypesContainer };
