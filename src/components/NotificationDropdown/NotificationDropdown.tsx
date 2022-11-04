import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Dropdown,
  Button,
  Badge,
  Typography,
  Row,
  Col,
  Space,
  Card,
  Avatar,
} from 'antd';
import {
  BellOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';

const { Title } = Typography;
const { Meta } = Card;

const NotificationListCmp = styled.div`
  background-color: var(--white-color);
  min-width: 160px;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
  border: 0 solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  .header {
    padding: 12px 16px;
    h5 {
      font-size: 14px;
    }
    a {
      font-size: 12px;
    }
  }
  .footer {
    padding: 12px 8px 8px;
    border-top: 1px solid var(--gray-200-color);
    text-align: center;
    h5 {
      font-size: 14px;
    }
  }
  .notif-item {
    .ant-card-body {
      padding: 12px 16px;
      .ant-card-meta-title {
        font-size: 14px;
        margin-bottom: 4px;
      }
      .ant-card-meta-description {
        font-size: 12px;
        line-height: 1.5;
      }
    }
    :hover {
      background-color: var(--gray-300-color);
    }
  }
  @media (min-width: 600px) {
    width: 320px;
  }
`;

const NotificationDropdown = () => {
  const { t } = useTranslation();
  const NotificationList = () => (
    <NotificationListCmp>
      <Row className="header" justify="space-between">
        <Col flex="">
          <Title level={5}>{t('Notifications')}</Title>
        </Col>
        <Col>
          <Link to="/">{t('View all')}</Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SimpleBar style={{ height: '230px' }}>
            <Link to="/">
              <Card className="notif-item" bordered={false}>
                <Meta
                  avatar={
                    <Avatar
                      icon={<ShoppingCartOutlined />}
                      style={{ color: '#fff', backgroundColor: '#ed9617' }}
                    />
                  }
                  title="Your order is placed"
                  description={
                    <div>
                      <p>If several languages coalesce the grammar</p>
                      <p>
                        <Space size={2}>
                          <ClockCircleOutlined />3 min ago
                        </Space>
                      </p>
                    </div>
                  }
                />
              </Card>
            </Link>
            <Link to="/">
              <Card className="notif-item" bordered={false}>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="James Lemire"
                  description={
                    <div>
                      <p>It will seem like simplified English.</p>
                      <p>
                        <Space size={2}>
                          <ClockCircleOutlined />1 hours ago
                        </Space>
                      </p>
                    </div>
                  }
                />
              </Card>
            </Link>
            <Link to="/">
              <Card className="notif-item" bordered={false}>
                <Meta
                  avatar={
                    <Avatar
                      icon={<CheckCircleOutlined />}
                      style={{ color: '#fff', backgroundColor: '#34c38f' }}
                    />
                  }
                  title="Your item is shipped"
                  description={
                    <div>
                      <p>If several languages coalesce the grammar</p>
                      <p>
                        <Space size={2}>
                          <ClockCircleOutlined />2 hours ago
                        </Space>
                      </p>
                    </div>
                  }
                />
              </Card>
            </Link>
            <Link to="/">
              <Card className="notif-item" bordered={false}>
                <Meta
                  avatar={
                    <Avatar style={{ backgroundColor: '#f56a00' }}>S</Avatar>
                  }
                  title="Salena Layfield"
                  description={
                    <div>
                      <p>As a skeptical Cambridge friend of mine occidental.</p>
                      <p>
                        <Space size={2}>
                          <ClockCircleOutlined />3 hours ago
                        </Space>
                      </p>
                    </div>
                  }
                />
              </Card>
            </Link>
          </SimpleBar>
        </Col>
      </Row>
      <Row className="footer" justify="center">
        <Col span={24}>
          <Title level={5}>
            <Link style={{ display: 'block' }} to="/">
              <Space size={4}>
                <RightCircleOutlined />
                <span>{t('View all')}</span>
              </Space>
            </Link>
          </Title>
        </Col>
      </Row>
    </NotificationListCmp>
  );
  return (
    <Dropdown
      overlay={NotificationList}
      placement="bottomRight"
      trigger={['click']}
    >
      <Badge
        count={99}
        overflowCount={10}
        offset={[-5, 6]}
        style={{ zIndex: 1 }}
      >
        <Button
          className="icon-btn icon icon-tada"
          icon={<BellOutlined />}
          size="large"
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationDropdown;
