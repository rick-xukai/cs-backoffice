import React from 'react';
import { Row, Col, Card, Alert } from 'antd';

const UIAlertsBasic = ({ t }: { t: any }) => (
  <Card title={t('Default Alerts')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col span={24}>
        <Alert message="Info Text" type="info" />
      </Col>
      <Col span={24}>
        <Alert message="Success Text" type="success" />
      </Col>
      <Col span={24}>
        <Alert message="Warning Text" type="warning" />
      </Col>
      <Col span={24}>
        <Alert message="Error Text" type="error" />
      </Col>
    </Row>
  </Card>
);

export default UIAlertsBasic;
