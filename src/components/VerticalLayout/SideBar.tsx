import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { SiderTheme } from 'antd/lib/layout/Sider';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { reset } from '../../features/TicketsSold/TicketSold.slice';
import { useAppDispatch } from '../../app/hooks';
import { AuthRoutes } from '../../navigation/Routes';
import { useCookie } from '../../hooks';
import { CookieKeys } from '../../constants/Keys';
import Images from '../../theme/Images';
import { SidebarWidth, CollapsedWidth } from '../../constants/Layout';
import SidebarContent from './SidebarContent';

const { Sider } = Layout;

const SidebarCmp = styled(Sider)`
  position: fixed;
  z-index: 2;
  min-height: 100vh;
  .ant-menu-submenu-title .anticon + span,
  .ant-menu-submenu-title .ant-menu-item-icon + span {
    margin-left: 13px;
  }
  &.ant-layout-sider
    .ant-menu-dark
    .ant-menu-inline.ant-menu-sub
    .ant-menu-item
    .ant-menu-title-content {
    margin-left: 12px;
  }
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
  const { t } = useTranslation();
  const cookies = useCookie([CookieKeys.authUser]);
  const dispatch = useAppDispatch();

  const [collapsedWidth, setCollapsedWidth] = useState(CollapsedWidth);

  const logout = () => {
    dispatch(reset());
    cookies.removeCookie(CookieKeys.authUser);
    cookies.removeCookie(CookieKeys.authUserName);
  };

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
      <Col lg={24} span={0} className="logo-box">
        <Link to="/" className="logo">
          <span>
            <img src={Images.LogoWhiteColor} alt="" />
          </span>
        </Link>
      </Col>
      <SidebarContent sidebarTheme={sidebarTheme} />
      <Row className="logout-container" onClick={logout}>
        <Link to={AuthRoutes.login} className="logo">
          <div className="text">
            <LogoutOutlined className="logout-icon" />
            {t('Logout')}
          </div>
        </Link>
      </Row>
    </SidebarCmp>
  );
};

export default SideBar;
