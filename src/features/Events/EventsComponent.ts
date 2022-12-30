import styled from 'styled-components';
import { Colors } from '../../theme';

const EventsContainer = styled.div`
  .page-main {
    padding: calc(60px + 24px) 24px 24px;
    background: ${Colors.grey5};
  }
  .name-btn {
    border: none;
    padding: 0;
    height: auto;
    color: ${Colors.branding};
    transition: unset;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
