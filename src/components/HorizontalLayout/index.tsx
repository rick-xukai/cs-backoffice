import React, { useEffect, memo, useCallback } from 'react';
import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SettingDrawer from '../SettingsDrawer';
import {
  selectLayoutType,
  selectTopbarTheme,
  selectRightbarTheme,
  switchLayoutAction,
  switchTopbarThemeAction,
  toggloRightbarAction,
} from '../../app/layout.slice';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const LayoutCmp = ({ children }: { children: React.ReactChildren }) => {
  const layoutType = useAppSelector(selectLayoutType);
  const topbarTheme = useAppSelector(selectTopbarTheme);
  const rightbar = useAppSelector(selectRightbarTheme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(switchLayoutAction(layoutType));
    dispatch(switchTopbarThemeAction(topbarTheme));
  }, []);
  const toggleRightbar = useCallback(() => {
    dispatch(toggloRightbarAction(!rightbar));
  }, [rightbar]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header toggleRightbar={toggleRightbar} />
      <Content className="page-content">{children}</Content>
      <Footer />
      <SettingDrawer visible={rightbar} toggleRightbar={toggleRightbar} />
    </Layout>
  );
};

export default memo(LayoutCmp);
