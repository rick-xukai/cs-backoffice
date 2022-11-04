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

// eslint-disable-next-line complexity
const rowClassName = (record: any, index: number) => {
  switch (index) {
    case 0:
      return 'table-light';
    case 1:
      return 'table-success';
    case 2:
      return 'table-info';
    case 3:
      return 'table-warning';
    case 4:
      return 'table-danger';
    default:
      return '';
  }
};

const RowClassNameTable = () => (
  <Card>
    <Row>
      <Col>
        <Title level={5}>Contextual className</Title>
        <p>
          Add
          <Text type="danger"> rowClassName </Text>
          to color table rows.
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
          rowClassName={rowClassName}
        />
      </Col>
    </Row>
  </Card>
);

export default RowClassNameTable;
