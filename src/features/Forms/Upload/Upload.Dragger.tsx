import React from 'react';
import { Row, Col, Typography, Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadDragger = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Dragger</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload.Dragger
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
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadDragger;
