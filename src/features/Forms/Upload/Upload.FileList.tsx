import React from 'react';
import { Row, Col, Typography, Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadFileList = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Default File List</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload
              name="files"
              action="https://www.example.com"
              defaultFileList={[
                {
                  uid: '1',
                  name: 'xxx.png',
                  status: 'done',
                  url: 'http://www.example.com/xxx.png',
                },
                {
                  uid: '2',
                  name: 'yyy.png',
                  status: 'error',
                  response: 'Server Error 500',
                  url: 'http://www.example.com/yyy.png',
                },
              ]}
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

export default UploadFileList;
