import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import {
  Layout,
  Col,
  Form,
  Input,
  Checkbox,
  message,
  Row,
  Button,
  Spin,
} from 'antd';
import {
  LockOutlined,
  UserOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { CookieKeys, LocalStorageKeys } from '../../../constants/Keys';
import { UserRoutes } from '../../../navigation/Routes';
import LoadingCover from '../../../components/LoadingCover';
import Images from '../../../theme/Images';
import Colors from '../../../theme/Colors';
import { LoginContainer } from './LoginComponents';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectLoading, selectError, loginAction } from './Login.slice';
import { useCookie, useLocalStorage } from '../../../hooks';

const { Content } = Layout;

const Login = () => {
  const { t } = useTranslation();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const localStorage = useLocalStorage();
  const cookies = useCookie([CookieKeys.authUser]);

  const [rememberMeChecked, setRememberMeChecked] = useState<boolean>(true);

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
    <>
      <Helmet>
        <title>{`${t('Login')} | CrowdServe BO`}</title>
      </Helmet>
      <Layout hasSider={false} style={{ minHeight: '100vh' }}>
        <Content
          style={{
            width: '100%',
            background: `${Colors.grey5}`,
            margin: '0',
          }}
        >
          <LoginContainer>
            <Col span={10} className="login-background" />
            <Col span={14} style={{ display: 'flex' }}>
              <Row className="login-form">
                <Col span={24} className="login-title">
                  {t('WELCOME TO CROWDSERVE!')}
                </Col>
                <Col span={24}>
                  <Form
                    initialValues={initialVlue}
                    name="login"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: `${t('Please input your username!')}`,
                        },
                      ]}
                    >
                      <Input
                        placeholder="User Name"
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${t('Please input your password!')}`,
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        prefix={<LockOutlined />}
                        iconRender={(visible) =>
                          (!visible && (
                            <img src={Images.PasswordHidden} alt="" />
                          )) || <EyeOutlined />
                        }
                      />
                    </Form.Item>
                    <Form.Item name="remember" className="remember-me">
                      <Checkbox
                        checked={rememberMeChecked}
                        onChange={(e) => setRememberMeChecked(e.target.checked)}
                      >
                        {t('Remember me')}
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        disabled={loading}
                        type="primary"
                        htmlType="submit"
                      >
                        {(loading && (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                spin
                                style={{ color: Colors.white }}
                              />
                            }
                            size="default"
                          />
                        )) ||
                          t('Sign In')}
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </LoginContainer>
        </Content>
      </Layout>
      <LoadingCover show={loading} />
    </>
  );
};

export default Login;
