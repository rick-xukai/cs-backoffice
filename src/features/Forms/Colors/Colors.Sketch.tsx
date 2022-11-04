import React, { useState } from 'react';
import { Card } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';

import { DefaultColor } from './constants';
import DisplayColors from './Component.DisplayColors';

const FormColorsSketch = () => {
  const [color, setColor] = useState<ColorResult>(DefaultColor);

  return (
    <Card title="Sketch">
      <SketchPicker
        color={color.rgb}
        onChange={(v: ColorResult) => setColor(v)}
      />
      <DisplayColors color={color} />
    </Card>
  );
};

export default FormColorsSketch;
