import React, { useEffect, useCallback, memo } from 'react';
import { Layout, Col } from 'antd';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SidebarTypes } from '../../constants/Layout';
import { bodyOverflow } from '../../utils/func';
import SettingDrawer from '../SettingsDrawer';
import {
  selectLayoutType,
  selectSidebarType,
  selectSidebarTheme,
  selectTopbarTheme,
  selectRightbarTheme,
  switchLayoutAction,
  switchSidebarTypeAction,
  switchSidebarThemeAction,
  switchTopbarThemeAction,
  toggloRightbarAction,
} from '../../app/layout.slice';
import SideBar from './SideBar';

const { Content } = Layout;

/* eslint-disable complexity */
const LayoutCmp = ({ children }: { children: React.ReactChildren }) => {
  const layoutType = useAppSelector(selectLayoutType);
  const sidebarType = useAppSelector(selectSidebarType);
  const sidebarTheme = useAppSelector(selectSidebarTheme);
  const topbarTheme = useAppSelector(selectTopbarTheme);
  const rightbar = useAppSelector(selectRightbarTheme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(switchLayoutAction(layoutType));
    // dispatch(switchSidebarTypeAction(sidebarType));
    dispatch(switchSidebarThemeAction(sidebarTheme));
    dispatch(switchTopbarThemeAction(topbarTheme));
  }, []);
  const handleBroken = (b: boolean) => {
    if (sidebarType === SidebarTypes.icon) {
      dispatch(switchSidebarTypeAction(sidebarType));
    } else if (b) {
      dispatch(switchSidebarTypeAction(SidebarTypes.condensed));
    } else {
      dispatch(switchSidebarTypeAction(SidebarTypes.default));
    }
  };
  const toggleRightbar = useCallback(() => {
    dispatch(toggloRightbarAction(!rightbar));
  }, [rightbar]);

  useEffect(() => {
    if (sidebarType === SidebarTypes.default && window.screen.width <= 992) {
      bodyOverflow('hidden');
    } else {
      bodyOverflow('scroll');
    }
  }, [sidebarType]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar
        collapsed={
          sidebarType === SidebarTypes.condensed ||
          sidebarType === SidebarTypes.icon
        }
        sidebarTheme={sidebarTheme}
        handleBroken={handleBroken}
      />
      <Layout className="content-layout">
        <Content className="page-content">
          {sidebarType === SidebarTypes.default && (
            <Col lg={0} span={24} className="page-content-mask" />
          )}
          {children}
        </Content>
      </Layout>
      <SettingDrawer visible={rightbar} toggleRightbar={toggleRightbar} />
    </Layout>
  );
};

export default memo(LayoutCmp);
