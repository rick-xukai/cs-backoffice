import React from 'react';
import { Row, Col, Typography, Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadBasic = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Base Upload</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload
              name="files"
              action="https://www.example.com"
              onChange={(info) => {
                if (info.file.status === 'done') {
                  message.success(
                    `${info.file.name} file uploaded successfully`,
                  );
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadBasic;
