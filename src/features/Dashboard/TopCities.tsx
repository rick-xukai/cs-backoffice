import React from 'react';
import { Row, Col, Card, Typography, Avatar, Divider, Progress } from 'antd';
import { DingtalkOutlined } from '@ant-design/icons';

import Colors from '../../theme/Colors';

const { Title, Text } = Typography;

const cities = [
  {
    title: 'San Francisco',
    sales: '1,456',
    process: 90,
    strokeColor: Colors.primary,
  },
  {
    title: 'Los Angeles',
    sales: '1,123',
    process: 86,
    strokeColor: '#34c38f',
  },
  {
    title: 'San Diego',
    sales: '1,056',
    process: 70,
    strokeColor: Colors.primary,
  },
];

const TopCities = () => (
  <Card title={<Title level={5}>Top Cities Selling Product</Title>}>
    <Row justify="center" align="top" style={{ marginBottom: '24px ' }}>
      <Avatar
        icon={<DingtalkOutlined className="text-primary" />}
        className="bg-primary bg-soft"
        size={56}
      />
    </Row>
    <Row justify="center" align="middle">
      <Col span={24} style={{ textAlign: 'center' }}>
        <Title level={4}>1,456 sales</Title>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Text type="secondary" style={{ textAlign: 'center' }}>
          San Francisco
        </Text>
      </Col>
    </Row>
    <Row justify="center" align="top" style={{ marginTop: '24px' }}>
      {cities.map((c, i) => (
        <Col key={`topCity-${i}`} span={24}>
          <Row justify="start" align="middle">
            <Col span={8}>
              <Text>{c.title}</Text>
            </Col>
            <Col span={6}>
              <Title level={5} style={{ marginBottom: 0 }}>
                {c.sales}
              </Title>
            </Col>
            <Col span={10}>
              <Progress
                showInfo={false}
                percent={c.process}
                strokeColor={c.strokeColor}
                size="small"
              />
            </Col>
          </Row>
          <Divider style={{ margin: '12px 0' }} />
        </Col>
      ))}
    </Row>
  </Card>
);

export default TopCities;
