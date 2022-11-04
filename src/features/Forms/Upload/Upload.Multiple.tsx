import React from 'react';
import { Row, Col, Typography, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadMultiple = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>
          Upload Multiple Files Once Time
        </Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload name="files" action="https://www.example.com" multiple>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadMultiple;
