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
  {
    id: '6',
    firstName: 'Larry',
    lastName: 'the Bird',
    username: '@twitter',
  },
];

const ScrollTable = () => (
  <Card>
    <Row>
      <Col>
        <Title level={5}>Scrollable table</Title>
        <p>
          Add
          <Text type="danger"> scroll </Text>
          to display large amounts of data in scrollable view.
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
          scroll={{ x: 700, y: 240 }}
        />
      </Col>
    </Row>
  </Card>
);

export default ScrollTable;
