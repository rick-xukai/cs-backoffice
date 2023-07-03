import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../app/store';
import { verificationApi } from '../../../utils/func';
import UsersService from '../../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */
export enum StatusCodes {
  passwordWrong = 1003,
  notFound = 404,
  codeWrong = 1004,
}
export interface ErrorType {
  message: string;
  code?: number;
}

export interface ForgotPasswordRequestType {
  email: string;
}

export interface VerifyCodeRequestType {
  email: string;
  code: string;
}

export interface ChangePasswordRequestType {
  email: string;
  code: string;
  password: string;
}

export interface UserForgotPasswordResponseType {
  message?: string;
  code?: number;
}

/**
 * forgotPassword
 */
export const fotgotPasswordAction = createAsyncThunk<
  UserForgotPasswordResponseType,
  ForgotPasswordRequestType,
  {
    rejectValue: ErrorType;
  }
>(
  'forgotPassword/fotgotPasswordAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.doFotgotPassword(payload);
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

export const verifyCodeAction = createAsyncThunk<
  UserForgotPasswordResponseType,
  VerifyCodeRequestType,
  {
    rejectValue: ErrorType;
  }
>('forgotPassword/verifyCodeAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await UsersService.doVerificationCode(payload);
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
});

export const resetPasswordAction = createAsyncThunk<
  UserForgotPasswordResponseType,
  ChangePasswordRequestType,
  {
    rejectValue: ErrorType;
  }
>(
  'forgotPassword/resetPasswordAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.doResetPassword(payload);
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
  data: {},
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
      .addCase(fotgotPasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fotgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fotgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(verifyCodeAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCodeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyCodeAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
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
