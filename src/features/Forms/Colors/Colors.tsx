import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Chrome from './Colors.Chrome';
import Sketch from './Colors.Sketch';
import Block from './Colors.Block';
import Github from './Colors.Github';
import Twitter from './Colors.Twitter';
import Hue from './Colors.Hue';
import Alpha from './Colors.Alpha';
import Slider from './Colors.Slider';
import Circle from './Colors.Circle';
import Compact from './Colors.Compact';
import Swatches from './Colors.Swatches';
import Material from './Colors.Material';

const FormColors = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('Forms'),
    },
    {
      path: UserRoutes.uielements.uiProgress,
      breadcrumbName: t('Form Colors'),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{`${t('Forms')} | Imaginato Ui`}</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <PageHeader title={t('Form Colors')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row gutter={[24, 24]}>
          <Col sm={12} xs={24}>
            <Chrome />
          </Col>
          <Col sm={12} xs={24}>
            <Sketch />
          </Col>
          <Col sm={12} xs={24}>
            <Block />
          </Col>
          <Col sm={12} xs={24}>
            <Github />
          </Col>
          <Col sm={12} xs={24}>
            <Twitter />
          </Col>
          <Col sm={12} xs={24}>
            <Hue />
          </Col>
          <Col sm={12} xs={24}>
            <Alpha />
          </Col>
          <Col sm={12} xs={24}>
            <Slider />
          </Col>
          <Col sm={12} xs={24}>
            <Circle />
          </Col>
          <Col sm={12} xs={24}>
            <Compact />
          </Col>
          <Col sm={12} xs={24}>
            <Swatches />
          </Col>
          <Col sm={12} xs={24}>
            <Material />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormColors;
