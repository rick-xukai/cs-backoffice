import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SiderTheme } from 'antd/lib/layout/Sider';

import { RootState } from './store';
import {
  LayoutTypes,
  TopbarThemes,
  SidebarTheme,
  SidebarTypes,
  LgWidth,
} from '../constants/Layout';

/* eslint-disable no-param-reassign, complexity */
/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value: string) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
const manageBodyClass = (cssClass: string, action = 'toggle') => {
  switch (action) {
    case 'add':
      if (document.body) document.body.classList.add(cssClass);
      break;
    case 'remove':
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
};

/**
 * Change layout type
 * @param layoutType
 */
export const switchLayoutAction = createAsyncThunk(
  'layout/switchLayoutAction',
  async (payload: string, { rejectWithValue }) => {
    try {
      if (payload === LayoutTypes.horizontal) {
        document.body.removeAttribute('data-sidebar');
        document.body.removeAttribute('data-sidebar-size');
      }
      changeBodyAttribute('data-layout', payload);
      return payload;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/**
 * Change sidebar type
 * @param leftSideBarTheme
 */
export const switchSidebarTypeAction = createAsyncThunk(
  'layout/switchSidebarTypeAction',
  async (payload: string, { rejectWithValue }) => {
    try {
      switch (payload) {
        case 'icon':
          changeBodyAttribute('data-keep-enlarged', 'true');
          manageBodyClass('vertical-collpsed', 'add');
          break;
        case 'condensed':
          manageBodyClass('sidebar-enable', 'add');
          if (window.innerWidth >= LgWidth) {
            manageBodyClass('vertical-collpsed', 'remove');
            manageBodyClass('sidebar-enable', 'remove');
            manageBodyClass('vertical-collpsed', 'add');
            manageBodyClass('sidebar-enable', 'add');
          } else {
            manageBodyClass('vertical-collpsed', 'add');
            manageBodyClass('sidebar-enable', 'add');
          }
          break;
        default:
          changeBodyAttribute('data-sidebar-size', '');
          manageBodyClass('sidebar-enable', 'remove');
          manageBodyClass('vertical-collpsed', 'remove');
          if (window.innerWidth >= LgWidth) {
            manageBodyClass('ox-hidden', 'remove');
          } else {
            manageBodyClass('ox-hidden', 'add');
          }
          break;
      }
      return payload;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/**
 * Change sidebar theme
 * @param leftSideBarTheme
 */
export const switchSidebarThemeAction = createAsyncThunk(
  'layout/switchSidebarThemeAction',
  async (payload: SiderTheme, { rejectWithValue }) => {
    try {
      changeBodyAttribute('data-sidebar', payload);
      return payload;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/**
 * Change topbar theme
 * @param topbarTheme
 */
export const switchTopbarThemeAction = createAsyncThunk(
  'layout/switchTopbarThemeAction',
  async (payload: string, { rejectWithValue }) => {
    try {
      changeBodyAttribute('data-topbar', payload);
      return payload;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export interface LayoutState {
  layoutType: string;
  layoutWidth: string;
  leftSideBarTheme: SiderTheme;
  leftSideBarType: string;
  topbarTheme: string;
  rightbar: boolean;
}

const initialState: LayoutState = {
  layoutType: LayoutTypes.veritical,
  layoutWidth: 'full',
  leftSideBarTheme: SidebarTheme,
  leftSideBarType: SidebarTypes.default,
  topbarTheme: TopbarThemes.light,
  rightbar: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggloRightbarAction: (state, action) => {
      state.rightbar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchLayoutAction.fulfilled, (state, action) => {
        state.layoutType = action.payload;
      })
      .addCase(switchTopbarThemeAction.fulfilled, (state, action) => {
        state.topbarTheme = action.payload;
      })
      .addCase(switchSidebarThemeAction.fulfilled, (state, action) => {
        state.leftSideBarTheme = action.payload;
      })
      .addCase(switchSidebarTypeAction.fulfilled, (state, action) => {
        state.leftSideBarType = action.payload;
      });
  },
});

export const { toggloRightbarAction } = layoutSlice.actions;

export const selectLayoutType = (state: RootState) => state.layout.layoutType;
export const selectSidebarType = (state: RootState) =>
  state.layout.leftSideBarType;
export const selectSidebarTheme = (state: RootState) =>
  state.layout.leftSideBarTheme;
export const selectTopbarTheme = (state: RootState) => state.layout.topbarTheme;
export const selectRightbarTheme = (state: RootState) => state.layout.rightbar;

export default layoutSlice.reducer;
