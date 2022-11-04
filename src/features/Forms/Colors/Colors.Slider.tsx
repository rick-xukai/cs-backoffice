import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { SliderPicker, ColorResult } from 'react-color';

import { DefaultColor } from './constants';
import DisplayColors from './Component.DisplayColors';

const FormColorsSlider = () => {
  const [color, setColor] = useState<ColorResult>(DefaultColor);

  const onChange = (v: ColorResult) => {
    setColor(v);
  };

  return (
    <Card title="Slider">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <SliderPicker color={color.rgb} onChange={onChange} />
        </Col>
        <Col span={24}>
          <DisplayColors color={color} />
        </Col>
      </Row>
    </Card>
  );
};

export default FormColorsSlider;
