import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Grid } from 'antd';

import { useParams, useHistory } from 'react-router-dom';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import {
  Banner,
  DashbaordChartCard,
  DashbaordListCard,
  NormalCard,
} from './EventDashboard.components';
import {
  ContentWrapper,
  EventDsahboardContainer,
} from './EventDashboard.component';
import { SGD_UNIT } from '../../constants/constants';

const { useBreakpoint } = Grid;

const EventDashboard = () => {
  const { t } = useTranslation();
  const { lg } = useBreakpoint();
  const history = useHistory();
  const dashbaordChartCard = (
    <DashbaordChartCard total={100} current={10} ticketsImported={10} />
  );
  const params: any = useParams();
  const { name, id } = params;

  const uniqueBuyers = (
    <NormalCard
      title="Unique Buyers"
      href=" "
      text="162"
      barTitle="Conversion Rate"
      value="20%"
    />
  );
  const eventPageViewsCard = (
    <NormalCard
      title="Event Page Views"
      href=" "
      text="110"
      barTitle="Average Daily Visits"
      value={90}
    />
  );
  const notSalesCard = (
    <NormalCard
      title="Not Sales"
      text={`${SGD_UNIT} 100`}
      barTitle="Gross Sales"
      value={`${SGD_UNIT} 9562.76`}
    />
  );

  return (
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
        title="Escape to Paradise - Pool Party"
        status={1}
        time="Feb 26 2023, 19:30 - Feb 26 2023, 22:30"
        img="https://crowdserve-ticket-images-dev.s3-ap-southeast-1.amazonaws.com/events/1690940498743-Eqeg.jpg"
      />
      <ContentWrapper>
        {lg ? (
          <Row gutter={[16, 16]}>
            <Col
              span={8}
              onClick={() =>
                history.push(
                  UserRoutes.ticketSold
                    .replace(':id', id)
                    .replace(':name', name.toLowerCase()),
                )
              }
            >
              {dashbaordChartCard}
            </Col>
            <Col span={16}>
              <Row gutter={[16, 19]}>
                <Col span={12}>{uniqueBuyers}</Col>
                <Col span={12}>{eventPageViewsCard}</Col>
                <Col span={24}>{notSalesCard}</Col>
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
                  <Col span={20}>{dashbaordChartCard}</Col>
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
              <Col span={24}>{notSalesCard}</Col>
            </Row>
          </div>
        )}
        <Row
          gutter={lg ? [16, 16] : [12, 12]}
          style={{ marginTop: lg ? 16 : 12 }}
        >
          <Col lg={12} span={24}>
            <DashbaordListCard
              title="Ticket Type Sales"
              data={[
                {
                  title: 'VIP',
                  image:
                    'https://crowdserve-ticket-images-dev.s3-ap-southeast-1.amazonaws.com/events/1690882892062-Lu3l.jpg',
                  current: 0,
                  total: 200,
                  ticketsImported: 10,
                },
                {
                  title: 'SVIP',
                  image:
                    'https://crowdserve-ticket-images-dev.s3-ap-southeast-1.amazonaws.com/events/1690882892062-Lu3l.jpg',
                  current: 0,
                  total: 200,
                  ticketsImported: 10,
                },
                {
                  title: 'VVIP',
                  image:
                    'https://crowdserve-ticket-images-dev.s3-ap-southeast-1.amazonaws.com/events/1690882892062-Lu3l.jpg',
                  current: 0,
                  total: 200,
                  ticketsImported: 0,
                },
              ]}
            />
          </Col>
          <Col lg={12} span={24}>
            <DashbaordListCard
              title="Discount Ranking"
              ranking
              data={[
                {
                  title: 'Anniversary',
                  current: 0,
                  total: 0,
                },
                {
                  title: 'Happy',
                  current: 0,
                  total: 0,
                },
                {
                  title: 'Celebration',
                  current: 0,
                  total: 20,
                },
                {
                  title: 'Yoo',
                  current: 0,
                  total: 20,
                },
              ]}
            />
          </Col>
        </Row>
      </ContentWrapper>
    </EventDsahboardContainer>
  );
};
export default EventDashboard;
