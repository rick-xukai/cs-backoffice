import React from 'react';
import { Row, Col, Typography, Form, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const ElementsSwitches = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Switches</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item label="Default Switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Small Switch">
            <Switch size="small" />
          </Form.Item>
          <Form.Item label="Loading Switch">
            <Switch defaultChecked loading />
          </Form.Item>
          <Form.Item label="Switch With Text">
            <Switch
              checkedChildren="Open"
              unCheckedChildren="Close"
              defaultChecked
            />
          </Form.Item>
          <Form.Item label="Switch With Icon">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsSwitches;
