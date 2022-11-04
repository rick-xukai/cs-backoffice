import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Headings from './UITypography.Headings';
import Texts from './UITypography.Text';
import Interactive from './UITypography.Interactive';
import Ellipsis from './UITypography.Ellipsis';
import EllipsisMiddle from './UITypography.EllipsisMiddle';
import EllipsisSuffix from './UITypography.EllipsisSuffix';

const UITypography = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('UI Elements'),
    },
    {
      path: UserRoutes.uielements.uiTypography,
      breadcrumbName: t('Typography'),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{`${t('UI Elements')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Typography')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col sm={12} xs={24}>
            <Headings />
          </Col>
          <Col sm={12} xs={24}>
            <Texts />
          </Col>
          <Col span={24}>
            <Interactive />
          </Col>
          <Col span={24}>
            <Ellipsis />
          </Col>
          <Col span={24}>
            <EllipsisMiddle />
          </Col>
          <Col span={24}>
            <EllipsisSuffix />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UITypography;
