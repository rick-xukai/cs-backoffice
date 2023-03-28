import styled from 'styled-components';
import { Colors } from '../../theme';

const EventsContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
    .create-event {
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

export { EventsContainer };
