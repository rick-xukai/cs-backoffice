import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Space } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import LayoutVertical from './Layouts.Vertical';
import LayoutHorizontal from './Layouts.Horizontal';
import LayoutInline from './Layouts.Inline';
import LayoutRequiredMark from './Layouts.RequiredMark';

const FormsLayouts = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.forms.layouts,
      breadcrumbName: t('Forms'),
    },
    {
      path: '',
      breadcrumbName: t('Form Layouts'),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>{`${t('Form Layouts')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Form Layouts')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={[24, 24]}>
            <Col sm={12} span={24}>
              <Card>
                <LayoutVertical />
              </Card>
            </Col>
            <Col sm={12} span={24}>
              <Card>
                <LayoutHorizontal />
              </Card>
            </Col>
          </Row>
          <Card>
            <LayoutInline />
          </Card>
          <Card>
            <LayoutRequiredMark />
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default FormsLayouts;
