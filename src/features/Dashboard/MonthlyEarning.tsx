import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import { ArrowUpOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Liquid } from '@ant-design/charts';

import PrimaryButton from '../../components/PrimaryButton';

const { Title, Text } = Typography;

const ChartConfig = {
  percent: 0.25,
  outline: {
    border: 4,
    distance: 8,
  },
  wave: { length: 128 },
  width: 150,
  height: 150,
};

const MonthlyEarningCmp = () => (
  <Card title={<Title level={5}>Monthly Earning</Title>}>
    <Row justify="start" align="top" gutter={[24, 24]}>
      <Col sm={12} xs={24}>
        <p>
          <Text type="secondary" style={{ marginBottom: '16px' }}>
            This month
          </Text>
        </p>
        <p>
          <Text strong style={{ fontSize: '24px' }}>
            $13,252
          </Text>
        </p>
        <div style={{ marginBottom: '16px' }}>
          <Space size={4}>
            <Text className="text-success">12%</Text>
            <ArrowUpOutlined className="text-success" />
          </Space>
          <Text type="secondary" style={{ marginLeft: '12px' }}>
            From previous period
          </Text>
        </div>
        <PrimaryButton size="small">
          View More
          <ArrowRightOutlined />
        </PrimaryButton>
      </Col>
      <Col sm={12} xs={24}>
        <Liquid {...ChartConfig} />
      </Col>
    </Row>
  </Card>
);

export default MonthlyEarningCmp;
