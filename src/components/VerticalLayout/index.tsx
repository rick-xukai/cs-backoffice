import React, { useEffect, useCallback, memo } from 'react';
import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SidebarTypes } from '../../constants/Layout';
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
import Header from './Header';
import SideBar from './SideBar';

const { Content } = Layout;

/* eslint-disable complexity */
const LayoutCmp = ({
  children,
  ...optProps
}: {
  children: React.ReactChildren;
}) => {
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
  const toggleMenu = useCallback(() => {
    if (sidebarType === SidebarTypes.default) {
      dispatch(switchSidebarTypeAction(SidebarTypes.condensed));
    } else if (sidebarType === SidebarTypes.condensed) {
      dispatch(switchSidebarTypeAction(SidebarTypes.default));
    }
  }, [sidebarType]);
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
        <Header sidebarType={sidebarType} toggle={toggleMenu} {...optProps} />
        <Content className="page-content">{children}</Content>
      </Layout>
      <SettingDrawer visible={rightbar} toggleRightbar={toggleRightbar} />
    </Layout>
  );
};

export default memo(LayoutCmp);
