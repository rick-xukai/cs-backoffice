import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

import { UserRoutes } from '../../navigation/Routes';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TicketsContainer } from './TicketsComponent';
import {
  reset,
  getTicketsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
  TicketsListDataType,
  paginationChangeAction,
  selectCurrentPage,
  selectCurrentPageSize,
} from './Tickets.slice';

export const columns = [
  {
    title: 'Ticket Number',
    dataIndex: 'ticket_number',
    key: 'ticket_number',
    render: (text: string, record: TicketsListDataType) => (
      <Button className="name-btn" disabled={record.status === 'Cancelled'}>
        <Link to={UserRoutes.ticketDetail.replace(':id', record.ticket_number)}>
          {text}
        </Link>
      </Button>
    ),
  },
  {
    title: 'User Name',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: 'User Email',
    dataIndex: 'user_email',
    key: 'user_email',
    render: (text: string) => (
      <Tooltip title={text}>
        <p className="email">{text}</p>
      </Tooltip>
    ),
  },
  {
    title: 'Ticket Type',
    dataIndex: 'ticket_type',
    key: 'ticket_type',
  },
  {
    title: 'Seat Number',
    dataIndex: 'seat_number',
    key: 'seat_number',
  },
  {
    title: 'Bought at',
    dataIndex: 'bought_at',
    key: 'bought_at',
    render: (_: string, record: TicketsListDataType) => (
      <div>
        <p>{record.bought_at.date}</p>
        <p style={{ fontSize: 13 }}>{record.bought_at.timeRange}</p>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const Tickets = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const ticketsListData = useAppSelector(selectData);
  const ticketsListDataTotal = useAppSelector(selectDataTotal);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageSize = useAppSelector(selectCurrentPageSize);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(getTicketsListAction());
  }, [currentPage]);

  return (
    <TicketsContainer>
      <PageHeaderComponent title={t('Tickets')} />
      <div className="page-main">
        <TableComponent
          loading={loading}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
          columns={columns}
          tableData={ticketsListData}
          tableDataTotal={ticketsListDataTotal}
          paginationChange={(page) => dispatch(paginationChangeAction(page))}
        />
      </div>
    </TicketsContainer>
  );
};

export default Tickets;
