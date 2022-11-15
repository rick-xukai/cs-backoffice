import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Layout, Col, Form, Input, Checkbox, Image, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { CookieKeys, LocalStorageKeys } from '../../../constants/Keys';
import { UserRoutes } from '../../../navigation/Routes';
import LoadingCover from '../../../components/LoadingCover';
import PrimaryButton from '../../../components/PrimaryButton';
import Images from '../../../theme/Images';
import Colors from '../../../theme/Colors';
import { LoginContainer, LoginCard } from './Login.components';
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
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: `${Colors.black3}`,
          }}
        >
          <LoginContainer>
            <Col sm={24}>
              <LoginCard>
                <Image src={Images.Logo} preview={false} className="logo" />
                <Form initialValues={initialVlue} onFinish={onFinish}>
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
                      autoComplete="off"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="User Name"
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
                      autoComplete="off"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <div className="action-wrapper">
                      <Checkbox>{t('Remember me')}</Checkbox>
                      <p>{t('Forgot your password?')}</p>
                    </div>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <PrimaryButton block htmlType="submit" loading={loading}>
                      {t('Sign In')}
                    </PrimaryButton>
                  </Form.Item>
                </Form>
              </LoginCard>
            </Col>
          </LoginContainer>
        </Content>
      </Layout>
      <LoadingCover show={loading} />
    </>
  );
};

export default Login;
