import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Col, Row, Grid } from 'antd';

import { Colors, Images } from '../../theme';
import {
  Banner,
  Container,
  FormContainer,
  LogoContainer,
} from './LandingLayoutComponent';

const { Content } = Layout;

const { useBreakpoint } = Grid;

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
}) => {
  const { lg } = useBreakpoint();
  return (
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
            <LogoContainer sm={24} xs={24} md={24} lg={4}>
              <img src={Images.Logo} alt="" className="logo" />
            </LogoContainer>
            <FormContainer sm={24} xs={24} md={24} lg={5}>
              <Row className="landing-form">
                <Col span={24} className="landing-title">
                  {formTitle}
                </Col>
                <Col span={24}>{children}</Col>
              </Row>
            </FormContainer>
            {hideBanner || !lg ? null : (
              <Col>
                <Banner src={Images.LoginBackground} alt="landing-banner" />
              </Col>
            )}
          </Container>
        </Content>
      </Layout>
    </div>
  );
};
export default LandingLayout;
