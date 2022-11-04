import React from 'react';
import { Row, Col, Typography, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadDirectory = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Upload Directory</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload name="files" action="https://www.example.com" directory>
              <Button icon={<UploadOutlined />}>Upload Directory</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadDirectory;
