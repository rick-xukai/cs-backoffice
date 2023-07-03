import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, message, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import {
  emailValidator,
  passwordValidator,
  verificationCodeValidator,
} from '../../../utils/validator';
import Colors from '../../../theme/Colors';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  reset,
  selectLoading,
  selectError,
  StatusCodes,
  fotgotPasswordAction,
  verifyCodeAction,
  resetPasswordAction,
} from './ForgotPassword.slice';
import LandingLayout from '../../../components/LandingLayout/LandingLayout';
import { Email, Tip } from './ForgotPasswordComponents';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { UserRoutes } from '../../../navigation/Routes';
import { TokenExpire } from '../../../constants/General';
import { useCookie } from '../../../hooks';
import { CookieKeys } from '../../../constants/Keys';
import { base64Encrypt } from '../../../utils/func';
import { loginAction, selectData } from '../Login/Login.slice';

enum Steps {
  email = 1,
  verify = 2,
  password = 3,
}
const ForgotPassword = () => {
  const { t } = useTranslation();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(Steps.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUser]);
  const data = useAppSelector(selectData);

  const passwordNotMatchConfirmPassword =
    password && confirmPassword && password !== confirmPassword;

  const validateEmail = () => {
    if (error?.code === StatusCodes.notFound) {
      return (
        <div className="ant-form-item-explain-error">
          {t('There is no account associated with the email.')}
        </div>
      );
    }
    return null;
  };

  const validateCode = () => {
    if (error?.code === StatusCodes.codeWrong) {
      return (
        <div className="ant-form-item-explain-error">
          {t('Invalid verification code')}
        </div>
      );
    }
    return null;
  };
  const validatePasswordAndConfirmPassword = () => {
    if (passwordNotMatchConfirmPassword) {
      return Promise.reject(new Error(`Passwords don't match`));
    }
    return Promise.resolve();
  };
  useEffect(() => {
    if (error) {
      if (
        error.code !== StatusCodes.codeWrong &&
        error.code !== StatusCodes.notFound
      ) {
        message.error(error.message);
      }
    }
  }, [error]);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const onForgotPasswordFinish = async (values: any) => {
    const response = await dispatch(fotgotPasswordAction(values));
    if (response.type === fotgotPasswordAction.fulfilled.toString()) {
      setStep(Steps.verify);
      setEmail(values.email);
    }
  };

  const onVerifyFinish = async (values: any) => {
    const response = await dispatch(verifyCodeAction({ ...values, email }));
    if (response.type === verifyCodeAction.fulfilled.toString()) {
      setStep(Steps.password);
      setCode(values.code);
    }
  };

  const onResetPasswordFinish = async (values: any) => {
    const response = await dispatch(
      resetPasswordAction({ password: values.password, email, code }),
    );
    if (response.type === resetPasswordAction.fulfilled.toString()) {
      message.success(t('Password changed successfully'));
      await dispatch(loginAction({ email, password }));
    } else {
      message.error(response.payload?.message);
    }
  };

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
      history.replace(UserRoutes.dashboard);
    }
  }, [data]);
  return (
    <LandingLayout
      title={`${t('Forgot Password')} | CrowdServe BO`}
      formTitle={t('Reset password')}
    >
      {step === Steps.email ? (
        <Form
          name="email"
          onFinish={onForgotPasswordFinish}
          validateTrigger={['submit']}
        >
          <Form.Item
            name="email"
            rules={[{ validator: emailValidator }]}
            help={validateEmail()}
          >
            <Input
              status={validateEmail() ? 'error' : ''}
              placeholder={t('Email')}
            />
          </Form.Item>
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
                t('Verification Code')}
            </Button>
          </Form.Item>
        </Form>
      ) : null}
      {step === Steps.verify ? (
        <Form
          name="verify"
          onFinish={onVerifyFinish}
          validateTrigger={['submit']}
        >
          <Tip>{t('Verification code has been sent to')}</Tip>
          <Email>{email}</Email>
          <Form.Item
            name="code"
            help={validateCode()}
            rules={[
              {
                required: true,
                message: t('Verification code is required'),
              },
              {
                validator: verificationCodeValidator,
              },
            ]}
          >
            <Input
              status={validateCode() ? 'error' : ''}
              placeholder={t('Enter Verification Code')}
            />
          </Form.Item>
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
                t('Continue')}
            </Button>
          </Form.Item>
        </Form>
      ) : null}
      {step === Steps.password ? (
        <Form
          name="password"
          onFinish={onResetPasswordFinish}
          validateTrigger={['submit']}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: `${t('Please set your new password')}`,
              },
              {
                validator: (_: object, value: string) => {
                  if (passwordNotMatchConfirmPassword) return Promise.resolve();
                  return passwordValidator(_, value);
                },
              },
              {
                validator: validatePasswordAndConfirmPassword,
              },
            ]}
          >
            <PasswordInput
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={t('New Password (at least 8 chars)')}
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: `${t('Please confirm your new password')}`,
              },
              {
                validator: (_: object, value: string) => {
                  if (passwordNotMatchConfirmPassword) return Promise.resolve();
                  return passwordValidator(_, value);
                },
              },
              {
                validator: validatePasswordAndConfirmPassword,
              },
            ]}
          >
            <PasswordInput
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder={t('Confirm New Password')}
            />
          </Form.Item>
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
                t('Finish')}
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </LandingLayout>
  );
};

export default ForgotPassword;
