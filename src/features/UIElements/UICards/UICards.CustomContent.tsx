import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Avatar } from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const ScallCoverCard = styled(Card)`
  .ant-card-cover {
    overflow: hidden;
    img {
      transition: all 0.2s linear;
    }
  }
  :hover {
    .ant-card-cover {
      img {
        transform: scale(1.1);
      }
    }
  }
`;

const CustomBodyCard = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
  .inner-card-body {
    padding: 24px;
  }
  img {
    width: 100%;
  }
`;

const CustomBodyFloatingCard = styled(Card)`
  position: relative;
  .ant-card-body {
    padding: 0;
  }
  .inner-card-body {
    position: absolute;
    padding: 24px;
    bottom: 0;
    left: 0;
    right: 0;
    .ant-card-meta-title {
      color: #fff;
    }
    .ant-card-meta-description {
      color: #fff;
    }
  }
  img {
    width: 100%;
  }
`;

const CustomBodyLeftRightCard = styled(Card)`
  .left {
    img {
      width: 100%;
      height: auto;
    }
  }
  .right {
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const { Meta } = Card;

const UICardsBasic = ({ t }: { t: any }) => (
  <Card title={t('Custom Content Card')}>
    <Row justify="start" align="top" gutter={[20, 20]}>
      <Col sm={8} xs={24}>
        <Card
          hoverable
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </Col>
      <Col sm={8} xs={24}>
        <ScallCoverCard
          title="Europe Street beat"
          hoverable
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta description="Scale Cover when hover" />
        </ScallCoverCard>
      </Col>
      <Col sm={8} xs={24}>
        <CustomBodyCard hoverable>
          <div className="inner-card-body">
            <Meta title="Card title" description="This is the description" />
          </div>
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        </CustomBodyCard>
      </Col>
      <Col sm={8} xs={24}>
        <CustomBodyFloatingCard
          hoverable
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <div className="inner-card-body">
            <Meta title="Card title" description="This is the description" />
          </div>
        </CustomBodyFloatingCard>
      </Col>
      <Col sm={8} xs={24}>
        <Card
          title="Card Title"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            title="Europe Street beat"
            description="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
          />
        </Card>
      </Col>
      <Col sm={8} xs={24}>
        <Card
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </Col>
      <Col span={12}>
        <CustomBodyLeftRightCard>
          <Row justify="start" align="middle" gutter={[30, 0]}>
            <Col span={8} className="left">
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </Col>
            <Col span={16} className="right">
              <Meta title="Card title" description="This is the description" />
            </Col>
          </Row>
        </CustomBodyLeftRightCard>
      </Col>
      <Col span={12}>
        <CustomBodyLeftRightCard>
          <Row justify="start" align="middle" gutter={[30, 0]}>
            <Col span={16} className="left">
              <Meta title="Card title" description="This is the description" />
            </Col>
            <Col span={8} className="right">
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </Col>
          </Row>
        </CustomBodyLeftRightCard>
      </Col>
    </Row>
  </Card>
);

export default UICardsBasic;
