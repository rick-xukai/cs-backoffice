import styled from 'styled-components';
import { Colors } from '../../theme';

const TicketsContainer = styled.div`
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
    :hover {
      a {
        text-decoration: underline;
      }
    }
  }
`;

export { TicketsContainer };
