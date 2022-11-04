import React, { MouseEventHandler } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import {
  MenuOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { toggleFullscreen } from '../../utils/func';
import { SidebarTypes } from '../../constants/Layout';
import LanguageDropdown from '../LanguageDropdown';
import NotificationDropdown from '../NotificationDropdown';
import ProfileDropdown from '../ProfileDropdown';

const { Header } = Layout;

const HeaderCmp = ({
  sidebarType,
  toggle,
  toggleRightbar,
}: {
  sidebarType: string;
  toggle: MouseEventHandler;
  toggleRightbar: () => void;
}) => (
  <Header className="header-layout">
    <div>
      {sidebarType !== SidebarTypes.icon &&
        React.createElement(MenuOutlined, {
          className: 'top-menu-btn',
          onClick: toggle,
        })}
    </div>
    <div>
      <Row gutter={{ lg: 12, xs: 0 }}>
        <Col>
          <LanguageDropdown />
        </Col>
        <Col xs={0}>
          <Button
            className="icon-btn full-screen-btn"
            icon={<FullscreenOutlined />}
            size="large"
            onClick={toggleFullscreen}
          />
        </Col>
        <Col>
          <NotificationDropdown />
        </Col>
        <Col>
          <ProfileDropdown />
        </Col>
        <Col>
          <Button
            className="icon-btn icon-spin"
            icon={<SettingOutlined />}
            size="large"
            onClick={toggleRightbar}
          />
        </Col>
      </Row>
    </div>
  </Header>
);

export default HeaderCmp;
