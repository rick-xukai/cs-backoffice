import React from 'react';
import { Menu } from 'antd';

import { useAppSelector } from '../../app/hooks';
import { selectSelectedKeys } from '../../app/menu.slice';
import MenuList from './MenuList';
import MenuRender from '../../utils/menuRender';

const Navbar = () => {
  const selectedKeys = useAppSelector(selectSelectedKeys);
  return (
    <Menu
      key={`menu_${selectedKeys}`}
      mode="horizontal"
      defaultSelectedKeys={[...selectedKeys]}
    >
      {MenuRender(MenuList())}
    </Menu>
  );
};

export default Navbar;
