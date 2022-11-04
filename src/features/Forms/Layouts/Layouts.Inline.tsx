import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';

const LayoutsGrid = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Form Inline Layout</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form layout="inline">
          <Form.Item label="Field A" style={{ margin: 8 }}>
            <Input placeholder="Input Placeholder" />
          </Form.Item>
          <Form.Item label="Field B" style={{ margin: 8 }}>
            <Input placeholder="Input placeholder" />
          </Form.Item>
          <Form.Item style={{ margin: 8 }}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default LayoutsGrid;
