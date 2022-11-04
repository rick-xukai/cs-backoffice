import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Alert, Divider } from 'antd';

const DividerStyled = styled(Divider)`
  font-size: 14px !important;
  margin: 0 !important;
`;

const UIAlertsClosable = ({ t }: { t: any }) => (
  <Card title={t('Closable Alerts')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col span={24}>
        <Alert message="Info Text" type="info" closable />
      </Col>
      <DividerStyled orientation="left">Customized Close Text</DividerStyled>
      <Col span={24}>
        <Alert
          message="Info Text"
          type="success"
          closable
          closeText="Click here"
        />
      </Col>
    </Row>
  </Card>
);

export default UIAlertsClosable;
