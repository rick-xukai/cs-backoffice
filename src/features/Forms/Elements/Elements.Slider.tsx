import React from 'react';
import { Row, Col, Typography, Form, Slider } from 'antd';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

const ElementsSlider = () => (
  <>
    <Row>
      <Col>
        <Typography.Title level={5}>Slider</Typography.Title>
      </Col>
    </Row>
    <Row justify="center" align="top">
      <Col span={24}>
        <Form
          initialValues={{
            defaultSlider: 30,
            stepSlider: 10,
            rangeSlider: [20, 50],
            formatTipSlider: 30,
            hideTipSlider: 30,
            marksSlider: 30,
            marksAndStepSlider: 26,
            draggableTrackSlider: [20, 50],
            reversedSlider: 30,
          }}
        >
          <Form.Item label="Default Slider" name="defaultSlider">
            <Slider />
          </Form.Item>
          <Form.Item label="Step Slider" name="stepSlider">
            <Slider step={10} />
          </Form.Item>
          <Form.Item label="Range Slider" name="rangeSlider">
            <Slider range />
          </Form.Item>
          <Form.Item label="Format Tip" name="formatTipSlider">
            <Slider tipFormatter={(value) => `${value}%`} />
          </Form.Item>
          <Form.Item label="Hide Tip" name="hideTipSlider">
            <Slider tooltipVisible={false} />
          </Form.Item>
          <Form.Item label="Marks Slider" name="marksSlider">
            <Slider marks={marks} />
          </Form.Item>
          <Form.Item label="marks && step=null" name="marksAndStepSlider">
            <Slider marks={marks} step={null} />
          </Form.Item>
          <Form.Item label="Draggable Track" name="draggableTrackSlider">
            <Slider range={{ draggableTrack: true }} />
          </Form.Item>
          <Form.Item label="Reversed Slider" name="reversedSlider">
            <Slider reverse />
          </Form.Item>
          <Form.Item label="Vertical Slider" name="verticalSlider">
            <div style={{ height: 150 }}>
              <Slider vertical defaultValue={30} />
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </>
);

export default ElementsSlider;
