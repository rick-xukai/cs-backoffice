import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Col, Row } from 'antd';

import { Colors, Images } from '../../theme';
import {
  Banner,
  Container,
  LeftWrapper,
  LogoContainer,
} from './LandingLayoutComponent';

const { Content } = Layout;

const LandingLayout = ({
  children,
  title,
  formTitle,
  hideBanner,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  formTitle: React.ReactNode;
  hideBanner?: boolean;
}) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Layout hasSider={false} style={{ minHeight: '100vh' }}>
      <Content
        style={{
          width: '100%',
          background: `${Colors.white2}`,
          margin: '0',
        }}
      >
        <Container
          justify="space-between"
          wrap
          hidebanner={hideBanner ? '1' : ''}
        >
          <LeftWrapper style={hideBanner ? { height: '100vh' } : {}}>
            <LogoContainer>
              <img src={Images.Logo} alt="" className="logo" />
            </LogoContainer>
            <Row className="landing-form">
              <Col span={24} className="landing-title">
                {formTitle}
              </Col>
              <Col span={24}>{children}</Col>
            </Row>
          </LeftWrapper>
          {hideBanner ? null : (
            <Col>
              <Banner src={Images.LoginBackground} alt="landing-banner" />
            </Col>
          )}
        </Container>
      </Content>
    </Layout>
  </div>
);

export default LandingLayout;
