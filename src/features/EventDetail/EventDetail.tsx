import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { defaultCurrentPage, defaultPageSize } from '../../constants/General';
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
  reset,
} from './EventDetail.slice';
import EventInfo from './Component/EventInfo';

interface RouteConfigType {
  state: {
    currentPage: number;
    currentPageSize: number;
    eventTicketsPage: number;
    eventTicketsPageSize: number;
  };
}

const EventDetail = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const location: RouteConfigType = useLocation();

  const error = useAppSelector(selectError);
  const loadingForDetail = useAppSelector(selectDetailLoading);
  const detailData: EventDetailDataType = useAppSelector(selectDetailData);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

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
      if (
        location.state &&
        location.state.eventTicketsPage &&
        location.state.eventTicketsPageSize
      ) {
        history.push(
          `${UserRoutes.eventTickets.replace(':id', id)}?page=${
            location.state.eventTicketsPage
          }&pageSize=${location.state.eventTicketsPageSize}`,
        );
      } else {
        history.push(UserRoutes.eventTickets.replace(':id', id));
      }
    }
  };

  return (
    <EventDetailContainer>
      <PageHeaderComponent
        title={t('Event Details')}
        showBackArrow
        clickBack={() =>
          history.push(
            `${UserRoutes.events}?page=${
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
