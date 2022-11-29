import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface EventDetailDataType {
  event_id: string;
  event_name: string;
  organizer: string;
  event_description: string;
  location: string;
  date: string;
  time: string;
  ticketInfo: {
    ticket_type: string;
    nft_image: string;
    nft_description: string;
  }[];
}

/**
 * Event Detail
 */
export const getEventDetailAction = createAsyncThunk<
  EventDetailDataType,
  string,
  {
    rejectValue: ErrorType;
  }
>(
  'getEventDetail/getEventDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventDetail(payload);
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

interface EventDetailState {
  loading: boolean;
  data: EventDetailDataType;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: EventDetailState = {
  loading: false,
  data: {
    event_id: '',
    event_name: '',
    organizer: '',
    event_description: '',
    location: '',
    date: '',
    time: '',
    ticketInfo: [],
  },
  error: null,
};

export const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventDetailAction.pending, (state) => {
        state.data = {} as EventDetailDataType;
        state.loading = true;
      })
      .addCase(getEventDetailAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getEventDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = eventDetailSlice.actions;

export const selectDetailLoading = (state: RootState) =>
  state.eventDetail.loading;
export const selectError = (state: RootState) => state.eventDetail.error;
export const selectDetailData = (state: RootState) => state.eventDetail.data;

export default eventDetailSlice.reducer;
