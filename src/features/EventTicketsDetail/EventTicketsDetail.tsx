import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import { defaultCurrentPage, defaultPageSize } from '../../constants/General';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventTabsKey } from '../../constants/Keys';
import { UserRoutes } from '../../navigation/Routes';
import TicketDetail from '../TicketDetail';
import { EventDetailContainer } from '../EventDetail/EventDetailComponent';

interface RouteConfigType {
  state: {
    currentPage: number;
    currentPageSize: number;
  };
}

const EventTicketsDetail = () => {
  const { t } = useTranslation();
  const { eventId }: { eventId: string } = useParams();
  const history = useHistory();
  const location: RouteConfigType = useLocation();

  const handleTabChange = (activeKey: string) => {
    if (activeKey === EventTabsKey.eventInfo) {
      history.push(UserRoutes.eventInfo.replace(':id', eventId));
    }
  };

  return (
    <EventDetailContainer>
      <PageHeaderComponent
        title={t('Ticket List')}
        showBackArrow
        clickBack={() =>
          history.push(
            `${UserRoutes.eventTickets.replace(':id', eventId)}?page=${
              (location.state && location.state.currentPage) ||
              defaultCurrentPage
            }&pageSize=${
              (location.state && location.state.currentPageSize) ||
              defaultPageSize
            }`,
          )
        }
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
        <TicketDetail showHeader={false} />
      </div>
    </EventDetailContainer>
  );
};

export default EventTicketsDetail;
