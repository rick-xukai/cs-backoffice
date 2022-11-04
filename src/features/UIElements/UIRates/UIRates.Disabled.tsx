import React from 'react';
import { Card, Rate } from 'antd';

const UIRatesDisabled = () => (
  <Card title="Disabled Rate">
    <Rate disabled defaultValue={2} />
  </Card>
);

export default UIRatesDisabled;
