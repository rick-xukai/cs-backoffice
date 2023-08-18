import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { CookieKeys } from '../constants/Keys';
import { useCookie } from '../hooks';

export interface IMenu {
  key: string;
  title: string;
  isGroup?: boolean;
  path?: any;
  icon?: React.ReactNode;
  children?: IMenu[];
  role?: string[];
}

const MenuRender = (menus: IMenu[]) => {
  const cookies = useCookie([CookieKeys.authUserRole]);
  return (
    <>
      {menus &&
        menus.map((menu: IMenu) => {
          if (
            menu.role &&
            cookies.getCookie(CookieKeys.authUserRole) &&
            !menu.role.includes(cookies.getCookie(CookieKeys.authUserRole))
          ) {
            return null;
          }
          if (menu.isGroup) {
            return (
              <Menu.ItemGroup key={menu.key} title={menu.title}>
                {menu.children && MenuRender(menu.children)}
              </Menu.ItemGroup>
            );
          }
          if (menu.children) {
            return (
              <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                {menu.children && MenuRender(menu.children)}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={menu.key} icon={menu.icon}>
              <Link to={menu.path}>{menu.title}</Link>
            </Menu.Item>
          );
        })}
    </>
  );
};

export default MenuRender;
