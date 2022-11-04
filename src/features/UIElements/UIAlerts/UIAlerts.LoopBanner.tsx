import React from 'react';
import { Row, Col, Card, Alert } from 'antd';
import { TextLoop } from 'react-text-loop-next';
import Marquee from 'react-fast-marquee';

const UIAlertsBasic = ({ t }: { t: any }) => (
  <Card title={t('Loop Banner Alerts')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col span={24}>
        <Alert
          banner
          message={
            <TextLoop mask>
              <div>Notice message one</div>
              <div>Notice message two</div>
              <div>Notice message three</div>
              <div>Notice message four</div>
            </TextLoop>
          }
        />
      </Col>
      <Col span={24}>
        <Alert
          banner
          message={
            <Marquee pauseOnHover gradient={false}>
              I can be a React component, multiple React components, or just
              some text.
            </Marquee>
          }
        />
      </Col>
    </Row>
  </Card>
);

export default UIAlertsBasic;
