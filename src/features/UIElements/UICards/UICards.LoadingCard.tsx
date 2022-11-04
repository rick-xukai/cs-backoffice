import React, { useState } from 'react';
import { Row, Col, Skeleton, Switch, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const UICardsBasic = ({ t }: { t: any }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Card title={t('Loading Card')}>
      <Row justify="start" align="top" style={{ marginBottom: '16px' }}>
        <Col>
          <Switch
            checked={!loading}
            onChange={() => setLoading((prev) => !prev)}
          />
        </Col>
      </Row>
      <Row justify="start" align="top" gutter={[20, 20]}>
        <Col sm={12} xs={24}>
          <Card loading={loading}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
        <Col sm={12} xs={24}>
          <Card
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default UICardsBasic;
