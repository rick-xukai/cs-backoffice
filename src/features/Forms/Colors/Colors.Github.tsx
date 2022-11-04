import React, { useState } from 'react';
import { Card } from 'antd';
import { GithubPicker, ColorResult } from 'react-color';
import styled from 'styled-components';

const PickerBox = styled.div`
  * {
    box-sizing: unset;
  }
`;

const FormColorsGithub = () => {
  const [color, setColor] = useState('#000000');

  return (
    <Card title="Github">
      <PickerBox>
        <GithubPicker
          color={color}
          onChange={(v: ColorResult) => setColor(v.hex)}
        />
      </PickerBox>
      <div style={{ marginTop: 24 }}>HEX: {color}</div>
    </Card>
  );
};

export default FormColorsGithub;
