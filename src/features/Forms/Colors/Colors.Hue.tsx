import React, { useState } from 'react';
import { Card } from 'antd';
import { HuePicker, ColorResult } from 'react-color';

const FormColorsHue = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Hue">
      <HuePicker color={color} onChange={(v: ColorResult) => setColor(v.hex)} />
      <div style={{ marginTop: 24 }}>HEX: {color}</div>
    </Card>
  );
};

export default FormColorsHue;
