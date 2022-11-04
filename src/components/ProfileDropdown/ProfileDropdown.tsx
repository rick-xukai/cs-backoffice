import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Dropdown, Menu, Space } from 'antd';
import {
  UserOutlined,
  ToolOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

import { CookieKeys } from '../../constants/Keys';
import { AuthRoutes } from '../../navigation/Routes';
import Avatar from '../Avatar';
import { useAppDispatch } from '../../app/hooks';
import { logoutAction } from '../../features/Authentication/Login/Login.slice';
import { useCookie } from '../../hooks';

const ProfileAvatar = styled(Avatar)`
  cursor: pointer;
  height: 36px;
  width: 36px;
`;

const ProfileDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const cookies = useCookie([CookieKeys.authUser]);
  const onLogout = async () => {
    cookies.removeCookie(CookieKeys.authUser);
    await dispatch(logoutAction());
    history.push(AuthRoutes.login);
  };
  const ProfileList = () => (
    <Menu>
      <Menu.Item key="profile">
        <Space size={4}>
          <UserOutlined />
          {t('Profile')}
        </Space>
      </Menu.Item>
      <Menu.Item key="setting">
        <Space size={4}>
          <ToolOutlined />
          {t('Settings')}
        </Space>
      </Menu.Item>
      <Menu.Divider key="menuSpace" style={{ margin: '4px 0' }} />
      <Menu.Item key="logout" onClick={onLogout}>
        <Space size={4}>
          <PoweroffOutlined style={{ color: '#f46a6a' }} />
          {t('Logout')}
        </Space>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={ProfileList} placement="bottomRight" trigger={['click']}>
      <ProfileAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Dropdown>
  );
};

export default ProfileDropdown;
