import React from 'react';
import { Row, Col, Typography, Form, Input } from 'antd';

const ElementsSizing = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Sizing</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item label="Default input">
            <Input placeholder="Default input" />
          </Form.Item>
          <Form.Item label="Small Input">
            <Input size="small" placeholder={`size="small"`} />
          </Form.Item>
          <Form.Item label="Large Input">
            <Input size="large" placeholder={`size="large"`} />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsSizing;
