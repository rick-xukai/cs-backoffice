import React, { useState } from 'react';
import { Row, Col, Card, Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const UIProgressDynamic = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    let percent = value + 10;
    if (percent > 100) {
      percent = 100;
    }
    setValue(percent);
  };
  const decline = () => {
    let percent = value - 10;
    if (percent < 0) {
      percent = 0;
    }
    setValue(percent);
  };

  return (
    <Card title="Dynamic Progress">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Progress type="circle" percent={value} />
          <Progress percent={value} />
        </Col>
        <Col span={24}>
          <Button.Group>
            <Button onClick={decline} icon={<MinusOutlined />} />
            <Button onClick={increase} icon={<PlusOutlined />} />
          </Button.Group>
        </Col>
      </Row>
    </Card>
  );
};

export default UIProgressDynamic;
