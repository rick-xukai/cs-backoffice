import React from 'react';
import { Space } from 'antd';
import { ColorResult } from 'react-color';

const DisplayColors = ({ color }: { color: ColorResult }) => (
  <Space direction="vertical" style={{ marginTop: 24 }}>
    <span>HEX: {color.hex}</span>
    <span>
      RGB:
      {` rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
    </span>
    <span>
      RGBA:
      {` rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`}
    </span>
  </Space>
);

export default DisplayColors;
