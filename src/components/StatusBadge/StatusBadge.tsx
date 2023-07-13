import React from 'react';

import { StatusBadgeType, Wrapper } from './StatusBadge.component';

const StatusBadge = ({
  status = 'default',
  text,
}: {
  status?: StatusBadgeType;
  text: string;
}) => (
  <Wrapper status={status}>
    <div className="circle" />
    <p>{text}</p>
  </Wrapper>
);

export default StatusBadge;
