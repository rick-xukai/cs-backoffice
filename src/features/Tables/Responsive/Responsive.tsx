import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Typography } from 'antd';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Table from '../../../components/Table/Table';

const { Text, Title } = Typography;

const columns = [
  {
    title: '#',
    render: (text: string, record: any, index: number) => (
      <Text strong>{index + 1}</Text>
    ),
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
];

const data = [
  {
    id: '1',
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
  },
  {
    id: '2',
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
  },
  {
    id: '3',
    firstName: 'Larry',
    lastName: 'the Bird',
    username: '@twitter',
  },
];

const TablesResponsive = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.tablesResponsive,
      breadcrumbName: t('Tables'),
    },
    {
      path: '',
      breadcrumbName: t('Responsive Table'),
    },
  ];
  return (
    <div>
      <Helmet>
        <title>{`${t('Responsive Table')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Responsive Table')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Card>
          <Row>
            <Col>
              <Title level={5}>Example</Title>
              <p>
                Add
                <Text type="danger"> responsive </Text>
                to make the UI of the table more friendly on mobile side.
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                responsive="lg"
                rowKey="id"
                bordered
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default TablesResponsive;
