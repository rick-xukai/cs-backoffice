import React from 'react';
import { Row, Col, Card, Button, notification } from 'antd';

const openNotification = (type: 'success' | 'error' | 'info' | 'warning') => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

const UINotificationMethod = () => (
  <Card title="Quick Method">
    <Row gutter={[8, 8]}>
      <Col>
        <Button type="primary" onClick={() => openNotification('success')}>
          Success
        </Button>
      </Col>
      <Col>
        <Button type="primary" danger onClick={() => openNotification('error')}>
          Error
        </Button>
      </Col>
      <Col>
        <Button onClick={() => openNotification('info')}>Info</Button>
      </Col>
      <Col>
        <Button
          style={{ backgroundColor: '#f1b44c', color: '#fff' }}
          onClick={() => openNotification('warning')}
        >
          Warning
        </Button>
      </Col>
    </Row>
  </Card>
);

export default UINotificationMethod;
