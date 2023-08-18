import React from 'react';
import { DropDownProps, Dropdown } from 'antd';

import { Container } from './MoreIcon.components';
import { Images } from '../../theme';

const MoreIcon = (props: DropDownProps) => (
  <Dropdown {...props} overlayStyle={{ minWidth: 110 }}>
    <Container>
      <img src={Images.MoreOutlinedIcon} alt="" />
    </Container>
  </Dropdown>
);

export default MoreIcon;
