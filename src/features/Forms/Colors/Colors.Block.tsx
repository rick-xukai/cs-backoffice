import React, { useState } from 'react';
import { Card } from 'antd';
import { BlockPicker, ColorResult } from 'react-color';

const colors = [
  '#D9E3F0',
  '#F47373',
  '#697689',
  '#37D67A',
  '#2CCCE4',
  '#555555',
  '#dce775',
  '#ff8a65',
  '#ba68c8',
];

const FormColorsBlock = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Block">
      <BlockPicker
        color={color}
        colors={colors}
        onChange={(v: ColorResult) => setColor(v.hex)}
      />
    </Card>
  );
};

export default FormColorsBlock;
