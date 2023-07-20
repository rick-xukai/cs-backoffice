import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

interface EventsState {
  loading: boolean;
  data: [];
  total: number;
  searchKeyword: string;
  filterStatus: number | null;
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
  searchKeyword: '',
  filterStatus: 0,
  data: [],
  total: 0,
  error: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: () => initialState,
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
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
      });
  },
});

export const { reset, setSearchKeyword, setFilterStatus } = eventsSlice.actions;

export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;
export const selectData = (state: RootState) => state.events.data;
export const selectDataTotal = (state: RootState) => state.events.total;
export const selectFilterStatus = (state: RootState) =>
  state.events.filterStatus;
export const selectSearchKeyword = (state: RootState) =>
  state.events.searchKeyword;

export default eventsSlice.reducer;
