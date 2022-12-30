import { useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { SidebarTypes } from '../constants/Layout';
import {
  selectSidebarType,
  switchSidebarTypeAction,
} from '../app/layout.slice';

export const useToggleMenu = () => {
  const dispatch = useAppDispatch();
  const sidebarType = useAppSelector(selectSidebarType);

  const toggleMenu = useCallback(() => {
    if (sidebarType === SidebarTypes.default) {
      dispatch(switchSidebarTypeAction(SidebarTypes.condensed));
    } else if (sidebarType === SidebarTypes.condensed) {
      dispatch(switchSidebarTypeAction(SidebarTypes.default));
    }
  }, [sidebarType]);

  return { toggleMenu };
};
