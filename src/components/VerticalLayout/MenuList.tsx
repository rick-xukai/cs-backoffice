import React from 'react';
import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
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
      key: MenuKeys.dashboard,
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
    // {
    //   key: MenuKeys.orders,
    //   title: t('Orders'),
    //   icon: <SVG src={Images.MenuOrdersIcon} />,
    //   path: UserScreens.Orders.path,
    //   role: UserScreens.Orders.role,
    // },
    {
      key: MenuKeys.users,
      title: t('Users'),
      icon: <SVG src={Images.MenuUsersIcon} />,
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
      key: MenuKeys.transactions,
      title: t('Transactions'),
      icon: <SVG src={Images.Transactions} />,
      path: UserScreens.Transactions.path,
      role: UserScreens.Transactions.role,
    },
    {
      key: MenuKeys.settings,
      title: t('Settings'),
      icon: <SettingOutlined />,
      children: [
        {
          key: MenuKeys.profile,
          title: t('Profile'),
          path: UserScreens.Profile.path,
          role: UserScreens.Profile.role,
        },
        {
          key: MenuKeys.userAndPermissions,
          title: t('User and permissions'),
          path: UserScreens.UserAndPermissions.path,
          role: UserScreens.UserAndPermissions.role,
        },
      ],
    },
  ];
};

export default MenuList;
