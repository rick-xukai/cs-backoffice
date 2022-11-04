import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import BasicTable from './BasicTable';
import DarkTable from './DarkTable';
import BorderedTable from './BorderedTable';
import BorderlessTable from './BorderlessTable';
import HoverdisableTable from './HoverdisableTable';
import SmallTable from './SmallTable';
import RowClassNameTable from './RowClassNameTable';
import CaptionsTable from './CaptionsTable';
import ScrollTable from './ScrollTable';
import ResponsiveHideTable from './ResponsiveHideTable';

const TablesBasic = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.tablesBasic,
      breadcrumbName: t('Tables'),
    },
    {
      path: '',
      breadcrumbName: t('Basic Tables'),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>{`${t('Basic Tables')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Basic Tables')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12}>
            <BasicTable />
          </Col>
          <Col span={24} lg={12}>
            <DarkTable />
          </Col>
          <Col span={24} lg={12}>
            <BorderedTable />
          </Col>
          <Col span={24} lg={12}>
            <BorderlessTable />
          </Col>
          <Col span={24} lg={12}>
            <HoverdisableTable />
          </Col>
          <Col span={24} lg={12}>
            <SmallTable />
          </Col>
          <Col span={24} lg={12}>
            <RowClassNameTable />
          </Col>
          <Col span={24} lg={12}>
            <CaptionsTable />
          </Col>
          <Col span={24}>
            <ScrollTable />
          </Col>
          <Col span={24}>
            <ResponsiveHideTable />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TablesBasic;
