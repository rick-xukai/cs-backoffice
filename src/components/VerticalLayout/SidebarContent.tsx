import React from 'react';
import { Menu } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';

import { CookieKeys } from '../../constants/Keys';
import { useCookie } from '../../hooks';
import { useAppSelector } from '../../app/hooks';
import { selectOpenKeys, selectSelectedKeys } from '../../app/menu.slice';
import MenuList from './MenuList';
import MenuRender from '../../utils/menuRender';

const SideBarContent = ({ sidebarTheme }: { sidebarTheme: SiderTheme }) => {
  const openKeys = useAppSelector(selectOpenKeys);
  const selectedKeys = useAppSelector(selectSelectedKeys);
  const cookies = useCookie([CookieKeys.authUser]);
  const { role } = cookies.getCookie(CookieKeys.authUser);

  return (
    <Menu
      key={`menu_${selectedKeys}`}
      className="sidebar-menu"
      theme={sidebarTheme}
      mode="inline"
      defaultOpenKeys={[...openKeys]}
      defaultSelectedKeys={[...selectedKeys]}
    >
      {MenuRender(MenuList(), role)}
    </Menu>
  );
};

export default SideBarContent;
