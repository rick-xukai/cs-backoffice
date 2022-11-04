import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, PageHeader, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { Helmet } from 'react-helmet';

import { UserRoutes } from '../../../navigation/Routes';
import Table from '../../../components/Table/Table';
import ColumnController from '../../../components/Table/ColumnController';

const { Text } = Typography;

const columns = [
  {
    key: 'index',
    title: '#',
    render: (text: string, record: object, index: number) => (
      <Text strong>{index + 1}</Text>
    ),
  },
  {
    key: 'firstName',
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    key: 'lastName',
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    key: 'username',
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

const TablesControlColumn = () => {
  const { t } = useTranslation();
  const routes = [
    {
      path: UserRoutes.tablesControlColumn,
      breadcrumbName: t('Tables'),
    },
    {
      path: '',
      breadcrumbName: t('Control Column'),
    },
  ];
  const filterColumnsKey = 'key';
  const mustColumnsKey = ['index', 'username'];
  const defaultColumnKeys = ['firstName', 'lastName'];
  const [displayColumnKey, setDisplayColumnKey] = useState<string[]>([]);
  const [displayColumns, setDisplayColumns] = useState<object[]>([]);
  const onFilterColumns = (keys: string[]) => {
    setDisplayColumnKey(keys);
  };
  useEffect(() => {
    setDisplayColumnKey(defaultColumnKeys);
  }, []);
  useEffect(() => {
    const result = columns.filter(
      (item: ColumnType<object>) =>
        displayColumnKey.includes(item[filterColumnsKey] as string) ||
        (mustColumnsKey &&
          mustColumnsKey.includes(item[filterColumnsKey] as string)),
    );
    setDisplayColumns(result);
  }, [displayColumnKey]);
  const TableTitle = () => (
    <Row justify="end">
      <Col>
        <ColumnController
          columns={columns}
          columnKey={filterColumnsKey}
          ignoreColumnKeys={mustColumnsKey}
          values={displayColumnKey}
          onChange={onFilterColumns}
        />
      </Col>
    </Row>
  );
  return (
    <div>
      <Helmet>
        <title>{`${t('Responsive Table')} | Imaginato Ui`}</title>
      </Helmet>
      <Row justify="start">
        <Col span={24}>
          <PageHeader title={t('Control Column')} breadcrumb={{ routes }} />
        </Col>
      </Row>
      <div className="page-container">
        <Card>
          <Row>
            <Col span={24}>
              <Table
                rowKey="id"
                columns={displayColumns}
                dataSource={data}
                pagination={false}
                title={TableTitle}
                scroll={{ x: true }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default TablesControlColumn;
