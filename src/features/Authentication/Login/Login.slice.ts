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

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginRequestType {
  email: string;
  password: string;
}

export enum ActiveStatus {
  inactive = 0,
  active = 1,
}

export enum RoleTypes {
  superAdmin = 0,
  partnerAdmin = 1,
  organizerAdmin = 2,
  organizerUser = 3,
  scanner = 4,
}

export interface UserLoginResponseType {
  user: {
    id: string;
    name: string;
    email: string;
    role: RoleTypes;
    lastLoginAt: string;
    status: ActiveStatus;
    organizerId: number;
  };
  token: string;
  code?: number;
}

/**
 * login
 */
export const loginAction = createAsyncThunk<
  UserLoginResponseType,
  LoginRequestType,
  {
    rejectValue: ErrorType;
  }
>('login/loginAction', async (payload, { rejectWithValue }) => {
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
});

/**
 * Logout
 */
export const logoutAction = createAsyncThunk('login/loginAction', async () => {
  try {
    // Todo something
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
  }
});

export interface LoginState {
  loading: boolean;
  data: UserLoginResponseType;
  error:
    | {
        message: string | undefined;
        code?: number;
      }
    | undefined
    | null;
}

const initialState: LoginState = {
  data: {
    user: {
      id: '',
      name: '',
      email: '',
      role: RoleTypes.superAdmin,
      lastLoginAt: '',
      status: ActiveStatus.inactive,
      organizerId: 0,
    },
    token: '',
  },
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = loginSlice.actions;

export const selectData = (state: RootState) => state.login.data;
export const selectLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;

export default loginSlice.reducer;
