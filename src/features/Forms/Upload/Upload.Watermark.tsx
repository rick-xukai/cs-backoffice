import React from 'react';
import { Row, Col, Typography, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadWatermark = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Add Watermark</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form>
          <Form.Item>
            <Upload
              name="files"
              action="https://www.example.com"
              accept=".png,.jpg,.jpeg"
              listType="picture"
              beforeUpload={(file) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const img: HTMLImageElement = document.createElement('img');
                    if (typeof reader.result === 'string') {
                      img.src = reader.result;
                    }
                    img.onload = () => {
                      const canvas: HTMLCanvasElement =
                        document.createElement('canvas');
                      canvas.width = img.naturalWidth;
                      canvas.height = img.naturalHeight;
                      const ctx: CanvasRenderingContext2D | null =
                        canvas.getContext('2d');
                      if (ctx) {
                        ctx.drawImage(img, 0, 0);
                        ctx.fillStyle = 'red';
                        ctx.textBaseline = 'middle';
                        ctx.font = '33px Arial';
                        ctx.fillText('Imaginato', 20, 20);
                      }
                      canvas.toBlob((result) => {
                        if (result) resolve(result);
                        else reject();
                      });
                    };
                  };
                })
              }
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default UploadWatermark;
