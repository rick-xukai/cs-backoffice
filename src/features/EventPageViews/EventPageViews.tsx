import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, DatePicker, Row } from 'antd';
import { Line, Column } from '@ant-design/plots';
import { flatten, isArray } from 'lodash';

import moment from 'moment';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { UserRoutes } from '../../navigation/Routes';
import {
  PageContainer,
  ProgressContent,
  Title,
} from './EventPageViews.component';
import { ContainerTitle } from '../TicketsSold/TicketsSoldComponent';
import { ProgressBar } from './EventPageViews.components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getEventPageViewsAction,
  getEventPageViewsAnalysisAction,
  selectLoading,
  selectPageViewsAnalysisData,
  selectPageViewsAnalysisLoading,
  selectPageViewsData,
} from './EventPageViews.slice';
import NoData from '../../components/NoData/NoData';
import { FormatTimeKeys } from '../../constants/Keys';

const { RangePicker } = DatePicker;

const EventPageViews = () => {
  const params: any = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const eventPageViews = useAppSelector(selectPageViewsData);
  const pageViewsAnalysisData = useAppSelector(selectPageViewsAnalysisData);
  const pageViewsAnalysisLoading = useAppSelector(
    selectPageViewsAnalysisLoading,
  );

  const loading = useAppSelector(selectLoading);

  const { name, summary, countries, origins } = eventPageViews;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    dispatch(getEventPageViewsAction(params.id));
  }, []);
  useEffect(() => {
    dispatch(
      getEventPageViewsAnalysisAction({
        eventId: params.id,
        startDate,
        endDate,
      }),
    );
  }, [endDate]);
  const parsedData = flatten(
    pageViewsAnalysisData && isArray(pageViewsAnalysisData)
      ? pageViewsAnalysisData?.map((item) => [
          {
            date: item.date,
            type: 'Total Page Views',
            value: item.pageViewTotal,
          },
          {
            date: item.date,
            type: 'Unique Visitor Page Views',
            value: item.pageViewUserCount,
          },
          {
            type: 'Ticket Sold',
            date: item.date,
            value: item.ticketSoldCount,
          },
        ])
      : [],
  );

  const config = {
    data: parsedData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ['#056790', '#FCA119', '#FC0006'],
    point: {
      size: 5,
    },
  };
  const columnConfig = {
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    color: ['#056790', '#FCA119', '#FC0006'],
    point: {
      size: 5,
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
            label: name,
            href: UserRoutes.eventDashboard
              .replace(':id', params.id)
              .replace(':name', name),
          },
          {
            label: t('Event Page Views'),
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
                    <p className="content-name">{name}</p>
                  </div>
                </div>
              </Col>
              <Col span={12} className="right">
                <div className="info-content">
                  <div>
                    <p className="content-info">
                      <span></span>
                      <span className="bold content-title-sold large-text">
                        {summary?.viewCount}
                      </span>
                    </p>
                    <p className="content-info">
                      <span>Average Daily Visits</span>
                      <span className="bold">
                        {Math.round(summary?.averageDailyCount)}
                      </span>
                    </p>
                  </div>
                </div>
              </Col>
            </ContainerTitle>
          </Col>
          <Col span={24}>
            <Card
              bodyStyle={{ padding: 20 }}
              bordered={false}
              loading={pageViewsAnalysisLoading}
            >
              <Title>
                <p>Overview</p>
                <RangePicker
                  onCalendarChange={(date, dateString) => {
                    setStartDate(dateString[0]);
                    setEndDate(dateString[1]);
                  }}
                  style={{ height: 32 }}
                  disabledDate={(currentDate) => {
                    const tooLate =
                      startDate && currentDate.diff(startDate, 'days') <= 0;
                    const tooEarly =
                      endDate &&
                      moment(endDate).diff(
                        currentDate.format(FormatTimeKeys.ymd),
                        'days',
                      ) <= 0;
                    return !!tooLate || !!tooEarly;
                  }}
                />
              </Title>
              <Line
                {...config}
                legend={{ position: 'right', padding: [0, 0, 0, 20] }}
                yAxis={{ position: 'right' }}
              />
            </Card>
          </Col>
          <Col lg={12} sm={24}>
            <Card
              bodyStyle={{ padding: 20 }}
              bordered={false}
              loading={loading}
            >
              <Title>
                <p>Page Views by Country</p>
              </Title>
              <ProgressContent>
                {countries && countries.length ? (
                  <Row gutter={[0, 18]}>
                    {countries?.map((item) => (
                      <Col span={24} key={item.name}>
                        <ProgressBar
                          name={item.name}
                          percent={item.rate}
                          count={item.count}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div style={{ marginTop: 30 }}>
                    <NoData />
                  </div>
                )}
              </ProgressContent>
            </Card>
          </Col>
          <Col lg={12} sm={24}>
            <Card
              bodyStyle={{ padding: 20 }}
              bordered={false}
              loading={loading}
            >
              <Title>
                <p>Page Views Origin</p>
              </Title>
              <Column
                {...columnConfig}
                legend={false}
                columnWidthRatio={0.25}
                height={148}
                data={
                  origins && origins.length
                    ? origins.map((item) => ({
                        type: 'Page Views Origin',
                        name: item.name,
                        value: item.count,
                      }))
                    : [
                        {
                          type: 'Page Views Origin',
                          name: 'Direct',
                          value: 0,
                        },
                        {
                          type: 'Page Views Origin',
                          name: 'Event List',
                          value: 0,
                        },
                        {
                          type: 'Page Views Origin',
                          name: 'Facebook',
                          value: 0,
                        },
                      ]
                }
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
