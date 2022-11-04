import React from 'react';
import moment from 'moment';
import { Row, Col, Typography, Form, TimePicker } from 'antd';

const ElementsTimePickers = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Time Picker</Typography.Title>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form>
          <Form.Item label="Default Picker">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Format Picker">
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item label="Range Picker">
            <TimePicker.RangePicker />
          </Form.Item>
          <Form.Item label="Custom Step">
            <TimePicker minuteStep={15} secondStep={10} />
          </Form.Item>
          <Form.Item label="Disable Picker">
            <TimePicker defaultValue={moment()} disabled />
          </Form.Item>
          <Form.Item label="12 Hours">
            <TimePicker use12Hours />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsTimePickers;
