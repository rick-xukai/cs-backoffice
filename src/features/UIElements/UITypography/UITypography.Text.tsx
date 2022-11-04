import React from 'react';
import { Card, Typography, Space } from 'antd';

const { Text, Link } = Typography;

const UITypographyText = () => (
  <Card title="Headings">
    <Space direction="vertical">
      <Text>Ant Design (default)</Text>
      <Text type="secondary">Ant Design (secondary)</Text>
      <Text type="success">Ant Design (success)</Text>
      <Text type="warning">Ant Design (warning)</Text>
      <Text type="danger">Ant Design (danger)</Text>
      <Text disabled>Ant Design (disabled)</Text>
      <Text mark>Ant Design (mark)</Text>
      <Text code>Ant Design (code)</Text>
      <Text keyboard>Ant Design (keyboard)</Text>
      <Text underline>Ant Design (underline)</Text>
      <Text delete>Ant Design (delete)</Text>
      <Text strong>Ant Design (strong)</Text>
      <Text italic>Ant Design (italic)</Text>
      <Link href="https://www.imaginato.com/" target="_blank">
        Imaginato (Link)
      </Link>
    </Space>
  </Card>
);

export default UITypographyText;
