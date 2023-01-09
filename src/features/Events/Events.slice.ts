import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface EventsListDataType {
  id: string;
  eventName: string;
  eventStartTime: string;
  eventEndTime: string;
  createdAt: string;
  location: string;
  organizer: string;
  partner?: string;
  status?: string;
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
  reducers: {
    reset: () => initialState,
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

export const { reset } = eventsSlice.actions;

export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;
export const selectData = (state: RootState) => state.events.data;
export const selectDataTotal = (state: RootState) => state.events.total;

export default eventsSlice.reducer;
