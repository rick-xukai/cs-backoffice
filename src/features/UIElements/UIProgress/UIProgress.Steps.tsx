import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressSteps = () => (
  <Card title="Steps Progress">
    <Row>
      <Col span={24}>
        <Progress percent={50} steps={10} />
      </Col>
      <Col span={24}>
        <Progress percent={80} steps={20} size="small" strokeColor="#52c41a" />
      </Col>
    </Row>
  </Card>
);

export default UIProgressSteps;
