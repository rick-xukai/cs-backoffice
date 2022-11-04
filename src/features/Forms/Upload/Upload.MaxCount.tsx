import React from 'react';
import { Row, Col, Typography, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadMaxCount = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Upload 1 File</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload name="files" action="https://www.example.com" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadMaxCount;
