import React from 'react';
import { Row, Col, Card, Alert, Space, Button } from 'antd';

const UIAlertsClosable = ({ t }: { t: any }) => (
  <Card title={t('Custom Action Alerts')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col span={24}>
        <Alert
          message="Info Text"
          type="info"
          closable
          action={
            <Space direction="vertical">
              <Button size="small" type="primary">
                Accept
              </Button>
              <Button size="small" danger type="ghost">
                Decline
              </Button>
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <Alert
          message="Success Tips"
          type="success"
          closable
          showIcon
          action={
            <Button size="small" type="text">
              UNDO
            </Button>
          }
        />
      </Col>
    </Row>
  </Card>
);

export default UIAlertsClosable;
