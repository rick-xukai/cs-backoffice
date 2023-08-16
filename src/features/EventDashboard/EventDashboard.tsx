import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Grid } from 'antd';

import { useParams, useHistory } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import {
  Banner,
  DashboardChartCard,
  DashboardListCard,
  NormalCard,
} from './EventDashboard.components';
import {
  ContentWrapper,
  DashboardListCardWrapper,
  EventDsahboardContainer,
  ExtraText,
} from './EventDashboard.component';
import { MMM_DD_YYYY_HH_MM, SGD_UNIT } from '../../constants/constants';
import TicketsSold from '../TicketsSold/TicketsSold';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getEventDashboardAction,
  reset,
  selectDetailData,
  selectLoading,
} from './EventDashboard.slice';
import BallLoading from '../../components/BallLoading';
import { thousandsSeparator } from '../../utils/func';

const { useBreakpoint } = Grid;

const EventDashboard = () => {
  const { t } = useTranslation();
  const { lg } = useBreakpoint();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectDetailData);
  const {
    buyers,
    name,
    image,
    startTime,
    endTime,
    status,
    pageViews,
    netSales,
    stocks,
    ticketTypes,
    discounts,
  } = data;
  const dashboardChartCard = (
    <DashboardChartCard
      total={stocks?.stockTotal}
      current={stocks?.soldTotal}
      ticketsImported={stocks?.importTotal}
    />
  );
  const params: any = useParams();
  const { id } = params;
  const loading = useAppSelector(selectLoading);
  useEffect(() => {
    dispatch(getEventDashboardAction(id));
    return () => {
      dispatch(reset());
    };
  }, []);

  const uniqueBuyers = (
    <NormalCard
      title="Unique Buyers"
      href=" "
      text={buyers?.userCount || 0}
      barTitle="Conversion Rate"
      value={`${buyers?.conversionRate ? buyers?.conversionRate / 100 : 0}%`}
    />
  );
  const eventPageViewsCard = (
    <NormalCard
      title="Event Page Views"
      href=" "
      text={pageViews?.viewCount || 0}
      barTitle="Average Daily Visits"
      value={pageViews?.averageDailyCount || 0}
    />
  );
  const netSalesCard = (
    <NormalCard
      title="Net Sales"
      text={`${SGD_UNIT} $${
        netSales?.revenue ? thousandsSeparator(`${netSales?.revenue}`) : 0
      }`}
      barTitle="Gross Sales"
      value={`${SGD_UNIT} $${
        netSales?.grossSales ? thousandsSeparator(`${netSales?.grossSales}`) : 0
      }`}
    />
  );

  const goToTicketSold = () => {
    history.push(
      UserRoutes.ticketSold
        .replace(':id', id)
        .replace(':name', name.toLowerCase()),
    );
  };

  return loading ? (
    <BallLoading />
  ) : (
    <EventDsahboardContainer>
      <PageHeaderComponent
        breadcrumb={[
          {
            label: t('Events'),
            href: UserRoutes.events,
          },
          {
            label: name,
          },
        ]}
      />
      <Banner
        title={name}
        status={status}
        time={`${moment(startTime).format(MMM_DD_YYYY_HH_MM)} - ${moment(
          endTime,
        ).format(MMM_DD_YYYY_HH_MM)}`}
        img={image}
      />
      <ContentWrapper>
        {lg ? (
          <Row gutter={[16, 16]}>
            <Col span={8} onClick={goToTicketSold}>
              {dashboardChartCard}
            </Col>
            <Col span={16}>
              <Row gutter={[16, 19]}>
                <Col span={12}>{uniqueBuyers}</Col>
                <Col span={12}>{eventPageViewsCard}</Col>
                <Col span={24}>{netSalesCard}</Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <div>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Row
                  wrap={false}
                  style={{
                    overflow: 'auto',
                    width: 'calc(100vw + 15px)',
                    marginLeft: -15,
                    paddingLeft: 15,
                  }}
                >
                  <Col span={20}>{dashboardChartCard}</Col>
                  <Col span={23}>
                    <Row style={{ paddingRight: 42 }}>
                      <Col
                        span={24}
                        style={{ marginLeft: 12, marginBottom: 12 }}
                      >
                        {uniqueBuyers}
                      </Col>
                      <Col span={24} style={{ marginLeft: 12 }}>
                        {eventPageViewsCard}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>{netSalesCard}</Col>
            </Row>
          </div>
        )}
        <Row
          gutter={lg ? [16, 16] : [12, 12]}
          style={{ marginTop: lg ? 16 : 12 }}
        >
          <Col lg={12} span={24}>
            <DashboardListCard
              title="Ticket Type Sales"
              data={ticketTypes?.map((item) => ({
                title: item.name,
                image: item.image,
                current: item.soldTotal,
                total: item.stock,
                ticketImported: item.importTotal,
              }))}
            />
          </Col>
          <Col lg={12} span={24}>
            <DashboardListCard
              title="Discount Ranking"
              ranking
              data={discounts?.map((item) => ({
                title: item.name,
                current: item.usageCount,
                total: item.limit,
              }))}
            />
          </Col>
          <Col span={24}>
            <DashboardListCardWrapper>
              <p className="title">
                <span>Tickets Sold</span>
                {lg ? (
                  <ExtraText onClick={goToTicketSold}>
                    View All <RightOutlined />
                  </ExtraText>
                ) : null}
              </p>
              <TicketsSold isComponent />
              {lg ? null : (
                <ExtraText
                  onClick={goToTicketSold}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  View All <RightOutlined />
                </ExtraText>
              )}
            </DashboardListCardWrapper>
          </Col>
        </Row>
      </ContentWrapper>
    </EventDsahboardContainer>
  );
};
export default EventDashboard;
