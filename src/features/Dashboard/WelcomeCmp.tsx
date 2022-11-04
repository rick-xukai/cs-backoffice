import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import Images from '../../theme/Images';
import Avatar from '../../components/Avatar';
import PrimaryButton from '../../components/PrimaryButton';

const { Title, Text } = Typography;

const WelcomeCard = styled(Card)`
  .ant-card-head {
    padding: 0;
    border: none;
    .ant-card-head-title {
      padding: 0;
    }
  }
  .bg-primary {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .cart-title {
    padding: 24px;
    color: var(--primary-color);
    h5 {
      color: var(--primary-color);
    }
    p {
      font-size: 14px;
    }
  }
  .ant-avatar {
    margin-top: -60px;
    margin-bottom: 24px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

const CardTitle = () => (
  <div className="bg-primary bg-soft">
    <Row justify="start">
      <Col span={14} className="cart-title">
        <Title level={5}>Welcome to Imaginato!</Title>
        <p>Imaginato Dashboard</p>
      </Col>
      <Col span={10}>
        <img
          className="img-fluid "
          src={Images.dashboard.ProfileImg}
          alt="profile img"
        />
      </Col>
    </Row>
  </div>
);

const WelcomeCmp = () => (
  <WelcomeCard title={<CardTitle />}>
    <Row justify="center" align="top" gutter={[12, 12]}>
      <Col sm={8} xs={24}>
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          size={72}
        />
        <Title level={5}>Jon Snow</Title>
        <Text type="secondary">Frontend Developer</Text>
      </Col>
      <Col sm={16} xs={24}>
        <Row>
          <Col sm={12} xs={12}>
            <Row justify="start" align="middle">
              <Title level={5}>321</Title>
            </Row>
            <Row>
              <Text type="secondary">Projects</Text>
            </Row>
          </Col>
          <Col sm={12} xs={12}>
            <Row justify="start" align="middle">
              <Title level={5}>$10,486</Title>
            </Row>
            <Row>
              <Text type="secondary">Revenue</Text>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '24px' }}>
          <Col span={24}>
            <PrimaryButton size="small">
              View Profile
              <ArrowRightOutlined />
            </PrimaryButton>
          </Col>
        </Row>
      </Col>
    </Row>
  </WelcomeCard>
);

export default WelcomeCmp;
