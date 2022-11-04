import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

import Table from '../../../components/Table';

const { Text, Title } = Typography;

const columns: Array<any> = [
  {
    title: '#',
    dataIndex: 'id',
    render: (text: string, record: any, index: number) => (
      <strong>{index + 1}</strong>
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
    responsive: ['md'],
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

const ResponsiveHideTable = () => (
  <Card>
    <Row>
      <Col>
        <Title level={5}>Responsive table - hide columns</Title>
        <p>
          Add
          <Text type="danger"> responsive for columns </Text>
          to hide the columns on small devices.
        </p>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Col>
    </Row>
  </Card>
);

export default ResponsiveHideTable;
