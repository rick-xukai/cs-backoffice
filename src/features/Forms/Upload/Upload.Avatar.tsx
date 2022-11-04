import React, { useState } from 'react';
import { Row, Col, Typography, Form, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Uploader = styled.div`
  .ant-upload {
    flex-direction: column;
  }
`;
const UploadText = styled.div`
  margin-top: 8px;
`;

const UploadAvatar = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Upload Avatar</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col span={24}>
          <Form>
            <Form.Item>
              <Uploader>
                <Upload
                  name="files"
                  action="https://www.example.com"
                  accept=".png,.jpg,.jpeg,.svg,.gif"
                  listType="picture-card"
                  onChange={(info) => {
                    if (info.file.status === 'uploading') {
                      setLoading(true);
                    }
                    if (info.file.status === 'done') {
                      setLoading(false);
                      message.success(
                        `${info.file.name} file uploaded successfully`,
                      );
                    } else if (info.file.status === 'error') {
                      setLoading(false);
                      message.error(`${info.file.name} file upload failed.`);
                    }
                  }}
                >
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <UploadText>Upload</UploadText>
                </Upload>
              </Uploader>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UploadAvatar;
