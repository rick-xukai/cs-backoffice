import React from 'react';
import { Row, Col, Card, Button, notification, Divider } from 'antd';
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';

const openNotification = (
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
) => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

const UINotificationPosition = () => (
  <Card title="Position">
    <Row gutter={[8, 8]}>
      <Col>
        <Button type="primary" onClick={() => openNotification('topLeft')}>
          <RadiusUpleftOutlined />
          Top Left
        </Button>
      </Col>
      <Col>
        <Button type="primary" onClick={() => openNotification('topRight')}>
          <RadiusUprightOutlined />
          Top Right
        </Button>
      </Col>
      <Divider style={{ margin: '8px 0' }} />
      <Col>
        <Button type="primary" onClick={() => openNotification('bottomLeft')}>
          <RadiusBottomleftOutlined />
          BottomLeft
        </Button>
      </Col>
      <Col>
        <Button type="primary" onClick={() => openNotification('bottomRight')}>
          <RadiusBottomrightOutlined />
          BottomRight
        </Button>
      </Col>
    </Row>
  </Card>
);

export default UINotificationPosition;
