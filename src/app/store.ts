import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import history from '../utils/history';
import createRootReducer from './reducers';

export const store = configureStore({
  reducer: createRootReducer(history),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
