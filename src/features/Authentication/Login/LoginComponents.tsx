import styled from 'styled-components';

import { Colors } from '../../../theme';

export const RememberMe = styled.div`
  color: ${Colors.black4};
  font-size: 15px;
  font-family: Heebo;
`;

export const ForGotPassword = styled.div`
  color: ${Colors.branding};
  font-size: 15px;
  font-family: Heebo;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
