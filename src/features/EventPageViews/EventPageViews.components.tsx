import React from 'react';

import { ProgressContainer, ProgressInfo } from './EventPageViews.component';

export const ProgressBar = ({
  name,
  count,
  percent,
}: {
  name: string;
  count: number;
  percent: number;
}) => (
  <>
    <ProgressInfo>
      <p className="title">{name}</p>
      <div className="right-info">
        <p className="count">{count}</p>
        <p className="percent">{percent}%</p>
      </div>
    </ProgressInfo>
    <ProgressContainer>
      <div className="content" style={{ width: `${percent || 0}%` }} />
      <div className="line" />
    </ProgressContainer>
  </>
);
