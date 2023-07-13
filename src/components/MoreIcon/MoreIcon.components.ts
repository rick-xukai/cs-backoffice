import styled from 'styled-components';

import { Colors } from '../../theme';

export const Container = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${Colors.white};
  cursor: pointer;
  :hover {
    background: ${Colors.grey9};
  }
  img {
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;
