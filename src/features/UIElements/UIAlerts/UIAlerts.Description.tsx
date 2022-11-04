import React from 'react';
import { Row, Col, Card, Alert } from 'antd';

const UIAlertsDescription = ({ t }: { t: any }) => (
  <Card title={t('Description Alerts')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col span={24}>
        <Alert
          message="Info Text"
          type="info"
          description="Info Description Info Description Info Description"
        />
      </Col>
      <Col span={24}>
        <Alert
          message="Success Text"
          type="success"
          description="Success Description Success Description Success Description"
        />
      </Col>
      <Col span={24}>
        <Alert
          message="Warning Text"
          type="warning"
          description="Warning Description Warning Description Warning Description"
        />
      </Col>
      <Col span={24}>
        <Alert
          message="Error Text"
          type="error"
          description="Error Description Error Description Error Description"
        />
      </Col>
    </Row>
  </Card>
);

export default UIAlertsDescription;
