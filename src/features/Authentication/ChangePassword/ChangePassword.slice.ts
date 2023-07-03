import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { verificationApi } from '../../../utils/func';
import UsersService from '../../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */
export enum StatusCodes {
  passwordWrong = 1003,
  notFound = 404,
}
export interface ErrorType {
  message: string;
  code?: number;
}

export interface ChangePasswordPayload {
  username: string;
  password: string;
}

export interface ChangePasswordRequestType {
  password: string;
}

export interface UserChangePasswordResponseType {
  message: string;
  code?: number;
}

/**
 * changePassword
 */
export const changePasswordAction = createAsyncThunk<
  UserChangePasswordResponseType,
  ChangePasswordRequestType,
  {
    rejectValue: ErrorType;
  }
>(
  'changePassword/changePasswordAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.doChangePassword(payload);
      if (verificationApi(response)) {
        return response;
      }

      return rejectWithValue({
        message: response.message,
        code: response.code,
      } as ErrorType);
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue({
        message: err.response,
      } as ErrorType);
    }
  },
);

export interface ChangePasswordState {
  loading: boolean;
  error:
    | {
        message: string | undefined;
        code?: number;
      }
    | undefined
    | null;
}

const initialState: ChangePasswordState = {
  loading: false,
  error: null,
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = changePasswordSlice.actions;

export const selectLoading = (state: RootState) => state.changePassword.loading;
export const selectError = (state: RootState) => state.changePassword.error;

export default changePasswordSlice.reducer;
