import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import { CookieKeys } from '../constants/Keys';
import { AuthRoutes } from '../navigation/Routes';
import { useCookie } from './useCookie';

const useTokenExpire = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const cookie = useCookie([
    CookieKeys.authUser,
    CookieKeys.userNotActiveToken,
  ]);

  const tokenExpireFunction = () => {
    cookie.removeCookie(CookieKeys.authUser, { path: '/' });
    cookie.removeCookie(CookieKeys.userNotActiveToken, { path: '/' });
    message.error(t('User token is deprecated, please log in again.'));
    history.push(AuthRoutes.login);
  };

  return { tokenExpireFunction };
};

export default useTokenExpire;
