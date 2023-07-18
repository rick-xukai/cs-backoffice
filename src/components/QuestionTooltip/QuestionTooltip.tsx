import React from 'react';
import { Tooltip, Grid } from 'antd';

import { Images } from '../../theme';
import { Image } from './QuestionTooltip.component';

const { useBreakpoint } = Grid;

const QuestionTooltip = ({ title }: { title: React.ReactNode }) => {
  const { md } = useBreakpoint();
  return (
    <Tooltip
      title={title}
      overlayInnerStyle={{
        width: md ? 305 : 280,
        fontSize: 13,
        fontWeight: 400,
        padding: 8,
      }}
      placement={md ? 'right' : 'topLeft'}
    >
      <Image src={Images.QuestionCircleIcon} alt="" />
    </Tooltip>
  );
};
export default QuestionTooltip;
