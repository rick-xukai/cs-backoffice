import React from 'react';
import styled from 'styled-components';

import { Colors, Images } from '../../theme';

const Wrapper = styled.div`
  width: 50px;
  margin: 20px auto 0 auto;
  img {
    display: block;
    margin: auto;
    margin-bottom: 4px;
  }
  p {
    margin: 0;
    color: ${Colors.grey7};
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    text-aligin: center;
  }
`;

const NoData = () => (
  <Wrapper>
    <img src={Images.NoDataIcon} alt="" />
    <p>No Data</p>
  </Wrapper>
);
export default NoData;
