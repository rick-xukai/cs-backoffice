import React from 'react';
import { Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { Images } from '../../theme';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { DashboardContainer } from './DashboardComponent';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <DashboardContainer>
      <PageHeaderComponent
        title={t('Dashboard')}
        showRightContent={
          <p>
            Welcome, <b>NFTASIA</b> user.
          </p>
        }
      />
      <div className="page-main">
        <div className="coming-soon-content">
          <Col className="content-banner">
            <img src={Images.ComingSoon} alt="" />
          </Col>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
