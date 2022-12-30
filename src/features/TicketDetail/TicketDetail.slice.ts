import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import TicketsService from '../../services/API/Tickets';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TicketsDetailDataType {
  user_name: string;
  user_email: string;
  event_name: string;
  organizer: string;
  ticket_type: string;
  seat_number: string;
  price: string;
  ticket_number: string;
  nft_ticket: string;
  view_blockchain: string;
  ticket_status: string;
  allowed_status: string[];
  last_updates: string;
}

/**
 * Tickets Detail
 */
export const getTicketsDetailAction = createAsyncThunk<
  TicketsDetailDataType,
  string,
  {
    rejectValue: ErrorType;
  }
>(
  'getTicketsDetail/getTicketsDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketsService.getTicketsDetail(payload);
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

export const updateTicketsDetailAction = createAsyncThunk<
  {},
  TicketsDetailDataType,
  {
    rejectValue: ErrorType;
  }
>(
  'updateTicketsDetail/updateTicketsDetailAction',
  async (payload: TicketsDetailDataType, { rejectWithValue, dispatch }) => {
    try {
      const response = await TicketsService.updateTicketsDetail(payload);
      if (response.success) {
        dispatch(getTicketsDetailAction(payload.ticket_number));
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

interface TicketsDetailState {
  loading: boolean;
  data: TicketsDetailDataType;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: TicketsDetailState = {
  loading: false,
  data: {
    user_name: '',
    user_email: '',
    event_name: '',
    organizer: '',
    ticket_type: '',
    seat_number: '',
    price: '',
    ticket_number: '',
    nft_ticket: '',
    view_blockchain: '',
    ticket_status: '',
    allowed_status: [],
    last_updates: '',
  },
  error: null,
};

export const ticketsDetailSlice = createSlice({
  name: 'ticketsDetail',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsDetailAction.pending, (state) => {
        state.data = initialState.data;
        state.loading = true;
      })
      .addCase(getTicketsDetailAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getTicketsDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateTicketsDetailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTicketsDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = ticketsDetailSlice.actions;

export const selectLoading = (state: RootState) => state.ticketsDetail.loading;
export const selectError = (state: RootState) => state.ticketsDetail.error;
export const selectData = (state: RootState) => state.ticketsDetail.data;

export default ticketsDetailSlice.reducer;
