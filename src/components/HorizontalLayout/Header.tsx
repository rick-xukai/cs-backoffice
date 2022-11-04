import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Images from '../../theme/Images';
import { toggleFullscreen } from '../../utils/func';
import LanguageDropdown from '../LanguageDropdown';
import NotificationDropdown from '../NotificationDropdown';
import ProfileDropdown from '../ProfileDropdown';
import Navbar from './Navbar';

const { Header } = Layout;

const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderCmp = ({ toggleRightbar }: { toggleRightbar: () => void }) => (
  <HeaderWrapper>
    <div>
      <div className="logo-box">
        <Link to="/" className="logo logo-dark">
          <span className="logo-sm">
            <img src={Images.LogoSMLight} alt="Logo" height="22" />
          </span>
          <span className="logo-lg">
            <img src={Images.LogoDark} alt="Logo" height="30" />
          </span>
        </Link>
        <Link to="/" className="logo logo-light">
          <span className="logo-sm">
            <img src={Images.LogoSMLight} alt="Logo" height="22" />
          </span>
          <span className="logo-lg">
            <img src={Images.LogoLight} alt="" height="30" />
          </span>
        </Link>
      </div>
      <Navbar />
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
  </HeaderWrapper>
);

export default HeaderCmp;
