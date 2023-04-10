import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import TicketsService from '../../services/API/Tickets';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface TicketsDetailDataType {
  id: number;
  cancelledAt: string;
  createdAt: string;
  event: {
    description: string;
    endTime: string;
    id: number;
    location: string;
    name: string;
    startTime: string;
  };
  organizerName: string;
  price: number;
  redeemedAt: string;
  seat: number;
  status: number;
  ticketNo: string;
  ticketType: string;
  updatedAt: string;
  userEmail: string;
  userId: number;
  userName: string;
  collectionAddress?: string;
}

/**
 * Tickets Detail
 */
export const getTicketsDetailAction = createAsyncThunk<
  TicketsDetailDataType,
  { userTicketId: string },
  {
    rejectValue: ErrorType;
  }
>(
  'getTicketsDetail/getTicketsDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketsService.getTicketsDetail(payload);
      if (verificationApi(response)) {
        return response;
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

export const updateTicketsDetailAction = createAsyncThunk<
  {},
  { userTicketId: string; data: { status: number } },
  {
    rejectValue: ErrorType;
  }
>(
  'updateTicketsDetail/updateTicketsDetailAction',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await TicketsService.updateTicketsDetail(payload);
      if (verificationApi(response)) {
        dispatch(
          getTicketsDetailAction({ userTicketId: payload.userTicketId }),
        );
        return response;
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

interface TicketsDetailState {
  loading: boolean;
  changeStatusSuccess: boolean;
  data: TicketsDetailDataType;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: TicketsDetailState = {
  loading: false,
  changeStatusSuccess: false,
  data: {
    id: 0,
    cancelledAt: '',
    createdAt: '',
    event: {
      description: '',
      endTime: '',
      id: 0,
      location: '',
      name: '',
      startTime: '',
    },
    organizerName: '',
    price: 0,
    redeemedAt: '',
    seat: 0,
    status: 0,
    ticketNo: '',
    ticketType: '',
    updatedAt: '',
    userEmail: '',
    userId: 0,
    userName: '',
    collectionAddress: '',
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
        state.changeStatusSuccess = false;
        state.loading = true;
      })
      .addCase(updateTicketsDetailAction.fulfilled, (state) => {
        state.changeStatusSuccess = true;
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
export const selectChangeStatusSuccess = (state: RootState) =>
  state.ticketsDetail.changeStatusSuccess;
export const selectError = (state: RootState) => state.ticketsDetail.error;
export const selectData = (state: RootState) => state.ticketsDetail.data;

export default ticketsDetailSlice.reducer;
