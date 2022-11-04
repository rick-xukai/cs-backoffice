import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Space } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import WizardBasic from './Wizard.Basic';
import WizardVertical from './Wizard.Vertical';

const FormsWizard = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.forms.layouts,
      breadcrumbName: t('Forms'),
    },
    {
      path: '',
      breadcrumbName: t('Form Wizard'),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{`${t('Form Wizard')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Form Wizard')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <WizardBasic />
          </Card>
          <Card>
            <WizardVertical />
          </Card>
        </Space>
      </div>
    </>
  );
};

export default FormsWizard;
