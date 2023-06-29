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

export interface ForgotPasswordPayload {
  username: string;
  password: string;
}

export interface ForgotPasswordRequestType {
  email: string;
  password: string;
}

export interface UserForgotPasswordResponseType {
  user: {
    id: string;
    name: string;
    email: string;
    role: number;
    lastForgotPasswordAt: string;
  };
  token: string;
  code?: number;
}

/**
 * forgotPassword
 */
export const resetPasswordAction = createAsyncThunk<
  UserForgotPasswordResponseType,
  ForgotPasswordRequestType,
  {
    rejectValue: ErrorType;
  }
>(
  'forgotPassword/resetPasswordAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.doLogin(payload);
      if (verificationApi(response)) {
        return response.data;
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

/**
 * Logout
 */
export const logoutAction = createAsyncThunk(
  'forgotPassword/resetPasswordAction',
  async () => {
    try {
      // Todo something
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
    }
  },
);

export interface ForgotPasswordState {
  loading: boolean;
  data: UserForgotPasswordResponseType;
  error:
    | {
        message: string | undefined;
        code?: number;
      }
    | undefined
    | null;
}

const initialState: ForgotPasswordState = {
  data: {
    user: {
      id: '',
      name: '',
      email: '',
      role: 0,
      lastForgotPasswordAt: '',
    },
    token: '',
  },
  loading: false,
  error: null,
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = forgotPasswordSlice.actions;

export const selectData = (state: RootState) => state.forgotPassword.data;
export const selectLoading = (state: RootState) => state.forgotPassword.loading;
export const selectError = (state: RootState) => state.forgotPassword.error;

export default forgotPasswordSlice.reducer;
