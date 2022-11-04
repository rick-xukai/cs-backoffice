import React, { useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, Radio } from 'antd';

type RequiredMark = boolean | 'optional';

const LayoutsRequiredMark = () => {
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>(true);

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Form Required Mark</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col span={24}>
          <Form
            layout="vertical"
            initialValues={{ requiredMarkValue: requiredMark }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Form.Item label="Required Mark" name="requiredMarkValue">
              <Radio.Group>
                <Radio.Button value>Required</Radio.Button>
                <Radio.Button value="optional">Optional</Radio.Button>
                <Radio.Button value={false}>Hidden</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              required
              label="Field A"
              tooltip="This is a required field"
            >
              <Input placeholder="Input Placeholder" />
            </Form.Item>
            <Form.Item label="Field B" tooltip="This is a optional field">
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
};

export default LayoutsRequiredMark;
