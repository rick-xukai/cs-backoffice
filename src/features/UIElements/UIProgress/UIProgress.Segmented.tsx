import React from 'react';
import { Row, Col, Card, Progress, Tooltip } from 'antd';

const UIProgressSegmented = () => (
  <Card title="Segmented Progress">
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Tooltip title="3 done / 3 in progress / 4 to do">
          <Progress percent={60} success={{ percent: 30 }} />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="3 done / 3 in progress / 4 to do">
          <Progress percent={60} success={{ percent: 30 }} type="circle" />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="3 done / 3 in progress / 4 to do">
          <Progress percent={60} success={{ percent: 30 }} type="dashboard" />
        </Tooltip>
      </Col>
    </Row>
  </Card>
);

export default UIProgressSegmented;
