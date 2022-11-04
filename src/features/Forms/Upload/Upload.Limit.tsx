import React from 'react';
import { Row, Col, Typography, Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadLimit = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>PNG Image</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload
              name="files"
              action="https://www.example.com"
              accept=".png"
              beforeUpload={(file) => {
                if (file.type !== 'image/png') {
                  message.error(`${file.name} is not a png file`);
                }
                return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload png only</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadLimit;
