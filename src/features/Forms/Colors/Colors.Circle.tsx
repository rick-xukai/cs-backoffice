import React, { useState } from 'react';
import { Card } from 'antd';
import { CirclePicker, ColorResult } from 'react-color';

const FormColorsCircle = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Circle">
      <CirclePicker
        color={color}
        onChange={(v: ColorResult) => setColor(v.hex)}
      />
      <div style={{ marginTop: 24 }}>HEX: {color}</div>
    </Card>
  );
};

export default FormColorsCircle;
