import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import { CSSProperties } from 'styled-components';

import { Gauge } from '@ant-design/plots';
import { isEmpty } from 'lodash';
import {
  BannerWrapper,
  BottomBar,
  CardWrapper,
  DashboardListCardWrapper,
  InfoWrapper,
  NormalListItemWrapper,
  RankingListItemWrapper,
} from './EventDashboard.component';
import { getBadge } from '../Events/Events';
import { Colors, Images } from '../../theme';
import NoData from '../../components/NoData';

export const Banner = ({
  title,
  status,
  time,
  img,
}: {
  title: string;
  status: any;
  time: string;
  img: string;
}) => (
  <BannerWrapper>
    <div className="content">
      <div>{getBadge(status)}</div>
      <div className="title">{title}</div>
      <div className="time">
        <img src={Images.ClockWhiteIcon} alt="" className="clock" /> {time}
      </div>
    </div>
    <div className="banner-image-wrapper">
      <img src={img} alt="" className="banner-image" />
    </div>
  </BannerWrapper>
);

const Info = ({
  infoJustify,
  style,
  title,
  tooltip,
}: {
  infoJustify?: 'center' | 'left' | 'right';
  style?: CSSProperties;
  title: React.ReactNode;
  tooltip?: React.ReactNode;
}) => (
  <InfoWrapper justify={infoJustify} style={style}>
    <div className="info">{title}</div>
    <Tooltip title={tooltip}>
      <img src={Images.AlertCircleIcon} alt="" />
    </Tooltip>
  </InfoWrapper>
);

export const DashboardChartCard = ({
  total,
  current,
  ticketsImported,
}: {
  total: number;
  current: number;
  ticketsImported: number;
}) => {
  const config: any = {
    range: {
      color: `l(0) 0:${Colors.red1} 1:${Colors.red2}`,
    },
    innerRadius: 0.75,
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -10,
        style: {
          fontSize: '24px',
          color: Colors.branding,
          fontWeight: 700,
        },
        formatter: (e: any) =>
          `${e.percent ? (e.percent * 100).toFixed(2) : 0}%`,
      },
    },
  };
  return (
    <CardWrapper hoverable>
      <Row justify="end" style={{ marginBottom: 15 }}>
        <Col>
          <img src={Images.CardArrowIcon} alt="" />
        </Col>
      </Row>
      <Gauge
        {...config}
        percent={current / total}
        height={103}
        padding={0}
        width={137}
      />
      <div className="text-container">
        <span className="large-text">{current}</span>
        <span className="small-text"> / {total}</span>
      </div>
      <Info
        infoJustify="center"
        style={{ marginTop: 4 }}
        title="Tickets Sold"
      />
      <BottomBar style={{ marginTop: 24 }}>
        <div className="left">Tickets Imported</div>
        <div className="right">{ticketsImported}</div>
      </BottomBar>
    </CardWrapper>
  );
};

export const NormalCard = ({
  href,
  title,
  tooltip,
  text,
  barTitle,
  value,
}: {
  href?: string;
  title: React.ReactNode;
  tooltip?: React.ReactNode;
  text: React.ReactNode;
  barTitle: string;
  value: React.ReactNode;
}) => (
  <CardWrapper hoverable={!!href}>
    <Row justify="space-between" align="middle">
      <Col>
        <Info style={{ marginTop: 4 }} title={title} tooltip={tooltip} />
      </Col>
      {href ? (
        <Col>
          <img src={Images.CardArrowIcon} alt="" />
        </Col>
      ) : null}
    </Row>
    <div style={{ marginTop: 10.5 }}>
      <span className="large-text">{text}</span>
    </div>
    <BottomBar style={{ marginTop: 12 }}>
      <div className="left">{barTitle}</div>
      <div className="right">{value}</div>
    </BottomBar>
  </CardWrapper>
);

const NormalListItem = ({
  img,
  title,
  ticketsImported,
  current,
  total,
}: {
  img?: string;
  title: string;
  ticketsImported?: number;
  current: number;
  total: number;
}) => (
  <NormalListItemWrapper>
    <Row gutter={16} align="middle">
      <Col>
        <img src={img} alt="" />
      </Col>
      <Col flex="auto">
        <Row justify="space-between" align="middle">
          <Col>
            <p className="title">{title}</p>
            <p className="sub-title">
              Tickets Imported <b>{ticketsImported || 0}</b>
            </p>
          </Col>
          <Col>
            <p className="numbers">
              <b>{current}</b> / {total || 'Unlimited'}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </NormalListItemWrapper>
);

const rankingIcons: any = {
  0: Images.ChampionIcon,
  1: Images.RunnerUpIcon,
  2: Images.ThirdPlaceIcon,
};

const RankingListItem = ({
  title,
  current,
  total,
  index,
}: {
  title: string;
  current: number;
  total: number;
  index: number;
}) => (
  <RankingListItemWrapper>
    <Row gutter={16} style={{ height: 21 }}>
      <Col>
        {index < 3 ? (
          <img src={rankingIcons[index]} alt="" />
        ) : (
          <div className="rank-number">{index + 1}</div>
        )}
      </Col>
      <Col flex="auto">
        <Row justify="space-between">
          <Col>
            <p className="title">{title}</p>
          </Col>
          <Col>
            <p className="numbers">
              <b>{current}</b> / {total || 'Unlimited'}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  </RankingListItemWrapper>
);

export const DashboardListCard = ({
  ranking,
  data = [],
  title,
}: {
  ranking?: boolean;
  data: {
    image?: string;
    title: string;
    ticketsImported?: number;
    current: number;
    total: number;
  }[];
  title: string;
}) => (
  <DashboardListCardWrapper>
    <p className="title">{title}</p>
    {isEmpty(data) ? (
      <ul className="list" style={{ paddingTop: 20 }}>
        <NoData />
      </ul>
    ) : (
      <>
        {ranking ? (
          <ul className="list">
            {data.map((item, index: number) => (
              <RankingListItem
                title={item.title}
                current={item.current}
                total={item.total}
                key={item.title}
                index={index}
              />
            ))}
          </ul>
        ) : (
          <ul className="list">
            {data.map((item) => (
              <NormalListItem
                title={item.title}
                img={item.image}
                current={item.current}
                total={item.total}
                key={item.title}
                ticketsImported={item.ticketsImported}
              />
            ))}
          </ul>
        )}
      </>
    )}
  </DashboardListCardWrapper>
);
