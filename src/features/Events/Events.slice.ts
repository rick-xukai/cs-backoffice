import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
import { defaultPageSize, defaultCurrentPage } from '../../constants/General';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface EventsListDataType {
  id: string;
  event_name: string;
  event_time: {
    date: string;
    timeRange: string;
  };
  location: string;
  organizer: string;
  partner: string;
  created_at: {
    date: string;
    timeRange: string;
  };
  status: string;
}

/**
 * Events
 */
export const getEventsListAction = createAsyncThunk<
  EventsListDataType,
  undefined,
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>(
  'getEventsList/getEventsListAction',
  async (_, { rejectWithValue, getState }) => {
    const { page, pageSize } = getState().events;
    try {
      const response = await EventsService.getEventsList({ page, pageSize });
      if (response.success) {
        return response.results;
      }
      return rejectWithValue({
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

interface EventsState {
  loading: boolean;
  page: number;
  pageSize: number;
  data: [];
  total: number;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: EventsState = {
  loading: false,
  page: defaultCurrentPage,
  pageSize: defaultPageSize,
  data: [],
  total: 0,
  error: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    reset: () => initialState,
    paginationChangeAction: (state, action) => {
      state.page = action.payload;
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
        state.data = action.payload.data;
        state.total = action.payload.total;
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

export const { reset, paginationChangeAction } = eventsSlice.actions;

export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;
export const selectData = (state: RootState) => state.events.data;
export const selectDataTotal = (state: RootState) => state.events.total;
export const selectCurrentPage = (state: RootState) => state.events.page;
export const selectCurrentPageSize = (state: RootState) =>
  state.events.pageSize;

export default eventsSlice.reducer;
