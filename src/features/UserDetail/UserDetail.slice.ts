import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import UsersService from '../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface UserDetailDataType {
  id: number;
  createdAt: string;
  email: string;
  isActivated: boolean;
  lastLoginAt: string;
  name: string;
  walletAddress: string;
  birthday: string;
  gender: string;
  country: string;
}

export interface UserDetailTicketsDataType {
  id: number;
  ticketNo: string;
  ticketType: string;
  seat: number;
  price: number;
  status: number;
  createdAt: string;
}

/**
 * User Detail
 */
export const getUserDetailAction = createAsyncThunk<
  UserDetailDataType,
  string,
  {
    rejectValue: ErrorType;
  }
>('getUserDetail/getUserDetailAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await UsersService.getUserDetail(payload);
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

export const getUserDetailTicketsAction = createAsyncThunk<
  { count: number; list: UserDetailTicketsDataType },
  { userId: string; parameters: object },
  {
    rejectValue: ErrorType;
  }
>(
  'getUserDetailTickets/getUserDetailTicketsAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.getUserDetailTickets(payload);
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

interface UserDetailState {
  total: number;
  loadingForDetail: boolean;
  loadingForTickets: boolean;
  userDetailData: UserDetailDataType;
  userDetailTicketsData: UserDetailTicketsDataType[];
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: UserDetailState = {
  total: 0,
  loadingForDetail: false,
  loadingForTickets: false,
  userDetailData: {
    id: 0,
    createdAt: '',
    email: '',
    isActivated: true,
    lastLoginAt: '',
    name: '',
    walletAddress: '',
    gender: '',
    birthday: '',
    country: '',
  },
  userDetailTicketsData: [],
  error: null,
};

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailAction.pending, (state) => {
        state.loadingForDetail = true;
      })
      .addCase(getUserDetailAction.fulfilled, (state, action: any) => {
        state.loadingForDetail = false;
        state.userDetailData = action.payload;
      })
      .addCase(getUserDetailAction.rejected, (state, action) => {
        state.loadingForDetail = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getUserDetailTicketsAction.pending, (state) => {
        state.userDetailTicketsData = [];
        state.loadingForTickets = true;
      })
      .addCase(getUserDetailTicketsAction.fulfilled, (state, action: any) => {
        state.loadingForTickets = false;
        state.userDetailTicketsData = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getUserDetailTicketsAction.rejected, (state, action) => {
        state.loadingForTickets = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = userDetailSlice.actions;

export const selectLoadingForDetail = (state: RootState) =>
  state.userDetail.loadingForDetail;
export const selectLoadingForTickets = (state: RootState) =>
  state.userDetail.loadingForTickets;
export const selectUserDetailData = (state: RootState) =>
  state.userDetail.userDetailData;
export const selectUserDetailTicketsData = (state: RootState) =>
  state.userDetail.userDetailTicketsData;
export const selectError = (state: RootState) => state.userDetail.error;
export const selectDataTotal = (state: RootState) => state.userDetail.total;

export default userDetailSlice.reducer;
