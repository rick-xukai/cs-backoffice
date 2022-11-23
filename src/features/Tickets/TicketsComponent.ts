import styled from 'styled-components';
import { Colors } from '../../theme';

const TicketsContainer = styled.div`
  padding: 24px;
  background: ${Colors.white};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
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
  .email {
    cursor: pointer;
    max-width: 210px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export { TicketsContainer };
