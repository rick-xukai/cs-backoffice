import React, { useState } from 'react';
import { Layout } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Images from '../../theme/Images';
import { SidebarWidth, CollapsedWidth } from '../../constants/Layout';
import SidebarContent from './SidebarContent';

const { Sider } = Layout;

const SidebarCmp = styled(Sider)`
  position: fixed;
  z-index: 2;
  min-height: 100vh;
`;

const SideBar = ({
  collapsed,
  handleBroken,
  sidebarTheme,
}: {
  collapsed: boolean;
  handleBroken: (c: boolean) => void;
  sidebarTheme: SiderTheme;
}) => {
  const [collapsedWidth, setCollapsedWidth] = useState(CollapsedWidth);
  return (
    <SidebarCmp
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={collapsedWidth}
      theme={sidebarTheme}
      width={SidebarWidth}
      onBreakpoint={(broken: boolean) => {
        if (broken) {
          setCollapsedWidth(0);
        } else {
          setCollapsedWidth(CollapsedWidth);
        }
        handleBroken(broken);
      }}
    >
      <div className="logo-box">
        <Link to="/" className="logo">
          <span>
            <img src={Images.Logo} alt="" />
          </span>
        </Link>
      </div>
      <SidebarContent sidebarTheme={sidebarTheme} />
    </SidebarCmp>
  );
};

export default SideBar;
