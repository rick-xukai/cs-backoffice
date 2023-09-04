import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultCurrentPage, defaultPageSize } from '../../constants/General';
import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface EventsListDataType {
  id: string;
  name: string;
  image: string;
  updatedAt: string;
  location: string;
  organizerName: string;
  partnerName: string;
  status: number;
  revenue: number;
  soldTotal: number;
  total: number;
  time: string;
  slug: string;
  hidden: boolean;
}

export interface EventListRequestProps {
  page?: number | string;
  pageSize?: number | string;
  keyword?: string;
  status?: string | null;
}

export enum EventStatusKeys {
  upcoming = 1,
  draft = 0,
  ended = 2,
  cancelled = 3,
}

/**
 * Events
 */
export const getEventsListAction = createAsyncThunk<
  { count: number; list: EventsListDataType[] },
  {} | undefined,
  {
    rejectValue: ErrorType;
  }
>('getEventsList/getEventsListAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.getEventsList({ ...payload });
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

/**
 *  Cancel Events
 */
export const cancelEventAction = createAsyncThunk<
  {},
  string,
  {
    rejectValue: ErrorType;
  }
>('cancelEvent/cancelEventAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.cancelEvent(payload);
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

/**
 *  Delete Events
 */
export const deleteEventAction = createAsyncThunk<
  {},
  string,
  {
    rejectValue: ErrorType;
  }
>('deleteEvent/deleteEventAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.deleteEvent(payload);
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

/**
 *  Hide Events
 */
export const hideEventAction = createAsyncThunk<
  {},
  { id: string; hiddenState: boolean },
  {
    rejectValue: ErrorType;
  }
>('hideEvent/hideEventAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.hideEvent(payload);
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

interface EventsState {
  loading: boolean;
  data: [];
  total: number;
  page: number;
  size: number;
  searchKeyword: string;
  filterStatus: number | null;
  filterStatusText: string;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: EventsState = {
  loading: false,
  page: defaultCurrentPage,
  size: defaultPageSize,
  searchKeyword: '',
  filterStatus: EventStatusKeys.upcoming,
  filterStatusText: '',
  data: [],
  total: 0,
  error: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: () => initialState,
    resetState: (state) => {
      state.loading = initialState.loading;
      state.data = initialState.data;
      state.total = initialState.total;
      state.error = initialState.error;
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
    setFilterStatusText: (state, action) => {
      state.filterStatusText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsListAction.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getEventsListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getEventsListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(cancelEventAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(deleteEventAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(hideEventAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
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
  setFilterStatusText,
  setPage,
  setPageSize,
} = eventsSlice.actions;

export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;
export const selectData = (state: RootState) => state.events.data;
export const selectDataTotal = (state: RootState) => state.events.total;
export const selectFilterStatus = (state: RootState) =>
  state.events.filterStatus;
export const selectFilterStatusText = (state: RootState) =>
  state.events.filterStatusText;
export const selectSearchKeyword = (state: RootState) =>
  state.events.searchKeyword;
export const selectPage = (state: RootState) => state.events.page;
export const selectPageSize = (state: RootState) => state.events.size;

export default eventsSlice.reducer;
