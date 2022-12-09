import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ACCESS_TOKEN, Users } from '../../../helpers/mock-api';
import { RootState } from '../../../app/store';
import AuthenticationService from '../../../services/API/Authentication';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

/**
 * Login
 */
export const loginAction = createAsyncThunk<
  any,
  LoginPayload,
  {
    rejectValue: ErrorType;
  }
>('login/loginAction', async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    const validUser = Users.filter(
      (usr) =>
        usr.username === payload.username && usr.password === payload.password,
    );
    if (validUser.length === 1) {
      const token = ACCESS_TOKEN;
      const tokenObj = { accessToken: token }; // Token Obj
      const userObj = {
        uid: validUser[0].uid,
        username: validUser[0].username,
        role: validUser[0].role,
        email: validUser[0].email,
      };
      const validUserObj = { ...userObj, ...tokenObj };
      return validUserObj;
    }
    return rejectWithValue({
      message: 'Username and password are invalid.',
    } as ErrorType);
    const response = await AuthenticationService.doLogin(payload);
    if (response.success) {
      return response.results;
    }
  } catch (err) {
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
  } catch (err) {
    if (!err.response) {
      throw err;
    }
  }
});

export interface LoginState {
  loading: boolean;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, () => initialState)
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

export const selectLoading = (state: RootState) => state.login.loading;
export const selectError = (state: RootState) => state.login.error;

export default loginSlice.reducer;
