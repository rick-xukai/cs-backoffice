import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import TicketsService from '../../services/API/Tickets';
import { defaultPageSize, defaultCurrentPage } from '../../constants/General';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TicketsListDataType {
  id: number;
  createdAt: string;
  price: number;
  seat: number;
  status: number;
  ticketNo: string;
  ticketType: string;
  userEmail: string;
  userId: number;
  userName: string;
}

/**
 * Tickets
 */
export const getTicketsListAction = createAsyncThunk<
  { count: number; list: TicketsListDataType[] },
  {} | undefined,
  {
    rejectValue: ErrorType;
  }
>(
  'getTicketsList/getTicketsListAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketsService.getTicketsList({ ...payload });
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
  },
);

interface TicketsState {
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

const initialState: TicketsState = {
  loading: false,
  page: defaultCurrentPage,
  pageSize: defaultPageSize,
  data: [],
  total: 0,
  error: null,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    reset: () => initialState,
    paginationChangeAction: (state, action) => {
      if (action.payload.pageSize !== state.pageSize) {
        state.page = 1;
      } else {
        state.page = action.payload.page;
      }
      state.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsListAction.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getTicketsListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getTicketsListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset, paginationChangeAction } = ticketsSlice.actions;

export const selectLoading = (state: RootState) => state.tickets.loading;
export const selectError = (state: RootState) => state.tickets.error;
export const selectData = (state: RootState) => state.tickets.data;
export const selectDataTotal = (state: RootState) => state.tickets.total;
export const selectCurrentPage = (state: RootState) => state.tickets.page;
export const selectCurrentPageSize = (state: RootState) =>
  state.tickets.pageSize;

export default ticketsSlice.reducer;
