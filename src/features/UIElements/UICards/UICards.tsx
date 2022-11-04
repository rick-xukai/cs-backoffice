import React from 'react';
import { useTranslation, TFunction } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Basic from './UICards.Basic';
import CustomContent from './UICards.CustomContent';
import LoadingCard from './UICards.LoadingCard';
import TabCard from './UICards.TabCard';

const getBreadcrumb = (t: TFunction) => [
  {
    path: '',
    breadcrumbName: t('UI Elements'),
  },
  {
    path: UserRoutes.uielements.uiAlerts,
    breadcrumbName: t('Cards'),
  },
];

const UICards = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{`${t('UI Elements')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader
            title={t('Cards')}
            breadcrumb={{ routes: getBreadcrumb(t) }}
          />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col span={24}>
            <Basic t={t} />
          </Col>
          <Col span={24}>
            <CustomContent t={t} />
          </Col>
          <Col span={24}>
            <LoadingCard t={t} />
          </Col>
          <Col span={24}>
            <TabCard t={t} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UICards;
