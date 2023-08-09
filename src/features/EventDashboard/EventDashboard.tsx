import React from 'react';
import { useTranslation } from 'react-i18next';

import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventsContainer } from '../Events/EventsComponent';
import { UserRoutes } from '../../navigation/Routes';

const EventDashboard = () => {
  const { t } = useTranslation();
  return (
    <EventsContainer>
      <PageHeaderComponent
        breadcrumb={[
          {
            label: t('Events'),
            href: UserRoutes.events,
          },
          {
            label: 'Escape to Paradise - Pool Party',
          },
        ]}
      />
    </EventsContainer>
  );
};
export default EventDashboard;
