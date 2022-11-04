import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useHistory, Link } from 'react-router-dom';
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Checkbox,
  message,
} from 'antd';

import { CookieKeys, LocalStorageKeys } from '../../../constants/Keys';
import { UserRoutes, AuthRoutes } from '../../../navigation/Routes';
import LoadingCover from '../../../components/LoadingCover';
import PrimaryButton from '../../../components/PrimaryButton';
import Images from '../../../theme/Images';
import Avatar from '../../../components/Avatar';
import { LoginContainer, LoginCard } from './Login.components';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLoading, selectError, loginAction } from './Login.slice';
import { useCookie, useLocalStorage } from '../../../hooks';

const { Content } = Layout;
const { Title } = Typography;

const CardTitle = () => (
  <div className="bg-primary bg-soft">
    <Row justify="start">
      <Col span={14} className="cart-title">
        <Title level={5}>Welcome to Imaginato!</Title>
        <p>Sign in to continue</p>
      </Col>
      <Col span={10}>
        <img
          className="img-fluid "
          src={Images.dashboard.ProfileImg}
          alt="profile img"
        />
      </Col>
    </Row>
  </div>
);

const Login = () => {
  const { t } = useTranslation();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const localStorage = useLocalStorage();
  const cookies = useCookie([CookieKeys.authUser]);
  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  let initialVlue = {};
  const rememberMe = localStorage.getItem(LocalStorageKeys.rememberMe);
  if (rememberMe) {
    initialVlue = {
      ...JSON.parse(rememberMe),
      rememberMe: true,
    };
  }
  const onFinish = async (values: any) => {
    const result = await dispatch(loginAction(values));
    if (result.type === loginAction.fulfilled.toString()) {
      if (values.rememberMe) {
        localStorage.setItem(
          LocalStorageKeys.rememberMe,
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        );
      } else {
        localStorage.removeItem(LocalStorageKeys.rememberMe);
      }
      cookies.setCookie(CookieKeys.authUser, JSON.stringify(result.payload));
      history.replace(UserRoutes.dashboard);
    }
  };
  return (
    <div>
      <Helmet>
        <title>{`${t('Login')} | Imaginato Ui`}</title>
      </Helmet>
      <Layout hasSider={false} style={{ minHeight: '100vh' }}>
        <Content>
          <LoginContainer justify="center" align="top">
            <Col sm={16} xs={22}>
              <LoginCard title={<CardTitle />}>
                <Avatar src={Images.LogoSMLight} size={72} />
                <Form
                  name="login-form"
                  initialValues={initialVlue}
                  onFinish={onFinish}
                >
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            required: true,
                            message: 'Plaese input your email',
                          },
                        ]}
                      >
                        <Input placeholder="Your email" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Plaese input your password',
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item
                        className="remember-me"
                        name="rememberMe"
                        valuePropName="checked"
                      >
                        <Checkbox>Remember Me</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="start" align="middle">
                    <Col span={24}>
                      <Form.Item>
                        <PrimaryButton
                          block
                          htmlType="submit"
                          loading={loading}
                        >
                          Sign In
                        </PrimaryButton>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <Row>
                  <p className="signup">
                    Don&#39;t have an account ?{' '}
                    <Link
                      to={AuthRoutes.register}
                      className="fw-medium text-primary"
                    >
                      Signup now
                    </Link>
                  </p>
                </Row>
              </LoginCard>
            </Col>
          </LoginContainer>
        </Content>
      </Layout>
      <LoadingCover show={loading} />
    </div>
  );
};

export default Login;
