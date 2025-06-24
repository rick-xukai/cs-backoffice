import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import {
  DataZoomComponent,
  ToolboxComponent,
  VisualMapComponent,
  GeoComponent,
  TooltipComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { Grid } from 'antd';

import { ProgressContainer, ProgressInfo } from './UniqueBuyers.component';
import mapData from '../../data/country.json';
import { Colors } from '../../theme';
const { useBreakpoint } = Grid;

echarts.use([
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  DataZoomComponent,
  ToolboxComponent,
  VisualMapComponent,
  MapChart,
  GeoComponent,
  TooltipComponent,
]);

export const ProgressBar = ({
  name,
  count,
  percent,
  empty,
}: {
  name: string;
  count: number | string;
  percent: number | string;
  empty?: boolean;
}) => (
  <>
    <ProgressInfo>
      <p className="title">{empty ? '-' : name}</p>
      <div className="right-info">
        <p className="count">{empty ? '-' : count}</p>
        <p className="percent">{empty ? '' : `${percent}%`}</p>
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
    if (!mapRef.current) return () => {}; // 返回空的清理函数

    try {
      echarts.registerMap('world', JSON.stringify(mapData));
      const myChart = echarts.init(mapRef.current as unknown as HTMLDivElement);

      const option = {
        visualMap: {
          show: false,
          min: 0,
          max: Math.max(...data.map((item) => item.value), 100),
          inRange: {
            color: [Colors.red5, Colors.branding, Colors.red4],
          },
          text: ['High', 'Low'],
          calculable: true,
          padding: 0,
        },
        tooltip: {
          trigger: 'item',
          show: true,
          borderWidth: 0,
          formatter: (params: any) => `${params.name}: ${params.value || '0'}`,
        },
        series: [
          {
            name: 'UniqueUsers',
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

      // 窗口大小变化时重新调整
      const handleResize = () => {
        myChart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    } catch (error) {
      return () => {}; // 返回空的清理函数
    }
  }, [points, data]);

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
