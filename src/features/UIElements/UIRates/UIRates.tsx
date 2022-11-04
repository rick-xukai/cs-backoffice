import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Basic from './UIRates.Basic';
import Half from './UIRates.Half';
import DisplayText from './UIRates.DisplayText';
import DisabledRate from './UIRates.Disabled';
import ClearRate from './UIRates.Clear';
import CustomCharacter from './UIRates.CustomCharacter';
import DifferentCharacter from './UIRates.DifferentCharacter';

const UIRates = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('UI Elements'),
    },
    {
      path: UserRoutes.uielements.uiNotification,
      breadcrumbName: t('Rating'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('UI Elements')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Rating')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row justify="start" align="top" gutter={[20, 20]}>
          <Col sm={12} xs={24}>
            <Basic />
          </Col>
          <Col sm={12} xs={24}>
            <Half />
          </Col>
          <Col sm={12} xs={24}>
            <DisplayText />
          </Col>
          <Col sm={12} xs={24}>
            <DisabledRate />
          </Col>
          <Col sm={12} xs={24}>
            <ClearRate />
          </Col>
          <Col sm={12} xs={24}>
            <CustomCharacter />
          </Col>
          <Col sm={12} xs={24}>
            <DifferentCharacter />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UIRates;
