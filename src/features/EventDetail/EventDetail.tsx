import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EventTabsKey } from '../../constants/Keys';
import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { EventDetailContainer } from './EventDetailComponent';
import {
  getEventDetailAction,
  selectDetailLoading,
  selectDetailData,
  EventDetailDataType,
  selectError,
} from './EventDetail.slice';
import EventInfo from './Component/EventInfo';

const EventDetail = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);
  const loadingForDetail = useAppSelector(selectDetailLoading);
  const detailData: EventDetailDataType = useAppSelector(selectDetailData);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    dispatch(getEventDetailAction(id));
  }, []);

  const handleTabChange = (activeKey: string) => {
    if (activeKey === EventTabsKey.ticketList) {
      history.push(UserRoutes.eventTickets.replace(':id', id));
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
          defaultActiveKey={EventTabsKey.eventInfo}
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
        {(loadingForDetail && (
          <Spin
            spinning={loadingForDetail}
            indicator={<LoadingOutlined spin />}
            size="large"
          />
        )) || <EventInfo data={detailData} />}
      </div>
    </EventDetailContainer>
  );
};

export default EventDetail;
