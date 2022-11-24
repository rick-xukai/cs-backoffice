import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TableComponent from '../../components/Table/Table';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventsContainer } from './EventsComponent';
import {
  reset,
  getEventsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
  EventsListDataType,
  paginationChangeAction,
  selectCurrentPage,
  selectCurrentPageSize,
} from './Events.slice';

const Events = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const eventsListData = useAppSelector(selectData);
  const eventsListDataTotal = useAppSelector(selectDataTotal);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageSize = useAppSelector(selectCurrentPageSize);

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'event_name',
      key: 'event_name',
      render: (text: string, record: EventsListDataType) => (
        <Button className="name-btn" disabled={record.status === 'Ended'}>
          <Link to="/">{text}</Link>
        </Button>
      ),
    },
    {
      title: 'Event Time',
      dataIndex: 'event_time',
      key: 'event_time',
      render: (_: string, record: EventsListDataType) => (
        <div>
          <p>{record.event_time.date}</p>
          <p style={{ fontSize: 13 }}>{record.event_time.timeRange}</p>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      key: 'organizer',
    },
    {
      title: 'Partner',
      dataIndex: 'partner',
      key: 'partner',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_: string, record: EventsListDataType) => (
        <div>
          <p>{record.created_at.date}</p>
          <p style={{ fontSize: 13 }}>{record.created_at.timeRange}</p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(getEventsListAction());
  }, [currentPage]);

  return (
    <EventsContainer>
      <PageHeaderComponent title={t('Events')} />
      <div className="page-main">
        <TableComponent
          loading={loading}
          currentPage={currentPage}
          currentPageSize={currentPageSize}
          columns={columns}
          tableData={eventsListData}
          tableDataTotal={eventsListDataTotal}
          paginationChange={(page) => dispatch(paginationChangeAction(page))}
        />
      </div>
    </EventsContainer>
  );
};

export default Events;
