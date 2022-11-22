import React, { MouseEventHandler } from 'react';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { SidebarTypes } from '../../constants/Layout';

const { Header } = Layout;

const HeaderCmp = ({
  sidebarType,
  toggle,
  ...optProps
}: {
  sidebarType: string;
  toggle: MouseEventHandler;
}) => (
  <Header className="header-layout">
    <div>
      {sidebarType !== SidebarTypes.icon &&
        React.createElement(MenuOutlined, {
          className: 'top-menu-btn',
          onClick: toggle,
        })}
    </div>
    <div className="page-title">{(optProps as any).headerBarTitle}</div>
  </Header>
);

export default HeaderCmp;
