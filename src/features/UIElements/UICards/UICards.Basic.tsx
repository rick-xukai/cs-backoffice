import React from 'react';
import { Row, Col, Card, Button } from 'antd';

const UICardsBasic = ({ t }: { t: any }) => (
  <Card title={t('Default Card')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col sm={8} xs={24}>
        <Card title="Default size card" extra={<Button>More</Button>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col sm={8} xs={24}>
        <Card
          size="small"
          title="Small size card"
          extra={<Button>More</Button>}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col sm={8} xs={24}>
        <Card>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>
  </Card>
);

export default UICardsBasic;
