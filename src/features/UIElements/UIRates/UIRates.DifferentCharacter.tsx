import React from 'react';
import { Row, Col, Card, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const UIRatesDifferentCharacter = () => (
  <Card title="Custom Different Character">
    <Row>
      <Col span={24}>
        <Rate
          defaultValue={2}
          character={({ index }: { index: number }) => index + 1}
        />
      </Col>
      <Col span={24}>
        <Rate
          defaultValue={3}
          character={({ index }: { index: number }) =>
            // @ts-ignore
            customIcons[index + 1]
          }
        />
      </Col>
    </Row>
  </Card>
);

export default UIRatesDifferentCharacter;
