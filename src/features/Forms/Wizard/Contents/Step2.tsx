import React from 'react';
import { Row, Col, Form, Input } from 'antd';

const Step2 = () => (
  <Row gutter={[24, 8]}>
    <Col span={24} md={12}>
      <Form.Item label="PAN Card" name="panCard">
        <Input placeholder="PAN Card" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="VAT/TIN No." name="vatTinNo">
        <Input placeholder="VAT/TIN No." />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="CST No." name="cstNo">
        <Input placeholder="CST No." />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Service Tax No." name="serviceTaxNo">
        <Input placeholder="Service Tax No." />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Company UIN" name="companyUin">
        <Input placeholder="Company UIN" />
      </Form.Item>
    </Col>
    <Col span={24} md={12}>
      <Form.Item label="Declaration" name="declaration">
        <Input placeholder="Declaration" />
      </Form.Item>
    </Col>
  </Row>
);

export default Step2;
