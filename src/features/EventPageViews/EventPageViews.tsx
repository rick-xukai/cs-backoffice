import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, DatePicker, Row, Skeleton, Grid, message } from 'antd';
import { Line, Column } from '@ant-design/plots';
import { flatten, isArray, isEmpty, orderBy } from 'lodash';

import moment from 'moment';
import PageHeaderComponent from '../../components/PageHeader/PageHeader';
import { AuthRoutes, UserRoutes } from '../../navigation/Routes';
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
  reset,
  selectLoading,
  selectPageViewsAnalysisData,
  selectPageViewsAnalysisLoading,
  selectPageViewsData,
} from './EventPageViews.slice';
import NoData from '../../components/NoData/NoData';
import { getDays } from '../../utils/func';
import { FormatTimeKeys } from '../../constants/Keys';
import useSearchParams from '../../hooks/useSearchParams';
import { Colors } from '../../theme';
import { PieTooltip } from '../UniqueBuyers/UniqueBuyers.component';
import { TokenExpireResponseCode } from '../../constants/General';

const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;
const EventPageViews = () => {
  const params: any = useParams();
  const pamasStartDate = useSearchParams('startDate');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const eventPageViews = useAppSelector(selectPageViewsData);
  const pageViewsAnalysisData = useAppSelector(selectPageViewsAnalysisData);
  const pageViewsAnalysisLoading = useAppSelector(
    selectPageViewsAnalysisLoading,
  );
  const loading = useAppSelector(selectLoading);
  const { name, summary, countries, origins } = eventPageViews;
  const [startDate, setStartDate] = useState(
    pamasStartDate
      ? moment(pamasStartDate).format(FormatTimeKeys.ymd)
      : moment().format(FormatTimeKeys.ymd),
  );
  const [endDate, setEndDate] = useState(moment().format(FormatTimeKeys.ymd));
  const { lg } = useBreakpoint();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res: any = await dispatch(getEventPageViewsAction(params.id));
      if (res.payload?.code === TokenExpireResponseCode) {
        history.push(AuthRoutes.login);
        message.error({
          content: t('User token is deprecated, please log in again.'),
          key: 'expired',
        });
      }
    })();
    return () => {
      dispatch(reset());
    };
  }, []);
  useEffect(() => {
    dispatch(
      getEventPageViewsAnalysisAction({
        eventId: params.id,
        startDate,
        endDate,
      }),
    );
  }, [startDate, endDate]);
  const parsedData = flatten(
    pageViewsAnalysisData && isArray(pageViewsAnalysisData)
      ? pageViewsAnalysisData?.map((item) => [
          {
            date: moment(item.date).format(FormatTimeKeys.mDy),
            type: 'Total Page Views',
            value: item.pageViewTotal || 0,
          },
          {
            date: moment(item.date).format(FormatTimeKeys.mDy),
            type: 'Unique Visitor Page Views',
            value: item.pageViewUserCount || 0,
          },
          {
            type: 'Ticket Sold',
            date: moment(item.date).format(FormatTimeKeys.mDy),
            value: item.ticketSoldCount || 0,
          },
        ])
      : [],
  );
  const dates = getDays(startDate, endDate);
  const totalPageViewsEmptyData = dates.map((item) => ({
    date: item,
    type: 'Total Page Views',
    value: null,
  }));
  const uniqueVisitorPageViewsEmptyData = dates.map((item) => ({
    date: item,
    type: 'Unique Visitor Page Views',
    value: null,
  }));
  const ticketSoldEmptyData = dates.map((item) => ({
    date: item,
    type: 'Ticket Sold',
    value: null,
  }));
  const config = {
    data: isEmpty(parsedData)
      ? [
          ...totalPageViewsEmptyData,
          ...uniqueVisitorPageViewsEmptyData,
          ...ticketSoldEmptyData,
        ]
      : parsedData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    color: ['#056790', '#FCA119', '#FC0006'],
    point: {
      size: 5,
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
        style: {
          fill: Colors.black4,
        },
      },
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
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          background: 'none',
          boxShadow: 0,
        },
      },
      customContent: (a: any, b: any) => (
        <PieTooltip>
          {a}: {b[0]?.value || 0}
        </PieTooltip>
      ),
    },
  };

  const countriesCount = (countries || []).reduce((a, b) => a + b.count, 0);
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
            <Card bodyStyle={{ padding: 20 }} bordered={false}>
              <Title>
                <p>Overview</p>
                <RangePicker
                  onChange={(date, dateString) => {
                    setStartDate(dateString[0]);
                    setEndDate(dateString[1]);
                  }}
                  value={[
                    startDate ? moment(startDate) : null,
                    endDate ? moment(endDate) : null,
                  ]}
                  style={{ height: 32 }}
                  disabledDate={(currentDate) => {
                    // const tooLate =
                    //   startDate && currentDate.diff(startDate, 'days') <= 0;
                    // const tooEarly =
                    //   endDate &&
                    //   moment(endDate).diff(
                    //     currentDate.format(FormatTimeKeys.ymd),
                    //     'days',
                    //   ) <= 0;
                    const afterToday = currentDate > moment();
                    return afterToday;
                  }}
                />
              </Title>
              {pageViewsAnalysisLoading ? (
                <Skeleton />
              ) : (
                <Line
                  {...config}
                  tooltip={{
                    domStyles: {
                      'g2-tooltip': {
                        background: 'none',
                        boxShadow: 0,
                      },
                    },
                    customContent: (a: any, b: any) => (
                      <PieTooltip>
                        <div>
                          <b>{a}</b>
                        </div>
                        <div>
                          {b[0]?.name}: {b[0]?.value || 0}
                        </div>
                        <div>
                          {b[1]?.name}: {b[1]?.value || 0}
                        </div>
                        <div>
                          {b[2]?.name}: {b[2]?.value || 0}
                        </div>
                      </PieTooltip>
                    ),
                  }}
                  legend={{
                    position: lg ? 'right' : 'bottom',
                    padding: [lg ? 0 : 20, 0, 0, 20],
                    label: {
                      style: {
                        stroke: Colors.black,
                      },
                    },
                  }}
                  yAxis={{
                    position: 'right',
                    label: {
                      style: {
                        fill: Colors.black4,
                      },
                    },
                  }}
                />
              )}
            </Card>
          </Col>
          <Col lg={12} span={24}>
            <Card
              bodyStyle={{ padding: 20 }}
              bordered={false}
              loading={loading}
            >
              <Title>
                <p>Page Views by Country</p>
              </Title>
              <ProgressContent>
                {countries && countries.length && Array.isArray(countries) ? (
                  <Row gutter={[0, 18]}>
                    {orderBy(countries || [], ['count'], ['desc']).map(
                      (item) => (
                        <Col span={24} key={item.name}>
                          <ProgressBar
                            name={item.name}
                            percent={Math.round(
                              (item.count / countriesCount) * 100,
                            )}
                            count={item.count}
                          />
                        </Col>
                      ),
                    )}
                  </Row>
                ) : (
                  <div style={{ marginTop: 30 }}>
                    <NoData />
                  </div>
                )}
              </ProgressContent>
            </Card>
          </Col>
          <Col lg={12} span={24}>
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
                height={148}
                maxColumnWidth={45}
                xAxis={{
                  label: {
                    autoHide: false,
                    autoRotate: true,
                    style: {
                      fill: Colors.black4,
                    },
                  },
                }}
                yAxis={{
                  label: {
                    style: {
                      fill: Colors.black4,
                    },
                  },
                }}
                data={
                  !isEmpty(origins) && Array.isArray(origins)
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
