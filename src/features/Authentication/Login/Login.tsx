import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Col, Form, Input, Checkbox, message, Row, Button, Spin } from 'antd';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';

import { dataEncryption, base64Encrypt } from '../../../utils/func';
import { emailValidator } from '../../../utils/validator';
import {
  CookieKeys,
  LocalStorageKeys,
  DataEncryptionKeys,
} from '../../../constants/Keys';
import { TokenExpire } from '../../../constants/General';
import { AuthRoutes, UserRoutes } from '../../../navigation/Routes';
import Colors from '../../../theme/Colors';
import { ForGotPassword, RememberMe } from './LoginComponents';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  reset,
  selectLoading,
  selectError,
  loginAction,
  selectData,
  StatusCodes,
  ActiveStatus,
} from './Login.slice';
import { useCookie, useLocalStorage } from '../../../hooks';
import LandingLayout from '../../../components/LandingLayout/LandingLayout';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';

const Login = () => {
  const { t } = useTranslation();
  const localStorage = useLocalStorage();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUser]);
  const [finishFailed, setFinishFailed] = useState(false);

  const [rememberMeChecked, setRememberMeChecked] = useState<boolean>(false);
  const validatePasswordOrEmail = (isEmail?: boolean) => {
    if (error?.code === StatusCodes.passwordWrong) {
      return (
        <div className="ant-form-item-explain-error">
          {t('Wrong email or password')}
        </div>
      );
    }
    if (error?.code === StatusCodes.notFound && isEmail) {
      return (
        <div className="ant-form-item-explain-error">
          {t('There is no account associated with the email.')}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (error) {
      if (
        error.code !== StatusCodes.passwordWrong &&
        error.code !== StatusCodes.notFound
      ) {
        message.error(error.message);
      }
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
      const { user } = data;
      cookies.setCookie(CookieKeys.authUser, data.token, {
        expires: new Date(currentDate.getTime() + TokenExpire),
        path: '/',
      });
      cookies.setCookie(
        CookieKeys.authUserName,
        base64Encrypt(user.name || ''),
        {
          expires: new Date(currentDate.getTime() + TokenExpire),
          path: '/',
        },
      );
      cookies.setCookie(CookieKeys.authUserRole, user.role, {
        expires: new Date(currentDate.getTime() + TokenExpire),
        path: '/',
      });
      if (data.user.status === ActiveStatus.active) {
        history.replace(UserRoutes.dashboard);
      } else {
        history.push(AuthRoutes.changePassword);
      }
    }
  }, [data]);

  // eslint-disable-next-line
  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.rememberMe)) {
      setRememberMeChecked(true);
    } else {
      setRememberMeChecked(false);
    }
    return () => {
      dispatch(reset());
    };
  }, []);

  const onFinish = async (values: any) => {
    setFinishFailed(false);
    const result = await dispatch(loginAction(values));
    if (result.type === loginAction.fulfilled.toString()) {
      if (rememberMeChecked) {
        localStorage.setItem(
          LocalStorageKeys.rememberMe,
          dataEncryption(
            JSON.stringify({
              email: values.email,
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

  const handleGoToForgotPassword = () => {
    history.push(AuthRoutes.forgotPassword);
  };

  return (
    <LandingLayout
      title={`${t('Login')} | CrowdServe BO`}
      formTitle={t('WELCOME TO CROWDSERVE!')}
    >
      <Form
        initialValues={initialVlue}
        name="login"
        onFinish={onFinish}
        validateTrigger={['submit']}
        onFinishFailed={() => setFinishFailed(true)}
      >
        <Form.Item
          help={(!finishFailed && validatePasswordOrEmail(true)) || null}
          name="email"
          rules={[{ validator: emailValidator }]}
        >
          <Input
            status={
              !finishFailed && validatePasswordOrEmail(true) ? 'error' : ''
            }
            placeholder={t('Email')}
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          help={(!finishFailed && validatePasswordOrEmail()) || null}
          name="password"
          rules={[
            {
              required: true,
              message: `${t('Password is required')}`,
            },
          ]}
        >
          <PasswordInput
            status={!finishFailed && validatePasswordOrEmail() ? 'error' : ''}
            placeholder={t('Password')}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Row justify="space-between">
          <Col>
            <Form.Item name="remember" className="remember-me">
              <Checkbox
                name="remember"
                checked={rememberMeChecked}
                onChange={(e) => setRememberMeChecked(e.target.checked)}
              >
                <RememberMe>{t('Remember me')}</RememberMe>
              </Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <ForGotPassword onClick={handleGoToForgotPassword}>
              {t('Forgot Password?')}
            </ForGotPassword>
          </Col>
        </Row>
        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
            {(loading && (
              <Spin
                indicator={
                  <LoadingOutlined spin style={{ color: Colors.white }} />
                }
                size="default"
              />
            )) ||
              t('Sign In')}
          </Button>
        </Form.Item>
      </Form>
    </LandingLayout>
  );
};

export default Login;
