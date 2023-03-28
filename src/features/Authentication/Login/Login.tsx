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

import { dataEncryption } from '../../../utils/func';
import { emailValidator } from '../../../utils/validator';
import {
  CookieKeys,
  LocalStorageKeys,
  DataEncryptionKeys,
} from '../../../constants/Keys';
import { TokenExpire } from '../../../constants/General';
import { UserRoutes } from '../../../navigation/Routes';
import LoadingCover from '../../../components/LoadingCover';
import Images from '../../../theme/Images';
import Colors from '../../../theme/Colors';
import { LoginContainer } from './LoginComponents';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  reset,
  selectLoading,
  selectError,
  loginAction,
  selectData,
} from './Login.slice';
import { useCookie, useLocalStorage } from '../../../hooks';

const { Content } = Layout;

const Login = () => {
  const { t } = useTranslation();
  const localStorage = useLocalStorage();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUser]);

  const [rememberMeChecked, setRememberMeChecked] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  let initialVlue = {};
  if (localStorage.getItem(LocalStorageKeys.rememberMe)) {
    const rememberMe = dataEncryption(
      localStorage.getItem(LocalStorageKeys.rememberMe),
      DataEncryptionKeys.decrypt,
    );
    if (rememberMe) {
      initialVlue = {
        ...JSON.parse(rememberMe),
        rememberMe: true,
      };
    }
  }

  useEffect(() => {
    if (data.token) {
      const currentDate = new Date();
      cookies.setCookie(CookieKeys.authUser, data.token, {
        expires: new Date(currentDate.getTime() + TokenExpire),
        path: '/',
      });
      history.replace(UserRoutes.events);
    }
  }, [data]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const onFinish = async (values: any) => {
    const result = await dispatch(loginAction(values));
    if (result.type === loginAction.fulfilled.toString()) {
      if (rememberMeChecked) {
        localStorage.setItem(
          LocalStorageKeys.rememberMe,
          dataEncryption(
            JSON.stringify({
              username: values.username,
              password: values.password,
            }),
            DataEncryptionKeys.encrypt,
          ),
        );
      } else {
        localStorage.removeItem(LocalStorageKeys.rememberMe);
      }
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
            <Col span={10} className="login-background">
              <img src={Images.Logo} alt="" className="logo" />
            </Col>
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
                      name="email"
                      rules={[{ validator: emailValidator }]}
                    >
                      <Input placeholder="Email" prefix={<UserOutlined />} />
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
                        name="remember"
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
