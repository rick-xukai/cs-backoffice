import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { Colors } from '../../theme';

const PrimaryButtonCmp = styled(Button)`
  :disabled {
    background-color: ${Colors.primary};
    opacity: 0.5;
    color: ${Colors.white};
    :hover {
      background-color: ${Colors.primary};
      opacity: 0.5;
      color: ${Colors.white};
    }
  }
`;

const PrimaryButton = (props: any) => (
  <PrimaryButtonCmp type="primary" {...props} />
);

export default PrimaryButton;
