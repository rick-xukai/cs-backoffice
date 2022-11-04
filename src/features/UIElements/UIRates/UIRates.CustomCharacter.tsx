import React from 'react';
import { Row, Col, Card, Rate } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const UIRatesCustomCharacter = () => (
  <Card title="Custom Character">
    <Row>
      <Col span={24}>
        <Rate character={<HeartOutlined />} allowHalf />
      </Col>
      <Col span={24}>
        <Rate character="A" allowHalf style={{ fontSize: 32 }} />
      </Col>
    </Row>
  </Card>
);

export default UIRatesCustomCharacter;
