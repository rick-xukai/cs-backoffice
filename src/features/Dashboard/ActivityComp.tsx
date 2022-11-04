import React from 'react';
import { Row, Col, Card, Typography, Timeline } from 'antd';
import {
  RightCircleOutlined,
  RightCircleFilled,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const ActivityComp = () => (
  <Card title={<Title level={5}>Activity</Title>}>
    <Row justify="center" align="top">
      <Timeline style={{ marginTop: '24px' }}>
        <Timeline.Item dot={<RightCircleOutlined className="text-secondary" />}>
          <Row justify="start" align="top">
            <Col span={1}></Col>
            <Col span={4}>
              <Text strong>22 Nov</Text>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <ArrowRightOutlined />
            </Col>
            <Col span={16}>Responded to need “Volunteer Activities</Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item dot={<RightCircleOutlined className="text-secondary" />}>
          <Row justify="start" align="top">
            <Col span={1}></Col>
            <Col span={4}>
              <Text strong>17 Nov</Text>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <ArrowRightOutlined />
            </Col>
            <Col span={16}>
              Everyone realizes why a new common language would be desirable...
              <Link to="/">Read More</Link>
            </Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item dot={<RightCircleOutlined className="text-secondary" />}>
          <Row justify="start" align="top">
            <Col span={1}></Col>
            <Col span={4}>
              <Text strong>15 Nov</Text>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <ArrowRightOutlined />
            </Col>
            <Col span={16}>Joined the group “Boardsmanship Forum”</Col>
          </Row>
        </Timeline.Item>
        <Timeline.Item
          dot={<RightCircleFilled className="text-primary icon-fade-right" />}
        >
          <Row justify="start" align="top">
            <Col span={1}></Col>
            <Col span={4}>
              <Text strong>12 Nov</Text>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <ArrowRightOutlined />
            </Col>
            <Col span={16}>Responded to need “In-Kind Opportunity”</Col>
          </Row>
        </Timeline.Item>
      </Timeline>
    </Row>
  </Card>
);

export default ActivityComp;
