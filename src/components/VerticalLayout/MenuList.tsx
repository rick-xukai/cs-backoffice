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
import { UserRoutes } from '../../navigation/Routes';

const MenuList = (): IMenu[] => {
  const { t } = useTranslation();
  return [
    {
      key: MenuKeys.dashboardDefault,
      title: t('Dashboard'),
      icon: <DashboardOutlined />,
      path: UserRoutes.dashboard,
    },
    {
      key: MenuKeys.events,
      title: t('Events'),
      icon: <SVG src={Images.Events} />,
      path: UserRoutes.events,
    },
    {
      key: MenuKeys.users,
      title: t('Users'),
      icon: <UserOutlined />,
      path: UserRoutes.users,
    },
    {
      key: MenuKeys.tickets,
      title: t('Tickets'),
      icon: <SVG src={Images.Tickets} />,
      path: UserRoutes.tickets,
    },
    {
      key: MenuKeys.settings,
      title: t('Settings'),
      icon: <SettingOutlined />,
      path: UserRoutes.settings,
    },
  ];
};

export default MenuList;
