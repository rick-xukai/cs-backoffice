import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { SortKeys } from '../../constants/Keys';
import { RootState } from '../../app/store';
import UsersService from '../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface UsersListDataType {
  id: string;
  createdAt: string;
  email: string;
  isActivated: string;
  lastLoginAt: string;
  name: string;
  walletAddress: string;
}

interface GetUsersListPayload {
  page: number;
  size: number;
  filters: object;
  sort: object;
}

/**
 * Users List
 */
export const getUsersListAction = createAsyncThunk<
  { count: number; list: UsersListDataType[] },
  GetUsersListPayload | undefined,
  {
    rejectValue: ErrorType;
  }
>('getUsersList/getUsersListAction', async (payload, { rejectWithValue }) => {
  const { page, size, filters, sort } = payload || {};
  try {
    const response = await UsersService.getUsersList({
      page,
      size,
      ...sort,
      ...filters,
    });
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
});

interface UsersListState {
  loading: boolean;
  data: UsersListDataType[];
  sort: { sortName: string; sortValue: string };
  filters: { status: number | null };
  total: number;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: UsersListState = {
  loading: false,
  sort: {
    sortName: 'last_action',
    sortValue: SortKeys.descend,
  },
  filters: { status: null },
  data: [],
  total: 0,
  error: null,
};

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    reset: () => initialState,
    sortChangeAction: (state, action) => {
      state.sort = action.payload;
    },
    filtersChangeAction: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersListAction.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getUsersListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getUsersListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset, sortChangeAction, filtersChangeAction } =
  usersListSlice.actions;

export const selectLoading = (state: RootState) => state.usersList.loading;
export const selectDataTotal = (state: RootState) => state.usersList.total;
export const selectFilters = (state: RootState) => state.usersList.filters;
export const selectData = (state: RootState) => state.usersList.data;
export const selectError = (state: RootState) => state.usersList.error;
export const selectSort = (state: RootState) => state.usersList.sort;

export default usersListSlice.reducer;
