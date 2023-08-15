import React from 'react';
import styled from 'styled-components';

import { Images } from '../../theme';

const Content = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
`;
const BallLoading = () => <Content src={Images.LoadingBall} alt="loading" />;

export default BallLoading;
