import React, { useState } from 'react';
import { Card, Rate } from 'antd';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

const UIRatesDisplayText = () => {
  const [value, setValue] = useState(3);

  return (
    <Card title="Display Text">
      <span>
        <Rate tooltips={desc} onChange={(v) => setValue(v)} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    </Card>
  );
};

export default UIRatesDisplayText;
