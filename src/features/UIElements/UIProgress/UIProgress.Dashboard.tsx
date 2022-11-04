import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressDashboard = () => (
  <Card title="Dashboard Progress">
    <Row gutter={[12, 12]}>
      <Col>
        <Progress type="dashboard" percent={75} />
      </Col>
      <Col>
        <Progress type="dashboard" percent={75} gapDegree={30} />
      </Col>
    </Row>
  </Card>
);

export default UIProgressDashboard;
