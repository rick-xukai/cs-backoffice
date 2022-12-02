import React from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { MenuKeys } from './MenuKeys';
import { Images } from '../../theme';
import { IMenu } from '../../utils/menuRender';
import { UserScreens } from '../../navigation/Screens';

const MenuList = (): IMenu[] => {
  const { t } = useTranslation();
  return [
    {
      key: MenuKeys.dashboardDefault,
      title: t('Dashboard'),
      icon: <DashboardOutlined />,
      path: UserScreens.Dashboard.path,
      role: UserScreens.Dashboard.role,
    },
    {
      key: MenuKeys.events,
      title: t('Events'),
      icon: <SVG src={Images.Events} />,
      path: UserScreens.Events.path,
      role: UserScreens.Events.role,
    },
    {
      key: MenuKeys.users,
      title: t('Users'),
      icon: <UserOutlined />,
      path: UserScreens.Users.path,
      role: UserScreens.Users.role,
    },
    {
      key: MenuKeys.tickets,
      title: t('Tickets'),
      icon: <SVG src={Images.Tickets} />,
      path: UserScreens.Tickets.path,
      role: UserScreens.Tickets.role,
    },
    {
      key: MenuKeys.settings,
      title: t('Settings'),
      icon: <SettingOutlined />,
      path: UserScreens.Settings.path,
      role: UserScreens.Settings.role,
    },
  ];
};

export default MenuList;
