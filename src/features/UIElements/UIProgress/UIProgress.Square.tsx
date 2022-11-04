import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressSquare = () => (
  <Card title="Square Progress">
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Progress strokeLinecap="square" percent={75} />
      </Col>
      <Col>
        <Progress strokeLinecap="square" type="circle" percent={75} />
      </Col>
      <Col>
        <Progress strokeLinecap="square" type="dashboard" percent={75} />
      </Col>
    </Row>
  </Card>
);

export default UIProgressSquare;
