import React from 'react';
import { useTranslation, TFunction } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Basic from './UIAlerts.Basic';
import Closable from './UIAlerts.Closable';
import Description from './UIAlerts.Description';
import Icon from './UIAlerts.Icon';
import CustomAction from './UIAlerts.CustomAction';
import LoopBanner from './UIAlerts.LoopBanner';

const getBreadcrumb = (t: TFunction) => [
  {
    path: '',
    breadcrumbName: t('UI Elements'),
  },
  {
    path: UserRoutes.uielements.uiAlerts,
    breadcrumbName: t('Alerts'),
  },
];

const UIAlerts = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{`${t('UI Elements')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader
            title={t('Alerts')}
            breadcrumb={{ routes: getBreadcrumb(t) }}
          />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col sm={12} xs={24}>
            <Basic t={t} />
          </Col>
          <Col sm={12} xs={24}>
            <Closable t={t} />
          </Col>
          <Col sm={12} xs={24}>
            <Description t={t} />
          </Col>
          <Col sm={12} xs={24}>
            <Icon t={t} />
          </Col>
          <Col sm={12} xs={24}>
            <CustomAction t={t} />
          </Col>
          <Col sm={12} xs={24}>
            <LoopBanner t={t} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UIAlerts;
