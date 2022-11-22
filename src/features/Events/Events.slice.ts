import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface EventsListPayload {
  page: number;
  count: number;
}

export interface EventsListDataType {
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
  number,
  EventsListPayload,
  {
    rejectValue: ErrorType;
  }
>(
  'getEventsList/getEventsListAction',
  async (payload: EventsListPayload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventsList(payload);
      if (response.success) {
        return response.results;
      }
      return rejectWithValue({
        message: response.message,
      } as ErrorType);
    } catch (err) {
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
  data: [],
  total: 0,
  error: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsListAction.pending, (state) => {
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
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;
export const selectData = (state: RootState) => state.events.data;
export const selectDataTotal = (state: RootState) => state.events.total;

export default eventsSlice.reducer;
