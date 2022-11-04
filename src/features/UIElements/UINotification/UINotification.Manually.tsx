import React from 'react';
import { Card, Button, notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    duration: 0,
  });
};

const UINotificationManually = () => (
  <Card title="Manually Close">
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  </Card>
);

export default UINotificationManually;
