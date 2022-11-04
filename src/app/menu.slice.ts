import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';
import { UserScreens } from '../navigation/Screens';

export interface MenuState {
  openKeys: Array<string>;
  selectedKeys: Array<string>;
}

const initialState: MenuState = {
  openKeys: [...UserScreens.Dashboard.subMenuKeys],
  selectedKeys: [...UserScreens.Dashboard.menuKeys],
};

/* eslint-disable no-param-reassign */
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    triggerMenuAction: (state, action) => {
      state.openKeys = action.payload.openKeys;
      state.selectedKeys = action.payload.selectedKeys;
    },
  },
});

export const { triggerMenuAction } = menuSlice.actions;

export const selectOpenKeys = (state: RootState) => state.menu.openKeys;
export const selectSelectedKeys = (state: RootState) => state.menu.selectedKeys;

export default menuSlice.reducer;
