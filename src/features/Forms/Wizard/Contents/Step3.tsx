import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';

const cardOptions = [
  {
    label: 'American Express',
    value: 'AE',
  },
  {
    label: 'Visa',
    value: 'VI',
  },
  {
    label: 'MasterCard',
    value: 'MC',
  },
  {
    label: 'Discover',
    value: 'DI',
  },
];

const Step3 = () => (
  <Row gutter={[24, 8]}>
    <Col span={24} md={12}>
      <Form.Item label="Name On Card" name="nameOnCard">
        <Input placeholder="Name On Card" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Credit Card Type" name="creditCardType">
        <Select options={cardOptions} placeholder="Select Card Type" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Credit Card Number" name="creditCardNumber">
        <Input placeholder="Credit Card Number" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Card Verification Number" name="cardVerificationNumber">
        <Input placeholder="Card Verification Number" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Expiration Date" name="expirationDate">
        <Input placeholder="Expiration Date" />
      </Form.Item>
    </Col>
  </Row>
);

export default Step3;
