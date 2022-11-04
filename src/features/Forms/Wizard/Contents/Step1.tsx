import React from 'react';
import { Row, Col, Form, Input } from 'antd';

const Step1 = () => (
  <Row gutter={[24, 8]}>
    <Col span={24} md={12}>
      <Form.Item label="First Name" name="firstName">
        <Input placeholder="First Name" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Last Name" name="lastName">
        <Input placeholder="Last Name" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Phone" name="phone">
        <Input placeholder="Phone" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item label="Address" name="address">
        <Input.TextArea placeholder="Input Address" />
      </Form.Item>
    </Col>
  </Row>
);

export default Step1;
