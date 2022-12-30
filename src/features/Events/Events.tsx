import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';

import { FormatTimeKeys } from '../../constants/Keys';
import { formatTimeStrByTimeString } from '../../utils/func';
import { UserRoutes } from '../../navigation/Routes';
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
      dataIndex: 'eventName',
      key: 'eventName',
      width: 200,
      render: (text: string, record: EventsListDataType) => (
        <Tooltip title={text}>
          <Button className="name-btn" disabled={record.status === 'Ended'}>
            <Link
              to={UserRoutes.eventInfo.replace(':id', record.id.toString())}
            >
              {text}
            </Link>
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Event Time',
      dataIndex: 'eventStartTime',
      key: 'eventStartTime',
      render: (text: string, record: EventsListDataType) => (
        <div>
          <p>{formatTimeStrByTimeString(text, FormatTimeKeys.mdy)}</p>
          <p style={{ fontSize: 13 }}>
            {`${formatTimeStrByTimeString(
              text,
              FormatTimeKeys.hm,
            )}~${formatTimeStrByTimeString(
              record.eventEndTime,
              FormatTimeKeys.hm,
            )}`}
          </p>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="text-ellipsis">{text}</p>
        </Tooltip>
      ),
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
      render: (text: string) => <span>{text || '-'}</span>,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => (
        <div>
          <p>{formatTimeStrByTimeString(text, FormatTimeKeys.mdy)}</p>
          <p style={{ fontSize: 13 }}>
            {formatTimeStrByTimeString(text, FormatTimeKeys.hm)}
          </p>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (text: string) => <span>{text || '-'}</span>,
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
  }, [currentPage, currentPageSize]);

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
          paginationChange={(page, pageSize) =>
            dispatch(paginationChangeAction({ page, pageSize }))
          }
        />
      </div>
    </EventsContainer>
  );
};

export default Events;
