import React from 'react';
import { Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import { EyeOutlined } from '@ant-design/icons';

import { Images } from '../../theme';
import { PasswordMaxLength } from '../../constants/constants';

const PasswordInput = (props: PasswordProps) => (
  <Input.Password
    {...props}
    maxLength={PasswordMaxLength}
    iconRender={(visible) =>
      (!visible && (
        <img src={Images.PasswordHidden} alt="" style={{ cursor: 'pointer' }} />
      )) || <EyeOutlined />
    }
  />
);

export default PasswordInput;
