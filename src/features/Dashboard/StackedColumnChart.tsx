import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { Column, G2 } from '@ant-design/charts';
import styled from 'styled-components';

const StackedColumnChartCard = styled(Card)`
  .ant-card-head {
    border: none;
  }
`;

const { Title } = Typography;

const ColumnData = [
  {
    month: 'Jan',
    type: 'Invoice',
    value: 44,
  },
  {
    month: 'Feb',
    type: 'Invoice',
    value: 66,
  },
  {
    month: 'Mar',
    type: 'Invoice',
    value: 41,
  },
  {
    month: 'Apr',
    type: 'Invoice',
    value: 67,
  },
  {
    month: 'May',
    type: 'Invoice',
    value: 22,
  },
  {
    month: 'Jun',
    type: 'Invoice',
    value: 43,
  },
  {
    month: 'Jul',
    type: 'Invoice',
    value: 36,
  },
  {
    month: 'Aug',
    type: 'Invoice',
    value: 52,
  },
  {
    month: 'Sep',
    type: 'Invoice',
    value: 24,
  },
  {
    month: 'Oct',
    type: 'Invoice',
    value: 18,
  },
  {
    month: 'Nov',
    type: 'Invoice',
    value: 36,
  },
  {
    month: 'Dec',
    type: 'Invoice',
    value: 48,
  },
  {
    month: 'Jan',
    type: 'Register',
    value: 1,
  },
  {
    month: 'Feb',
    type: 'Register',
    value: 20,
  },
  {
    month: 'Mar',
    type: 'Register',
    value: 19,
  },
  {
    month: 'Apr',
    type: 'Register',
    value: 17,
  },
  {
    month: 'May',
    type: 'Register',
    value: 18,
  },
  {
    month: 'Jun',
    type: 'Register',
    value: 9,
  },
  {
    month: 'Jul',
    type: 'Register',
    value: 20,
  },
  {
    month: 'Aug',
    type: 'Register',
    value: 13,
  },
  {
    month: 'Sep',
    type: 'Register',
    value: 12,
  },
  {
    month: 'Oct',
    type: 'Register',
    value: 8,
  },
  {
    month: 'Nov',
    type: 'Register',
    value: 12,
  },
  {
    month: 'Dec',
    type: 'Register',
    value: 30,
  },
  {
    month: 'Jan',
    type: 'Subcription',
    value: 30,
  },
  {
    month: 'Feb',
    type: 'Subcription',
    value: 50,
  },
  {
    month: 'Mar',
    type: 'Subcription',
    value: 16,
  },
  {
    month: 'Apr',
    type: 'Subcription',
    value: 21,
  },
  {
    month: 'May',
    type: 'Subcription',
    value: 35,
  },
  {
    month: 'Jun',
    type: 'Subcription',
    value: 10,
  },
  {
    month: 'Jul',
    type: 'Subcription',
    value: 12,
  },
  {
    month: 'Aug',
    type: 'Subcription',
    value: 15,
  },
  {
    month: 'Sep',
    type: 'Subcription',
    value: 26,
  },
  {
    month: 'Oct',
    type: 'Subcription',
    value: 38,
  },
  {
    month: 'Nov',
    type: 'Subcription',
    value: 12,
  },
  {
    month: 'Dec',
    type: 'Subcription',
    value: 60,
  },
];

const StackedColumnChart = () => {
  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link',
      },
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink',
      },
    ],
  });
  const config = {
    data: ColumnData,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    isStack: true,
    color: ['#556ee6', '#f1b44c', '#34c38f'],
    maxColumnWidth: 10,
    interactions: [
      { type: 'element-highlight-by-color' },
      { type: 'element-link' },
    ],
  };
  return (
    <StackedColumnChartCard title={<Title level={5}>Email Sent</Title>}>
      <Row justify="center" align="top">
        <Col span={24}>
          <Column {...config} />
        </Col>
      </Row>
    </StackedColumnChartCard>
  );
};

export default StackedColumnChart;
