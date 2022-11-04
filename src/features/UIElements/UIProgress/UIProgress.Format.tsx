import React from 'react';
import { Row, Col, Card, Progress } from 'antd';

const UIProgressFormat = () => (
  <Card title="Format Progress">
    <Row gutter={[12, 12]}>
      <Col>
        <Progress
          type="circle"
          percent={75}
          format={(percent) => `${percent} Days`}
        />
      </Col>
      <Col>
        <Progress type="circle" percent={100} format={() => 'Done'} />
      </Col>
    </Row>
  </Card>
);

export default UIProgressFormat;
