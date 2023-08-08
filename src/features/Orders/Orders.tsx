import React, { useState } from 'react';
import { Row, Col, Input, Select, Button, Tabs } from 'antd';
import {
  CloseOutlined,
  SearchOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
  defaultCurrentPage,
  defaultPageSize,
  priceUnit,
} from '../../constants/General';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { OrdersContainer, OrdersTableContainer } from './OrdersComponent';

const { Option } = Select;
enum TabKeys {
  primaryOrders = 0,
  secondaryTransactions = 1,
}

const Orders = () => {
  const { t } = useTranslation();

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const primaryOrdersTableData = [
    {
      id: 1,
      order: '42132',
      date: 'Jul 12, 2023',
      time: '21:30',
      buyer: 'Christine',
      email: 'christine.xu@gmail.com',
      event: 'Escape to Paradise - Pool Party',
      ticketNumber: 3,
      totalPrice: 150,
      status: 'Paid',
    },
    {
      id: 2,
      order: '42132',
      date: 'Jul 12, 2023',
      time: '21:30',
      buyer: 'Christine',
      email: 'christine.xu@gmail.com',
      event: 'Escape to Paradise - Pool Party',
      ticketNumber: 3,
      totalPrice: 150,
      status: 'Paid',
    },
  ];

  const secondaryTransactionsTableData = [
    {
      id: 1,
      transaction: '928',
      date: 'Jul 12, 2023',
      time: '21:30',
      buyer: 'Christine',
      buyerEmail: 'christine.xu@gmail.com',
      event: 'Escape to Paradise - Pool Party',
      ticket: 'VIP',
      ticketNumber: 'K0J2947294759284',
      seller: 'Joy Zhang',
      sellerEmail: 'joy.zhang@gmail.com',
      paidPrice: 150,
      royaltyFee: 0.5,
      serviceFee: 1,
      status: 'Transferred',
    },
    {
      id: 2,
      transaction: '928',
      date: 'Jul 12, 2023',
      time: '21:30',
      buyer: 'Christine',
      buyerEmail: 'christine.xu@gmail.com',
      event: 'Escape to Paradise - Pool Party',
      ticket: 'VIP',
      ticketNumber: 'K0J2947294759284',
      seller: 'Joy Zhang',
      sellerEmail: 'joy.zhang@gmail.com',
      paidPrice: 150,
      royaltyFee: 0.5,
      serviceFee: 1,
      status: 'Transferred',
    },
  ];

  const primaryOrdersColumns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 100,
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string, record: any) => (
        <>
          <Col span={24}>{date}</Col>
          <Col span={24} className="item-label">
            {record.time}
          </Col>
        </>
      ),
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      width: 180,
      render: (buyer: string, record: any) => (
        <>
          <Col span={24}>{buyer}</Col>
          <Col span={24} className="item-label">
            {record.email}
          </Col>
        </>
      ),
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 250,
    },
    {
      title: 'Number of Tickets',
      dataIndex: 'ticketNumber',
      key: 'ticketNumber',
      width: 150,
      render: (ticketNumber: string) => (
        <Col span={24} className="item-action">
          {ticketNumber}
        </Col>
      ),
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 100,
      render: (totalPrice: number) => (
        <span>{`${totalPrice} ${priceUnit}`}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 84,
    },
  ];

  const secondaryTransactionsColumns = [
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
      width: 120,
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date: string, record: any) => (
        <>
          <Col span={24}>{date}</Col>
          <Col span={24} className="item-label">
            {record.time}
          </Col>
        </>
      ),
    },
    {
      title: 'Ticket',
      dataIndex: 'ticket',
      key: 'ticket',
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 250,
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      width: 180,
      render: (buyer: string, record: any) => (
        <>
          <Col span={24}>{buyer}</Col>
          <Col span={24} className="item-label">
            {record.buyerEmail}
          </Col>
        </>
      ),
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
      width: 180,
      render: (seller: string, record: any) => (
        <>
          <Col span={24}>{seller}</Col>
          <Col span={24} className="item-label">
            {record.sellerEmail}
          </Col>
        </>
      ),
    },
    {
      title: 'Paid Price',
      dataIndex: 'paidPrice',
      key: 'paidPrice',
      render: (paidPrice: number) => <span>{`${paidPrice} ${priceUnit}`}</span>,
    },
    {
      title: 'Royalty Fee',
      dataIndex: 'royaltyFee',
      key: 'royaltyFee',
      render: (royaltyFee: number) => (
        <span>{`${royaltyFee} ${priceUnit}`}</span>
      ),
    },
    {
      title: 'Service Fee',
      dataIndex: 'serviceFee',
      key: 'serviceFee',
      render: (serviceFee: number) => (
        <span>{`${serviceFee} ${priceUnit}`}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <>
      <PageHeaderComponent title={t('Orders')} />
      <OrdersContainer>
        <div className="page-main">
          <Row className="filter-container">
            <Col span={24} lg={20}>
              <Row className="content" gutter={[24, 24]}>
                <Col lg={10} span={24}>
                  <Input
                    placeholder={t('Search buyer or event')}
                    allowClear={{
                      clearIcon: <CloseOutlined />,
                    }}
                    suffix={!searchKeyword && <SearchOutlined />}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </Col>
                <Col lg={10} span={24}>
                  <Select
                    placeholder={t('Events')}
                    defaultActiveFirstOption={false}
                  >
                    <Option value="Paid">Paid</Option>
                  </Select>
                </Col>
                <Col lg={4} span={24} className="filter-status">
                  <Select
                    placeholder={t('Status')}
                    defaultActiveFirstOption={false}
                  >
                    <Option value="Paid">Paid</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col lg={4} span={24} className="export-action">
              <Button className="action-button">
                <DownloadOutlined />
                {t('Export')}
              </Button>
            </Col>
          </Row>
          <Col className="orders-tabs">
            <Tabs
              defaultActiveKey={TabKeys.primaryOrders.toString()}
              items={[
                {
                  label: t('Primary Orders'),
                  key: '1',
                  children: (
                    <OrdersTableContainer>
                      <TableComponent
                        loading={false}
                        currentPage={defaultCurrentPage}
                        currentPageSize={defaultPageSize}
                        columns={primaryOrdersColumns}
                        tableData={primaryOrdersTableData}
                        tableDataTotal={primaryOrdersTableData.length}
                        paginationChange={() => {}}
                      />
                    </OrdersTableContainer>
                  ),
                },
                {
                  label: t('Secondary Transactions'),
                  key: '2',
                  children: (
                    <OrdersTableContainer className="large-table">
                      <TableComponent
                        loading={false}
                        currentPage={defaultCurrentPage}
                        currentPageSize={defaultPageSize}
                        columns={secondaryTransactionsColumns}
                        tableData={secondaryTransactionsTableData}
                        tableDataTotal={secondaryTransactionsTableData.length}
                        paginationChange={() => {}}
                      />
                    </OrdersTableContainer>
                  ),
                },
              ]}
            />
          </Col>
        </div>
      </OrdersContainer>
    </>
  );
};

export default Orders;
