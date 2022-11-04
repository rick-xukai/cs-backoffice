import React, { useState } from 'react';
import { Card } from 'antd';
import { SwatchesPicker, ColorResult } from 'react-color';

const FormColorsSwatches = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Circle">
      <SwatchesPicker
        color={color}
        onChange={(v: ColorResult) => setColor(v.hex)}
      />
      <div style={{ marginTop: 24 }}>HEX: {color}</div>
    </Card>
  );
};

export default FormColorsSwatches;
