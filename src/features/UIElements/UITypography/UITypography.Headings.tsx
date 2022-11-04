import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

const UITypographyHeadings = () => (
  <Card title="Headings">
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
  </Card>
);

export default UITypographyHeadings;
