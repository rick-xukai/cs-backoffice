import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Basic from './UINotification.Basic';
import Manually from './UINotification.Manually';
import Custom from './UINotification.Custom';
import UpdateByKey from './UINotification.Update';
import Position from './UINotification.Position';
import QuickMethod from './UINotification.Method';

const UINotification = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('UI Elements'),
    },
    {
      path: UserRoutes.uielements.uiNotification,
      breadcrumbName: t('Notifications'),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{`${t('UI Elements')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Notifications')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col sm={12} xs={24}>
            <Basic />
          </Col>
          <Col sm={12} xs={24}>
            <Manually />
          </Col>
          <Col sm={12} xs={24}>
            <Custom />
          </Col>
          <Col sm={12} xs={24}>
            <UpdateByKey />
          </Col>
          <Col sm={12} xs={24}>
            <Position />
          </Col>
          <Col sm={12} xs={24}>
            <QuickMethod />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UINotification;
