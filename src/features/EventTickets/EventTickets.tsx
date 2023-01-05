import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import qs from 'qs';

import { defaultPageSize, defaultCurrentPage } from '../../constants/General';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EventTabsKey } from '../../constants/Keys';
import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import TableComponent from '../../components/Table/Table';
import { EventDetailContainer } from '../EventDetail/EventDetailComponent';
import {
  reset,
  getTicketsListAction,
  selectLoading,
  selectData,
  selectDataTotal,
} from '../Tickets/Tickets.slice';
import { columns } from '../Tickets/Tickets';

const EventTickets = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const loadingForTicketList = useAppSelector(selectLoading);
  const ticketListdata = useAppSelector(selectData);
  const ticketListdataTotal = useAppSelector(selectDataTotal);

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

  const handleTabChange = (activeKey: string) => {
    if (activeKey === EventTabsKey.eventInfo) {
      history.push(UserRoutes.eventInfo.replace(':id', id));
    }
  };

  return (
    <EventDetailContainer>
      <PageHeaderComponent
        title={t('Event Details')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.events)}
      >
        <Tabs
          defaultActiveKey={EventTabsKey.ticketList}
          onChange={(activeKey) => handleTabChange(activeKey)}
        >
          <Tabs.TabPane
            tab={t(EventTabsKey.eventInfo)}
            key={EventTabsKey.eventInfo}
          />
          <Tabs.TabPane
            tab={t(EventTabsKey.ticketList)}
            key={EventTabsKey.ticketList}
          />
        </Tabs>
      </PageHeaderComponent>
      <div className="page-main">
        <TableComponent
          loading={loadingForTicketList}
          currentPage={currentPaginationConfig.currentPage}
          currentPageSize={currentPaginationConfig.currentPageSize}
          columns={columns(
            currentPaginationConfig,
            id,
            UserRoutes.eventTicketsDetail,
          )}
          tableData={ticketListdata}
          tableDataTotal={ticketListdataTotal}
          paginationChange={(page, pageSize) =>
            history.push(
              `${UserRoutes.eventTickets.replace(':id', id)}?page=${
                (pageSize === currentPaginationConfig.currentPageSize &&
                  page) ||
                defaultCurrentPage
              }&pageSize=${pageSize}`,
            )
          }
        />
      </div>
    </EventDetailContainer>
  );
};

export default EventTickets;
