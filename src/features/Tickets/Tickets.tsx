import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import qs from 'qs';

import { FormatTimeKeys } from '../../constants/Keys';
import {
  ticketStatus,
  defaultPageSize,
  defaultCurrentPage,
} from '../../constants/General';
import { formatTimeStrByTimeString } from '../../utils/func';
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
} from './Tickets.slice';

export const columns = (routeConfig: any, ticketId?: string, type?: string) => {
  const columnType = type;
  return [
    {
      title: 'Ticket Number',
      dataIndex: 'ticketNo',
      key: 'ticketNo',
      width: 160,
      render: (text: string, record: TicketsListDataType) => (
        <Button className="name-btn">
          <Link
            to={{
              pathname:
                (!columnType &&
                  UserRoutes.ticketDetail.replace(
                    ':ticketId',
                    record.id.toString(),
                  )) ||
                UserRoutes.eventTicketsDetail
                  .replace(':eventId', ticketId as string)
                  .replace(':ticketId', record.id.toString()),
              state: routeConfig,
            }}
          >
            {text}
          </Link>
        </Button>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
      width: 200,
      render: (text: string) => (
        <Tooltip title={text}>
          <p className="email">{text}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Ticket Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
    },
    {
      title: 'Seat Number',
      dataIndex: 'seat',
      key: 'seat',
    },
    {
      title: 'Bought at',
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
      render: (status: number) => (
        <span>{ticketStatus.find((item) => item.key === status)?.text}</span>
      ),
    },
  ];
};

const Tickets = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const loading = useAppSelector(selectLoading);
  const ticketsListData = useAppSelector(selectData);
  const ticketsListDataTotal = useAppSelector(selectDataTotal);

  const [currentPaginationConfig, setCurrentPaginationConfig] = useState({
    currentPage: defaultCurrentPage,
    currentPageSize: defaultPageSize,
  });

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const { page, pageSize } = qs.parse(location.search.slice(1));
    if (page && pageSize) {
      setCurrentPaginationConfig({
        currentPage: Number(page),
        currentPageSize: Number(pageSize),
      });
    }
    dispatch(
      getTicketsListAction({
        page: Number(page) || currentPaginationConfig.currentPage,
        size: Number(pageSize) || currentPaginationConfig.currentPageSize,
      }),
    );
  }, [location.search]);

  return (
    <TicketsContainer>
      <PageHeaderComponent title={t('Tickets')} />
      <div className="page-main">
        <TableComponent
          loading={loading}
          currentPage={currentPaginationConfig.currentPage}
          currentPageSize={currentPaginationConfig.currentPageSize}
          columns={columns(currentPaginationConfig)}
          tableData={ticketsListData}
          tableDataTotal={ticketsListDataTotal}
          paginationChange={(page, pageSize) =>
            history.push(
              `${UserRoutes.tickets}?page=${
                (pageSize === currentPaginationConfig.currentPageSize &&
                  page) ||
                defaultCurrentPage
              }&pageSize=${pageSize}`,
            )
          }
        />
      </div>
    </TicketsContainer>
  );
};

export default Tickets;
