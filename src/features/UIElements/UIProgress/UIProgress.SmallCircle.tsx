import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressSmallCircle = () => (
  <Card title="Small Circle Progress">
    <Row gutter={[12, 12]}>
      <Col>
        <Progress width={80} type="circle" percent={75} />
      </Col>
      <Col>
        <Progress width={80} type="circle" percent={70} status="exception" />
      </Col>
      <Col>
        <Progress width={80} type="circle" percent={100} />
      </Col>
    </Row>
  </Card>
);

export default UIProgressSmallCircle;
