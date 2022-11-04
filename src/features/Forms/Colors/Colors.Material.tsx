import React, { useState } from 'react';
import { Card } from 'antd';
import { MaterialPicker, ColorResult } from 'react-color';
import styled from 'styled-components';

const PickerBox = styled.div`
  * {
    box-sizing: unset;
  }
`;

const FormColorsMaterial = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Material">
      <PickerBox>
        <MaterialPicker
          color={color}
          onChange={(v: ColorResult) => setColor(v.hex)}
        />
      </PickerBox>
    </Card>
  );
};

export default FormColorsMaterial;
