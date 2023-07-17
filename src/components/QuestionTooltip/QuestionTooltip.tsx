import React from 'react';
import { Tooltip } from 'antd';

import { Images } from '../../theme';
import { Image } from './QuestionTooltip.component';

const QuestionTooltip = ({ title }: { title: React.ReactNode }) => (
  <Tooltip
    title={title}
    overlayInnerStyle={{
      width: 305,
      fontSize: 13,
      fontWeight: 400,
      padding: 8,
    }}
    placement="right"
  >
    <Image src={Images.QuestionCircleIcon} alt="" />
  </Tooltip>
);
export default QuestionTooltip;
