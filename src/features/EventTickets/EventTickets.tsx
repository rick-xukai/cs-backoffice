import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';

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
  selectCurrentPage,
  selectCurrentPageSize,
  paginationChangeAction,
} from '../Tickets/Tickets.slice';
import { columns } from '../Tickets/Tickets';

const EventTickets = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loadingForTicketList = useAppSelector(selectLoading);
  const ticketListdata = useAppSelector(selectData);
  const ticketListdataTotal = useAppSelector(selectDataTotal);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageSize = useAppSelector(selectCurrentPageSize);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(getTicketsListAction({ ticketId: id }));
  }, [currentPage, currentPageSize]);

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
          currentPage={currentPage}
          currentPageSize={currentPageSize}
          columns={columns(id, UserRoutes.eventTicketsDetail)}
          tableData={ticketListdata}
          tableDataTotal={ticketListdataTotal}
          paginationChange={(page, pageSize) =>
            dispatch(paginationChangeAction({ page, pageSize }))
          }
        />
      </div>
    </EventDetailContainer>
  );
};

export default EventTickets;
