import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Space } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Inputs from './Elements.Inputs';
import Sizing from './Elements.Sizing';
import Selects from './Elements.Selects';
import Slider from './Elements.Slider';
import Checkboxes from './Elements.Checkboxes';
import Radios from './Elements.Radios';
import Switches from './Elements.Switches';
import DatePickers from './Elements.DatePickers';
import TimePickers from './Elements.TimePickers';

const FormsElements = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.forms.elements,
      breadcrumbName: t('Forms'),
    },
    {
      path: '',
      breadcrumbName: t('Form Elements'),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{`${t('Form Elements')} | CrowdServe BO`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Form Elements')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Row>
              <Col span={24}>
                <Inputs />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Sizing />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Selects />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Checkboxes />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Radios />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Switches />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <Slider />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <DatePickers />
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col span={24}>
                <TimePickers />
              </Col>
            </Row>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default FormsElements;
