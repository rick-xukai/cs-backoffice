import React from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
} from 'antd';
import moment from 'moment';

const ElementsInputs = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Textual inputs</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form
          initialValues={{
            text: 'Artisanal kale',
            search: 'How do I shoot web',
            email: 'imgn@example.com',
            url: 'https://ui.imgn.to/',
            telephone: '1-(555)-555-5555',
            password: 'hunter2',
            number: 42,
            dateAndTime: moment(),
            date: moment(),
            quarter: moment(),
            month: moment(),
            week: moment(),
            time: moment(),
            select: 'lucy',
          }}
        >
          <Form.Item label="Text" name="text">
            <Input />
          </Form.Item>
          <Form.Item label="Search" name="search">
            <Input.Search allowClear />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="URL" name="url">
            <Input type="url" />
          </Form.Item>
          <Form.Item label="Telephone" name="telephone">
            <Input type="tel" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Number" name="number">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Date and time" name="dateAndTime">
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Quarter" name="quarter">
            <DatePicker picker="quarter" />
          </Form.Item>
          <Form.Item label="Month" name="month">
            <DatePicker picker="month" />
          </Form.Item>
          <Form.Item label="Week" name="week">
            <DatePicker picker="week" />
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsInputs;
