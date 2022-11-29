import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLocalStorage } from '../../hooks';
import { EventTabsKey, LocalStorageKeys } from '../../constants/Keys';
import TableComponent from '../../components/Table/Table';
import { UserRoutes } from '../../navigation/Routes';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { columns } from '../Tickets/Tickets';
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
import { EventDetailContainer } from './EventDetailComponent';
import {
  getEventDetailAction,
  selectDetailLoading,
  selectDetailData,
  EventDetailDataType,
} from './EventDetail.slice';
import EventInfo from './Component/EventInfo';

const EventDetail = () => {
  const { t } = useTranslation();
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const localStorage = useLocalStorage();
  const dispatch = useAppDispatch();

  const loadingForTicketList = useAppSelector(selectLoading);
  const ticketListdata = useAppSelector(selectData);
  const ticketListdataTotal = useAppSelector(selectDataTotal);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentPageSize = useAppSelector(selectCurrentPageSize);

  const loadingForDetail = useAppSelector(selectDetailLoading);
  const detailData: EventDetailDataType = useAppSelector(selectDetailData);

  const [currentSelectTab, setCurrentSelectTab] = useState(
    localStorage.getItem(LocalStorageKeys.eventDetailCurrentTab) ||
      EventTabsKey.eventInfo,
  );

  const handleTabChange = (activeKey: string) => {
    if (!ticketListdata.length) {
      dispatch(getTicketsListAction({ id }));
    }
    setCurrentSelectTab(activeKey);
    localStorage.setItem(LocalStorageKeys.eventDetailCurrentTab, activeKey);
  };

  useEffect(() => {
    dispatch(getTicketsListAction({ id }));
  }, [currentPage]);

  useEffect(() => {
    dispatch(getEventDetailAction(id));
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <EventDetailContainer>
      <PageHeaderComponent
        title={t('Event Details')}
        showBackArrow
        clickBack={() => history.push(UserRoutes.events)}
      >
        <Tabs
          defaultActiveKey={currentSelectTab}
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
        {(currentSelectTab === EventTabsKey.eventInfo && (
          <>
            {(loadingForDetail && (
              <Spin
                spinning={loadingForDetail}
                indicator={<LoadingOutlined style={{ color: 'black' }} spin />}
                size="large"
              />
            )) || <EventInfo data={detailData} />}
          </>
        )) || (
          <TableComponent
            loading={loadingForTicketList}
            currentPage={currentPage}
            currentPageSize={currentPageSize}
            columns={columns}
            tableData={ticketListdata}
            tableDataTotal={ticketListdataTotal}
            paginationChange={(page) => dispatch(paginationChangeAction(page))}
          />
        )}
      </div>
    </EventDetailContainer>
  );
};

export default EventDetail;
