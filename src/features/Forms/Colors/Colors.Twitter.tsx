import React, { useState } from 'react';
import { Card } from 'antd';
import { TwitterPicker, ColorResult } from 'react-color';

const FormColorsTwitter = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Twitter">
      <TwitterPicker
        color={color}
        onChange={(v: ColorResult) => setColor(v.hex)}
      />
    </Card>
  );
};

export default FormColorsTwitter;
