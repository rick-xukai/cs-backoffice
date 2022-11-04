import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Basic from './UIProgress.Basic';
import SmallProgress from './UIProgress.Small';
import CircleProgress from './UIProgress.Circle';
import SmallCircle from './UIProgress.SmallCircle';
import DynamicProgress from './UIProgress.Dynamic';
import FormatProgress from './UIProgress.Format';
import DashboardProgress from './UIProgress.Dashboard';
import SquareProgress from './UIProgress.Square';
import SegmentedProgress from './UIProgress.Segmented';
import LinearGradient from './UIProgress.LinearGradient';
import StepsProgress from './UIProgress.Steps';

const UIRates = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('UI Elements'),
    },
    {
      path: UserRoutes.uielements.uiProgress,
      breadcrumbName: t('Progress Bars'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('UI Elements')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Progress Bars')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col sm={12} xs={24}>
            <Basic />
          </Col>
          <Col sm={12} xs={24}>
            <SmallProgress />
          </Col>
          <Col sm={12} xs={24}>
            <CircleProgress />
          </Col>
          <Col sm={12} xs={24}>
            <SmallCircle />
          </Col>
          <Col sm={12} xs={24}>
            <DynamicProgress />
          </Col>
          <Col sm={12} xs={24}>
            <FormatProgress />
          </Col>
          <Col sm={12} xs={24}>
            <DashboardProgress />
          </Col>
          <Col sm={12} xs={24}>
            <SquareProgress />
          </Col>
          <Col sm={12} xs={24}>
            <SegmentedProgress />
          </Col>
          <Col sm={12} xs={24}>
            <LinearGradient />
          </Col>
          <Col sm={12} xs={24}>
            <StepsProgress />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UIRates;
