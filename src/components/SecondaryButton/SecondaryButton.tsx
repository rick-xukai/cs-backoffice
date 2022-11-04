import styled from 'styled-components';
import { Button } from 'antd';

import { Colors } from '../../theme';

const SecondaryButton = styled(Button)`
  background-color: ${Colors.secondary};
  color: ${Colors.white};
  border-color: ${Colors.secondary};
  :hover {
    background-color: ${Colors.secondaryHover};
    color: ${Colors.white};
    border-color: ${Colors.secondaryHover};
  }
  :active,
  :focus {
    background-color: ${Colors.secondary};
    color: ${Colors.white};
    border-color: ${Colors.secondary};
  }
`;

export default SecondaryButton;
