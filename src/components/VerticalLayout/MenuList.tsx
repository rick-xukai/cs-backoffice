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

const MenuList = (): IMenu[] => {
  const { t } = useTranslation();
  return [
    {
      key: MenuKeys.dashboardDefault,
      title: t('Dashboard'),
      icon: <DashboardOutlined />,
    },
    {
      key: MenuKeys.events,
      title: t('Events'),
      icon: <SVG src={Images.Events} />,
    },
    {
      key: MenuKeys.users,
      title: t('Users'),
      icon: <UserOutlined />,
    },
    {
      key: MenuKeys.tickets,
      title: t('Tickets'),
      icon: <SVG src={Images.Tickets} />,
    },
    {
      key: MenuKeys.settings,
      title: t('Settings'),
      icon: <SettingOutlined />,
    },
  ];
};

export default MenuList;
