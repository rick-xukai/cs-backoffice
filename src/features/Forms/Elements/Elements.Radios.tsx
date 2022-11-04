import React from 'react';
import { Row, Col, Typography, Form, Radio } from 'antd';

const options = ['Apple', 'Pear', 'Orange'];

const ElementsRadios = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Checkboxes</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form
          layout="vertical"
          initialValues={{
            radioGroup: 'Pear',
            buttonRadio: 'Pear',
            smallRadio: 'Orange',
          }}
        >
          <Form.Item label="Default Radio">
            <Radio>Radio</Radio>
          </Form.Item>
          <Form.Item label="Radio Group" name="radioGroup">
            <Radio.Group options={options} />
          </Form.Item>
          <Form.Item label="Button Radio" name="buttonRadio">
            <Radio.Group options={options} optionType="button" />
          </Form.Item>
          <Form.Item label="Small Radio" name="smallRadio">
            <Radio.Group size="small" options={options} optionType="button" />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsRadios;
