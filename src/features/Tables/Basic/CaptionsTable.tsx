import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

import Table from '../../../components/Table';

const { Text, Title } = Typography;

const columns = [
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

const CaptionsTable = () => (
  <Card>
    <Row>
      <Col>
        <Title level={5}>Captions</Title>
        <p>
          Add
          <Text type="danger"> footer </Text>
          functions like a heading for a table. It helps users with screen
          readers to find a table and understand what it’s about and decide if
          they want to read it.
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
          footer={() => 'List of users'}
        />
      </Col>
    </Row>
  </Card>
);

export default CaptionsTable;
