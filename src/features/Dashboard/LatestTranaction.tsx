import React from 'react';
import { Row, Col, Card, Typography, Table, Badge, Space } from 'antd';
import { WechatOutlined, AlipayOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import PrimaryButton from '../../components/PrimaryButton';

const { Title, Text } = Typography;

const TransactionsColumnChartCard = styled(Card)`
  .ant-card-head {
    border: none;
  }
`;

const TBadge = styled(Badge)`
  padding: 8px;
  border-radius: 4px;
`;

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    render: (title: string) => <Text strong>{title}</Text>,
  },
  {
    title: 'Bill Name',
    dataIndex: 'billingName',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    render: (pstatus: string, record: any) => (
      <TBadge
        className={`bg-soft bg-${record.badgeClass} text-${record.badgeClass}`}
      >
        {pstatus}
      </TBadge>
    ),
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    render: (methodIcon: string, record: any) => (
      <Space size={8}>
        {record.methodIcon}
        <Text>{methodIcon}</Text>
      </Space>
    ),
  },
  {
    title: 'View Detail',
    dataIndex: 'orderId',
    render: () => (
      <PrimaryButton style={{ borderRadius: '50px' }} size="small">
        View Detail
      </PrimaryButton>
    ),
  },
];

const transactions = [
  {
    id: 'customCheck2',
    orderId: '#SK2540',
    billingName: 'Neal Matthews',
    Date: '07 Oct, 2019',
    total: '$400',
    badgeClass: 'success',
    paymentStatus: 'Paid',
    methodIcon: <WechatOutlined className="text-success" />,
    paymentMethod: 'Wechat',
    link: '#',
  },
  {
    id: 'customCheck3',
    orderId: '#SK2541',
    billingName: 'Jamal Burnett',
    Date: '07 Oct, 2019',
    total: '$380',
    badgeClass: 'danger',
    paymentStatus: 'Chargeback',
    methodIcon: <WechatOutlined className="text-success" />,
    paymentMethod: 'Wechat',
    link: '#',
  },
  {
    id: 'customCheck4',
    orderId: '#SK2542',
    billingName: 'Juan Mitchell',
    Date: '06 Oct, 2019',
    total: '$384',
    badgeClass: 'success',
    paymentStatus: 'Paid',
    methodIcon: <AlipayOutlined className="text-primary" />,
    paymentMethod: 'Ailpay',
    link: '#',
  },
  {
    id: 'customCheck5',
    orderId: '#SK2543',
    billingName: 'Barry Dick',
    Date: '05 Oct, 2019',
    total: '$412',
    badgeClass: 'success',
    paymentStatus: 'Paid',
    methodIcon: <WechatOutlined className="text-success" />,
    paymentMethod: 'Wechat',
    link: '#',
  },
  {
    id: 'customCheck6',
    orderId: '#SK2544',
    billingName: 'Ronald Taylor',
    Date: '04 Oct, 2019',
    total: '$404',
    badgeClass: 'warning',
    paymentStatus: 'Refund',
    methodIcon: <WechatOutlined className="text-success" />,
    paymentMethod: 'Wechat',
    link: '#',
  },
  {
    id: 'customCheck7',
    orderId: '#SK2545',
    billingName: 'Jacob Hunter',
    Date: '04 Oct, 2019',
    total: '$392',
    badgeClass: 'success',
    paymentStatus: 'Paid',
    methodIcon: <AlipayOutlined className="text-primary" />,
    paymentMethod: 'Alipay',
    link: '#',
  },
];

const Transactions = () => (
  <TransactionsColumnChartCard
    title={<Title level={5}>Latest Transaction</Title>}
  >
    <Row justify="center" align="top">
      <Col span={24}>
        <Table
          rowKey="id"
          columns={columns}
          rowSelection={{}}
          dataSource={transactions}
          scroll={{ x: true }}
        />
      </Col>
    </Row>
  </TransactionsColumnChartCard>
);

export default Transactions;
