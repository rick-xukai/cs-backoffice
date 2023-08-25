import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, DatePicker, Row } from 'antd';
import { Line, Column } from '@ant-design/plots';

import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import {
  PageContainer,
  ProgressContent,
  Title,
} from './EventPageViews.component';
import { ContainerTitle } from '../TicketsSold/TicketsSoldComponent';
import { ProgressBar } from './EventPageViews.components';

const { RangePicker } = DatePicker;

const EventPageViews = () => {
  const params: any = useParams();
  const { t } = useTranslation();
  const config = {
    data: [
      { type: 'Total Page Views', date: 1965, value: 1390.5 },
      { type: 'Total Page Views', date: 1966, value: 1469.5 },
      { type: 'Total Page Views', date: 1967, value: 1521.7 },
      { type: 'Total Page Views', date: 1968, value: 1615.9 },
      { type: 'Total Page Views', date: 1969, value: 1703.7 },
      { type: 'Total Page Views', date: 1970, value: 1767.8 },
      { type: 'Total Page Views', date: 1971, value: 1806.2 },
      { type: 'Total Page Views', date: 1972, value: 1903.5 },
      { type: 'Total Page Views', date: 1973, value: 1986.6 },
      { type: 'Total Page Views', date: 1974, value: 1952 },
      { type: 'Total Page Views', date: 1975, value: 1910.4 },
      { type: 'Total Page Views', date: 1976, value: 0.8 },
      { type: 'Total Page Views', date: 1977, value: 2074.7 },
      { type: 'Total Page Views', date: 1978, value: 2092.7 },
      { type: 'Total Page Views', date: 1979, value: 2123.8 },
      { type: 'Total Page Views', date: 1980, value: 2068.3 },
      { type: 'Total Page Views', date: 1981, value: 2018 },
      { type: 'Total Page Views', date: 1982, value: 1951.5 },
      { type: 'Unique Visitor Page Views', date: 1965, value: 290.5 },
      { type: 'Unique Visitor Page Views', date: 1966, value: 369.5 },
      { type: 'Unique Visitor Page Views', date: 1967, value: 221.7 },
      { type: 'Unique Visitor Page Views', date: 1968, value: 415.9 },
      { type: 'Unique Visitor Page Views', date: 1969, value: 103.7 },
      { type: 'Unique Visitor Page Views', date: 1970, value: 267.8 },
      { type: 'Unique Visitor Page Views', date: 1971, value: 506.2 },
      { type: 'Unique Visitor Page Views', date: 1972, value: 403.5 },
      { type: 'Unique Visitor Page Views', date: 1973, value: 86.6 },
      { type: 'Unique Visitor Page Views', date: 1974, value: 252 },
      { type: 'Unique Visitor Page Views', date: 1975, value: 910.4 },
      { type: 'Unique Visitor Page Views', date: 1976, value: 2015.8 },
      { type: 'Unique Visitor Page Views', date: 1977, value: 14.7 },
      { type: 'Unique Visitor Page Views', date: 1978, value: 92.7 },
      { type: 'Unique Visitor Page Views', date: 1979, value: 23.8 },
      { type: 'Unique Visitor Page Views', date: 1980, value: 18.3 },
      { type: 'Unique Visitor Page Views', date: 1981, value: 8 },
      { type: 'Unique Visitor Page Views', date: 1982, value: 51.5 },
      { type: 'Ticket Sold', date: 1965, value: 90.5 },
      { type: 'Ticket Sold', date: 1966, value: 69.5 },
      { type: 'Ticket Sold', date: 1967, value: 21.7 },
      { type: 'Ticket Sold', date: 1968, value: 15.9 },
      { type: 'Ticket Sold', date: 1969, value: 3.7 },
      { type: 'Ticket Sold', date: 1970, value: 67.8 },
      { type: 'Ticket Sold', date: 1971, value: 6.2 },
      { type: 'Ticket Sold', date: 1972, value: 3.5 },
      { type: 'Ticket Sold', date: 1973, value: 86.6 },
      { type: 'Ticket Sold', date: 1974, value: 52 },
      { type: 'Ticket Sold', date: 1975, value: 10.4 },
      { type: 'Ticket Sold', date: 1976, value: 15.8 },
      { type: 'Ticket Sold', date: 1977, value: 4.7 },
      { type: 'Ticket Sold', date: 1978, value: 2.7 },
      { type: 'Ticket Sold', date: 1979, value: 23.8 },
      { type: 'Ticket Sold', date: 1980, value: 8.3 },
      { type: 'Ticket Sold', date: 1981, value: 8 },
      { type: 'Ticket Sold', date: 1982, value: 51.5 },
    ],
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ['#056790', '#FCA119', '#FC0006'],
    point: {
      size: 2,
    },
  };
  return (
    <>
      <PageHeaderComponent
        breadcrumb={[
          {
            label: t('Events'),
            href: UserRoutes.events,
          },
          {
            label: params.name,
            href: UserRoutes.eventDashboard
              .replace(':id', params.id)
              .replace(':name', params.name),
          },
          {
            label: t('Tickets sold'),
          },
        ]}
      />
      <PageContainer>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ContainerTitle>
              <Col span={12}>
                <div className="info-content">
                  <div>
                    <p className="content-title">{t('Event page views')}</p>
                    <p className="content-name">{params.name}</p>
                  </div>
                </div>
              </Col>
              <Col span={12} className="right">
                <div className="info-content">
                  <div>
                    <p className="content-info">
                      <span></span>
                      <span className="bold content-title-sold large-text">
                        1
                      </span>
                    </p>
                    <p className="content-info">
                      <span>Average Daily Visits</span>
                      <span className="bold">2</span>
                    </p>
                  </div>
                </div>
              </Col>
            </ContainerTitle>
          </Col>
          <Col span={24}>
            <Card bodyStyle={{ padding: 20 }} bordered={false}>
              <Title>
                <p>Overview</p>
                <RangePicker style={{ height: 32 }} />
              </Title>
              <Line
                {...config}
                legend={{ position: 'right', padding: [0, 0, 0, 20] }}
                yAxis={{ position: 'right' }}
              />
            </Card>
          </Col>
          <Col lg={12} sm={24}>
            <Card bodyStyle={{ padding: 20 }} bordered={false}>
              <Title>
                <p>Page Views by Country</p>
              </Title>
              <ProgressContent>
                <Row gutter={[0, 18]}>
                  <Col span={24}>
                    <ProgressBar name="Singapore" percent={90} count={100} />
                  </Col>
                  <Col span={24}>
                    <ProgressBar name="China" percent={90} count={100} />
                  </Col>
                  <Col span={24}>
                    <ProgressBar name="USA" percent={90} count={100} />
                  </Col>
                </Row>
              </ProgressContent>
            </Card>
          </Col>
          <Col lg={12} sm={24}>
            <Card bodyStyle={{ padding: 20 }} bordered={false}>
              <Title>
                <p>Page Views Origin</p>
              </Title>
              <Column
                {...config}
                legend={false}
                height={148}
                data={[
                  { type: 'Page Views Origin', date: 1965, value: 1390.5 },
                  { type: 'Page Views Origin', date: 1966, value: 1469.5 },
                  { type: 'Page Views Origin', date: 1967, value: 1521.7 },
                  { type: 'Page Views Origin', date: 1968, value: 1615.9 },
                  { type: 'Page Views Origin', date: 1969, value: 1703.7 },
                  { type: 'Page Views Origin', date: 1970, value: 1767.8 },
                  { type: 'Page Views Origin', date: 1971, value: 1806.2 },
                  { type: 'Page Views Origin', date: 1972, value: 1903.5 },
                ]}
                color="#FC0006"
              />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};
export default EventPageViews;
