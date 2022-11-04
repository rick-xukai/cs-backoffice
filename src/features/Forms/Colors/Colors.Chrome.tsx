import React, { useState } from 'react';
import { Card } from 'antd';
import { ChromePicker, ColorResult } from 'react-color';

import { DefaultColor } from './constants';
import DisplayColors from './Component.DisplayColors';

const FormColorsChrome = () => {
  const [color, setColor] = useState<ColorResult>(DefaultColor);

  return (
    <Card title="Chrome">
      <ChromePicker
        color={color.rgb}
        onChange={(v: ColorResult) => setColor(v)}
      />
      <DisplayColors color={color} />
    </Card>
  );
};

export default FormColorsChrome;
