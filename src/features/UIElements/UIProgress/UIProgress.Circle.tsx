import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressCircle = () => (
  <Card title="Circle Progress">
    <Row gutter={[12, 12]}>
      <Col>
        <Progress type="circle" percent={75} />
      </Col>
      <Col>
        <Progress type="circle" percent={70} status="exception" />
      </Col>
      <Col>
        <Progress type="circle" percent={100} />
      </Col>
    </Row>
  </Card>
);

export default UIProgressCircle;
