/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { verificationApi } from '../../utils/func';
import EmailsService from '../../services/API/Emails/Emails.service';
import {
  defaultCurrentPage,
  defaultPageSize,
  GetAllDataPageSize,
} from '../../constants/General';

export interface ErrorType {
  message: string;
  code?: number;
}

export interface EmailListProps {
  event: {
    id: number;
    name: string;
    image: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  subject: string;
  isDefault: boolean;
  sendTime: string;
  status: number;
  id: number;
}

export interface EmailListPayload {
  page: number;
  size: number;
  keyword?: string | null;
  status?: number | null;
}

export interface EventReminderListProps {
  id: number;
  name: string;
  organizerName: string;
  partnerName: string;
  address: string;
  location: string;
  time: string;
}

/**
 * get email list
 */
export const getEmailListAction = createAsyncThunk<
  { count: number; list: EmailListProps[] },
  EmailListPayload,
  {
    rejectValue: ErrorType;
  }
>('getEmailList/getEmailListAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EmailsService.getEmailsList(payload);
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
 * get reminder list
 */
export const getReminderListAction = createAsyncThunk<
  { count: number; list: EventReminderListProps[] },
  undefined,
  {
    rejectValue: ErrorType;
  }
>('getReminderList/getReminderListAction', async (_, { rejectWithValue }) => {
  try {
    const response = await EmailsService.getEventReminderList({
      page: defaultCurrentPage,
      size: GetAllDataPageSize,
    });
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
 * delete email
 */
export const deleteEmailAction = createAsyncThunk<
  {},
  { id: string },
  {
    rejectValue: ErrorType;
  }
>('deleteEmail/deleteEmailAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EmailsService.deleteEmail(payload.id);
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

export interface emailListState {
  loading: boolean;
  deleteLoading: boolean;
  data: EmailListProps[];
  total: number;
  page: number;
  size: number;
  searchKeyword: string | null;
  filterStatus: number | null;
  eventReminderList: EventReminderListProps[];
  error:
    | {
        message: string | undefined;
        code?: number;
      }
    | undefined
    | null;
}

const initialState: emailListState = {
  data: [],
  loading: false,
  deleteLoading: false,
  error: null,
  total: 0,
  page: defaultCurrentPage,
  size: defaultPageSize,
  searchKeyword: null,
  filterStatus: null,
  eventReminderList: [],
};

export const emailListSlice = createSlice({
  name: 'emailList',
  initialState,
  reducers: {
    reset: () => initialState,
    resetState: (state) => {
      state.loading = initialState.loading;
      state.data = initialState.data;
      state.total = initialState.total;
      state.error = initialState.error;
      state.deleteLoading = initialState.deleteLoading;
    },
    resetEventRelatedState: (state) => {
      state.page = defaultCurrentPage;
      state.size = defaultPageSize;
      state.searchKeyword = null;
      state.filterStatus = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.size = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmailListAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmailListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getEmailListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getReminderListAction.fulfilled, (state, action) => {
        state.eventReminderList = action.payload.list;
      })
      .addCase(getReminderListAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(deleteEmailAction.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteEmailAction.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteEmailAction.rejected, (state, action) => {
        state.deleteLoading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const {
  reset,
  resetState,
  setSearchKeyword,
  setFilterStatus,
  setPage,
  setPageSize,
  resetEventRelatedState,
} = emailListSlice.actions;

export const selectData = (state: RootState) => state.emailList.data;
export const selectLoading = (state: RootState) => state.emailList.loading;
export const selectError = (state: RootState) => state.emailList.error;
export const selectTotal = (state: RootState) => state.emailList.total;
export const selectPage = (state: RootState) => state.emailList.page;
export const selectPageSize = (state: RootState) => state.emailList.size;
export const selectSearchKeyword = (state: RootState) =>
  state.emailList.searchKeyword;
export const selectFilterStatus = (state: RootState) =>
  state.emailList.filterStatus;
export const selectEventReminderList = (state: RootState) =>
  state.emailList.eventReminderList;
export const selectDeleteLoading = (state: RootState) =>
  state.emailList.deleteLoading;

export default emailListSlice.reducer;
