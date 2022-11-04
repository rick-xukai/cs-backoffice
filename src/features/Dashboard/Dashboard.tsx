import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader, Card, Typography, Avatar } from 'antd';
import {
  DatabaseFilled,
  ShoppingFilled,
  CreditCardFilled,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../navigation/Routes';
import { Colors } from '../../theme';
import WelcomeCmp from './WelcomeCmp';
import MonthlyEarningCmp from './MonthlyEarning';
import StackedColumnChart from './StackedColumnChart';
import Social from './Social';
import ActivityComp from './ActivityComp';
import TopCities from './TopCities';
import LatestTransactions from './LatestTranaction';

const { Title, Text } = Typography;

const reports = [
  {
    title: 'Orders',
    icon: (
      <Avatar
        style={{ backgroundColor: Colors.primary }}
        size={48}
        icon={<DatabaseFilled />}
      />
    ),
    description: '3,235',
  },
  {
    title: 'Revenue',
    icon: (
      <Avatar
        style={{ backgroundColor: Colors.primary }}
        size={48}
        icon={<ShoppingFilled />}
      />
    ),
    description: '$951, 723',
  },
  {
    title: 'Average Price',
    icon: (
      <Avatar
        style={{ backgroundColor: Colors.primary }}
        size={48}
        icon={<CreditCardFilled />}
      />
    ),
    description: '$126.2',
  },
];

const Dashboard = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.home,
      breadcrumbName: t('Dashboards'),
    },
    {
      path: UserRoutes.dashboard,
      breadcrumbName: t('Dashboard'),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{`${t('Dashboard')} | CrowdServe BO`}</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <PageHeader title={t('Dashboard')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col xl={8}>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <WelcomeCmp />
                  </Col>
                  <Col span={24}>
                    <MonthlyEarningCmp />
                  </Col>
                </Row>
              </Col>
              <Col xl={16} span={24}>
                <Row justify="center" gutter={24}>
                  {reports.map((report, i) => (
                    <Col span={24} md={8} key={`report-${i}`}>
                      <Card title={null} style={{ marginBottom: '24px' }}>
                        <Row justify="space-between" align="middle">
                          <div>
                            <Text type="secondary">{report.title}</Text>
                            <Title style={{ marginTop: '16px' }} level={4}>
                              {report.description}
                            </Title>
                          </div>
                          {report.icon}
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <StackedColumnChart />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24} lg={8}>
                <Social />
              </Col>
              <Col span={24} lg={8}>
                <ActivityComp />
              </Col>
              <Col span={24} lg={8}>
                <TopCities />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <LatestTransactions />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
