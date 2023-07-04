import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import UsersService from '../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface UserPermissionsResponse {
  id: string;
  email: string;
  name: string;
  role: number;
  status: number;
  isActivated: true;
  lastLoginAt: string;
  createdAt: string;
}

/**
 * get profile info
 */
export const getUserPermissionsListAction = createAsyncThunk<
  UserPermissionsResponse[],
  undefined,
  {
    rejectValue: ErrorType;
  }
>(
  'getUserPermissionsList/getUserPermissionsListAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UsersService.getUserPermissionsList();
      if (verificationApi(response)) {
        return response.data;
      }
      return rejectWithValue({
        code: response.code,
        message: response.message,
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

interface UserPermissionsState {
  loading: boolean;
  data: UserPermissionsResponse[];
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: UserPermissionsState = {
  loading: false,
  data: [],
  error: null,
};

export const userPermissionsSlice = createSlice({
  name: 'userPermissions',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPermissionsListAction.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getUserPermissionsListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserPermissionsListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = userPermissionsSlice.actions;

export const selectLoading = (state: RootState) =>
  state.userPermissions.loading;
export const selectData = (state: RootState) => state.userPermissions.data;
export const selectError = (state: RootState) => state.userPermissions.error;

export default userPermissionsSlice.reducer;
