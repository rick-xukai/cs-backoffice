import React from 'react';
import { Card, Button, notification } from 'antd';

const openNotification = () => {
  const key = 'updateAble';

  notification.open({
    key,
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });

  setTimeout(() => {
    notification.open({
      key,
      message: 'New Title',
      description: 'New description.',
    });
  }, 1000);
};

const UINotificationUpdate = () => (
  <Card title="Update By Key">
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  </Card>
);

export default UINotificationUpdate;
