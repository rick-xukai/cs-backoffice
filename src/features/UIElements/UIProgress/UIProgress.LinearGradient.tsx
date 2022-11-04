import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressLinearGradient = () => (
  <Card title="Linear Gradient">
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Progress
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={99.9}
        />
      </Col>
      <Col span={24}>
        <Progress
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          percent={99.9}
          status="active"
        />
      </Col>
      <Col>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={90}
        />
      </Col>
      <Col>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={100}
        />
      </Col>
    </Row>
  </Card>
);

export default UIProgressLinearGradient;
