import React from 'react';
import { Card, Rate } from 'antd';

const UIRatesHalf = () => (
  <Card title="Allow Half">
    <Rate allowHalf defaultValue={2.5} />
  </Card>
);

export default UIRatesHalf;
