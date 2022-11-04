import React from 'react';
import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import {
  TwitterOutlined,
  ArrowRightOutlined,
  WechatOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const socials = [
  {
    title: 'Twitter',
    icon: <Avatar className="bg-info" icon={<TwitterOutlined />} size={32} />,
    description: '125',
  },
  {
    title: 'Wechat',
    icon: <Avatar className="bg-success" icon={<WechatOutlined />} size={32} />,
    description: '112',
  },
  {
    title: 'Instagram',
    icon: <Avatar className="bg-pink" icon={<InstagramOutlined />} size={32} />,
    description: '104',
  },
];

const Social = () => (
  <Card title={<Title level={5}>Social Source</Title>}>
    <Row justify="center" align="top" style={{ marginBottom: '24px ' }}>
      <Avatar
        icon={<TwitterOutlined className="text-info" />}
        className="bg-info bg-soft"
        size={48}
      />
    </Row>
    <Row justify="center" align="middle">
      <Col span={24} style={{ textAlign: 'center' }}>
        <Title level={4}>
          Twitter - <Text type="secondary">300 sales</Text>
        </Title>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Text type="secondary" style={{ textAlign: 'center' }}>
          Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut
          libero venenatis faucibus tincidunt.
        </Text>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Link to="/">
          <Space size={4}>
            Learn More
            <ArrowRightOutlined />
          </Space>
        </Link>
      </Col>
    </Row>
    <Row justify="center" align="top" style={{ marginTop: '24px' }}>
      {socials.map((s) => (
        <Col key={`social-${s.title}`} span={8} style={{ textAlign: 'center' }}>
          <Space direction="vertical" size={16}>
            {s.icon}
            <Title level={5}>{s.title}</Title>
          </Space>
          <div>
            <Text type="secondary">{s.description} sales</Text>
          </div>
        </Col>
      ))}
    </Row>
  </Card>
);

export default Social;
