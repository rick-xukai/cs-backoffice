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
  {
    id: '4',
    firstName: 'Mark',
    lastName: 'Otto',
    username: '@mdo',
  },
  {
    id: '5',
    firstName: 'Jacob',
    lastName: 'Thornton',
    username: '@fat',
  },
];

const SmallTable = () => (
  <Card>
    <Row>
      <Col>
        <Title level={5}>Small table</Title>
        <p>
          Add
          <Text type="danger"> size=&quot;small&quot; </Text>
          to make tables more compact by cutting cell padding in half.
        </p>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Col>
    </Row>
  </Card>
);

export default SmallTable;
