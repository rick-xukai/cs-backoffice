import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Pagination from '../../components/Pagination';
import { pageSize, defaultCurrentPage } from '../../constants/General';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EventsContainer } from './EventsComponent';
import {
  getEventsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
  EventsListDataType,
} from './Events.slice';

const Events = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const eventsListData = useAppSelector(selectData);
  const eventsListDataTotal = useAppSelector(selectDataTotal);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

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

  useEffect(() => {
    dispatch(getEventsListAction({ page: currentPage, count: pageSize }));
  }, [currentPage]);

  return (
    <EventsContainer>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ color: 'black' }} spin />}
        size="large"
      >
        <Table
          columns={columns}
          dataSource={eventsListData}
          pagination={false}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={eventsListDataTotal}
          onChange={(page) => setCurrentPage(page)}
        />
      </Spin>
    </EventsContainer>
  );
};

export default Events;
