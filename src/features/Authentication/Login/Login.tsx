import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Col, Form, Input, Checkbox, message, Row, Button, Spin } from 'antd';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';

import { base64Format, base64Encrypt, isBase64 } from '../../../utils/func';
import { emailValidator } from '../../../utils/validator';
import {
  CookieKeys,
  LocalStorageKeys,
  DataEncryptionKeys,
} from '../../../constants/Keys';
import { TokenExpire, ScannerRole } from '../../../constants/General';
import { AuthRoutes, UserRoutes } from '../../../navigation/Routes';
import Colors from '../../../theme/Colors';
import {
  ForGotPassword,
  RememberMe,
  ScannerError,
  PageContainer,
} from './LoginComponents';
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
import { resetEventRelatedState } from '../../Events/Events.slice';
import { resetOrganiserRelatedState } from '../../Organisers/Organisers.slice';

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
  const [form] = Form.useForm();
  const [showScannerError, setShowScannerError] = useState<boolean>(false);

  const validatePasswordOrEmail = (isEmail?: boolean) => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password').length < 8 &&
      !loading
    ) {
      return (
        <div
          className="ant-form-item-explain-error"
          style={{ display: (!isEmail && 'block') || 'none' }}
        >
          {t('Wrong email or password')}
        </div>
      );
    }
    if (error?.code === StatusCodes.passwordWrong) {
      return (
        <div
          className="ant-form-item-explain-error"
          style={{ display: (!isEmail && 'block') || 'none' }}
        >
          {t('Wrong email or password')}
        </div>
      );
    }
    if (error?.code === StatusCodes.accountInactive) {
      return (
        <div
          className="ant-form-item-explain-error"
          style={{ display: (!isEmail && 'none') || 'block' }}
        >
          {t(
            'This is an inactive account, please login to another account or contact your admin.',
          )}
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
        error.code !== StatusCodes.notFound &&
        error.code !== StatusCodes.accountInactive &&
        !error.message?.includes('characters')
      ) {
        message.error(error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    const rememberMeInfo = localStorage.getItem(LocalStorageKeys.rememberMe);

    if (rememberMeInfo && isBase64(rememberMeInfo)) {
      const rememberMe = base64Format(
        rememberMeInfo || '',
        DataEncryptionKeys.decrypt,
      );
      if (rememberMe) {
        form.setFieldsValue({
          ...JSON.parse(rememberMe),
          rememberMe: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (data && data.token) {
      const currentDate = new Date();
      const { user } = data;
      if (user.role !== ScannerRole) {
        if (user.status === ActiveStatus.active) {
          cookies.setCookie(CookieKeys.authUser, data.token, {
            expires: new Date(currentDate.getTime() + TokenExpire),
            path: '/',
          });
          cookies.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
        } else {
          cookies.setCookie(CookieKeys.userNotActiveToken, data.token, {
            expires: new Date(currentDate.getTime() + TokenExpire),
            path: '/',
          });
        }
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
        dispatch(resetEventRelatedState());
        dispatch(resetOrganiserRelatedState());
        history.replace(UserRoutes.events);
        // if (data.user.status === ActiveStatus.active) {
        //   history.replace(UserRoutes.events);
        // } else {
        //   history.push({
        //     pathname: AuthRoutes.changePassword,
        //     state: { token: data.token },
        //   });
        // }
      } else {
        setShowScannerError(true);
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
          base64Format(
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

  useEffect(() => {
    if (showScannerError) {
      setFinishFailed(true);
    }
  }, [showScannerError]);

  return (
    <PageContainer>
      <LandingLayout formTitle={t('WELCOME TO CROWDSERVE!')}>
        <Form
          name="login"
          onFinish={onFinish}
          validateTrigger={['submit']}
          onFinishFailed={() => setFinishFailed(true)}
          form={form}
        >
          <Form.Item
            help={(!finishFailed && validatePasswordOrEmail(true)) || null}
            name="email"
            rules={[{ validator: emailValidator }]}
            className={(showScannerError && 'scanner-error') || ''}
          >
            <Input
              status={
                !finishFailed && validatePasswordOrEmail(true) ? 'error' : ''
              }
              placeholder={t('Email')}
              prefix={<UserOutlined />}
              onChange={() => setShowScannerError(false)}
            />
          </Form.Item>
          {showScannerError && (
            <ScannerError>
              {t(
                'This is a scanner account, please login to another account or contact your admin.',
              )}
            </ScannerError>
          )}
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
              onChange={() => setShowScannerError(false)}
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
    </PageContainer>
  );
};

export default Login;
