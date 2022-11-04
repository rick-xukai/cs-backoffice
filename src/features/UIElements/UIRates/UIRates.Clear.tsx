import React from 'react';
import { Row, Col, Card, Rate } from 'antd';

const UIRatesClear = () => (
  <Card title="Clear Rate">
    <Row>
      <Col span={24}>
        <Rate defaultValue={3} />
        <span className="ant-rate-text">allowClear: true</span>
      </Col>
      <Col span={24}>
        <Rate allowClear={false} defaultValue={3} />
        <span className="ant-rate-text">allowClear: false</span>
      </Col>
    </Row>
  </Card>
);

export default UIRatesClear;
