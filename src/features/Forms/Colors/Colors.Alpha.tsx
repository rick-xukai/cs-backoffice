import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import { AlphaPicker, HuePicker, ColorResult } from 'react-color';

import { DefaultColor } from './constants';
import DisplayColors from './Component.DisplayColors';

const FormColorsAlpha = () => {
  const [color, setColor] = useState<ColorResult>(DefaultColor);

  const onChange = (v: ColorResult) => {
    setColor(v);
  };

  return (
    <Card title="Alpha">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <HuePicker color={color.rgb} onChange={onChange} />
        </Col>
        <Col span={24}>
          <AlphaPicker color={color.rgb} onChange={onChange} />
        </Col>
        <Col span={24}>
          <DisplayColors color={color} />
        </Col>
      </Row>
    </Card>
  );
};

export default FormColorsAlpha;
