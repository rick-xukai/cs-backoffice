import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';

const LayoutsGrid = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Form Horizontal Layout</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form layout="horizontal">
          <Form.Item label="Field A">
            <Input placeholder="Input Placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default LayoutsGrid;
