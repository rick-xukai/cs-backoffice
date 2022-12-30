import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TicketTypesItemType {
  id: number;
  image: string;
  name: string;
  description?: string;
}
export interface EventDetailDataType {
  id: number;
  createdAt: string;
  eventDesc: string;
  eventEndTime: string;
  eventName: string;
  eventStartTime: string;
  location: string;
  organizer: string;
  ticketTypes: TicketTypesItemType[];
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
      if (verificationApi(response)) {
        return response;
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
    id: 0,
    createdAt: '',
    eventDesc: '',
    eventEndTime: '',
    eventName: '',
    eventStartTime: '',
    location: '',
    organizer: '',
    ticketTypes: [],
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
