import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Form, Input, message, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import {
  emailValidator,
  passwordValidator,
  verificationCodeValidator,
} from '../../../utils/validator';
import { CookieKeys } from '../../../constants/Keys';
import { TokenExpire } from '../../../constants/General';
import { UserRoutes } from '../../../navigation/Routes';
import Colors from '../../../theme/Colors';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  reset,
  selectLoading,
  selectError,
  resetPasswordAction,
  selectData,
  StatusCodes,
} from './ForgotPassword.slice';
import { useCookie } from '../../../hooks';
import LandingLayout from '../../../components/LandingLayout/LandingLayout';
import { Email, Tip } from './ForgotPasswordComponents';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
enum Steps {
  email = 1,
  verify = 2,
  password = 3,
}
const ForgotPassword = () => {
  const { t } = useTranslation();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const data = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUser]);
  const [step, setStep] = useState(Steps.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordNotMatchConfirmPassword =
    password && confirmPassword && password !== confirmPassword;
  const validatePasswordAndConfirmPassword = () => {
    if (passwordNotMatchConfirmPassword) {
      return Promise.reject(new Error(`Passwords don't match`));
    }
    return Promise.resolve();
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

  useEffect(() => {
    setStep(Steps.email);
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const onFinish = async (values: any) => {
    await dispatch(resetPasswordAction(values));
  };

  return (
    <LandingLayout
      title={`${t('Forgot Password')} | CrowdServe BO`}
      formTitle={t('Reset password')}
    >
      {step === Steps.email ? (
        <Form name="email" onFinish={onFinish} validateTrigger={['submit']}>
          <Form.Item name="email" rules={[{ validator: emailValidator }]}>
            <Input placeholder={t('Email')} />
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
        <Form name="verify" onFinish={onFinish} validateTrigger={['submit']}>
          <Tip>Verification code has been sent to</Tip>
          <Email>beauty@crowdserve.xyz</Email>
          <Form.Item
            name="code"
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
            <Input placeholder={t('Enter Verification Code')} />
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
        <Form name="password" onFinish={onFinish} validateTrigger={['submit']}>
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
