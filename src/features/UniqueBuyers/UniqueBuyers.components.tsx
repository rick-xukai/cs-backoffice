import React, { useEffect, useRef } from 'react';
import * as eCharts from 'echarts';
import { Grid } from 'antd';

import { ProgressContainer, ProgressInfo } from './UniqueBuyers.component';
import mapData from '../../data/country.json';
import { Colors } from '../../theme';
const { useBreakpoint } = Grid;
export const ProgressBar = ({
  name,
  count,
  percent,
}: {
  name: string;
  count: number;
  percent: number;
}) => (
  <>
    <ProgressInfo>
      <p className="title">{name}</p>
      <div className="right-info">
        <p className="count">{count}</p>
        <p className="percent">{percent}%</p>
      </div>
    </ProgressInfo>
    <ProgressContainer>
      <div className="content" style={{ width: `${percent || 0}%` }} />
      <div className="line" />
    </ProgressContainer>
  </>
);

export const WorldMap = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const points = useBreakpoint();
  const mapRef: any = useRef();
  useEffect(() => {
    eCharts.registerMap('world', JSON.stringify(mapData));
    const myChart = eCharts.init(mapRef?.current);
    const option = {
      visualMap: {
        show: false,
        inRange: {
          color: [Colors.red5, Colors.branding, Colors.red4],
        },
        text: ['High', 'Low'],
        calculable: true,
        padding: 0,
      },
      series: [
        {
          name: 'Map',
          type: 'map',
          roam: true,
          map: 'world',
          emphasis: {
            label: {
              show: true,
            },
          },
          data,
          itemStyle: {
            borderWidth: 0.5,
            borderColor: '#DCDCE1',
            areaColor: '#EEEEF3',
          },
          zoom: 1.2,
        },
      ],
    };
    myChart.setOption(option);
    myChart.resize();
  }, [points]);
  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 274,
        overflow: 'hidden',
      }}
    />
  );
};
