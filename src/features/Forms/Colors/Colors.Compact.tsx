import React, { useState } from 'react';
import { Card } from 'antd';
import { CompactPicker, ColorResult } from 'react-color';

const FormColorsCompact = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Twitter">
      <CompactPicker
        color={color}
        onChange={(v: ColorResult) => setColor(v.hex)}
      />
    </Card>
  );
};

export default FormColorsCompact;
