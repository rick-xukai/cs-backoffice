import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, message, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useCookie } from '../../../hooks';
import { base64Encrypt } from '../../../utils/func';
import { TokenExpire } from '../../../constants/General';
import { CookieKeys } from '../../../constants/Keys';
import { passwordValidator } from '../../../utils/validator';
import Colors from '../../../theme/Colors';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  reset,
  selectLoading,
  selectError,
  changePasswordAction,
  StatusCodes,
} from './ChangePassword.slice';
import { loginAction, selectData } from '../Login/Login.slice';
import LandingLayout from '../../../components/LandingLayout/LandingLayout';
import { Tip } from './ChangePasswordComponents';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { UserRoutes } from '../../../navigation/Routes';
import { PASSWORD_MIN_LENGTH } from '../../../constants/constants';

interface RouteConfigType {
  search: string;
  pathname: string;
  state: {
    email: string;
  };
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const cookies = useCookie([CookieKeys.authUser]);

  const data = useAppSelector(selectData);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location: RouteConfigType = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordNotMatchConfirmPassword =
    password &&
    confirmPassword &&
    password.length >= PASSWORD_MIN_LENGTH &&
    confirmPassword &&
    password !== confirmPassword;
  const validatePasswordAndConfirmPassword = () => {
    if (passwordNotMatchConfirmPassword) {
      return Promise.reject(new Error(`Passwords don't match`));
    }
    return Promise.resolve();
  };

  useEffect(() => {
    if (data && data.token) {
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
      cookies.removeCookie(CookieKeys.userNotActiveToken);
      message.success(t('Password changed successfully'));
      history.replace(UserRoutes.events);
    }
  }, [data]);

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

  // eslint-disable-next-line
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const onFinish = async (values: any) => {
    const response = await dispatch(
      changePasswordAction({ password: values.password }),
    );
    if (response.type === changePasswordAction.fulfilled.toString()) {
      dispatch(
        loginAction({ email: location.state.email, password: values.password }),
      );
    }
  };

  return (
    <LandingLayout formTitle={t('Change password')} hideBanner>
      <Tip>
        {t('Please change the default password for your account security.')}
      </Tip>
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
              t('Confirm')}
          </Button>
        </Form.Item>
      </Form>
    </LandingLayout>
  );
};

export default ChangePassword;
