import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { SortKeys } from '../../constants/Keys';
import { RootState } from '../../app/store';
import TransactionsService from '../../services/API/Transactions';
import { defaultPageSize, defaultCurrentPage } from '../../constants/General';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TransactionsListDataType {
  id: number;
  bank_holder: string;
  bank_account: string;
  amount_reflected: string;
  user_email: string;
  status: string;
  submitted_at: {
    date: string;
    timeRange: string;
  };
}

export interface TransactionDetailDataType {
  id?: number;
  user_email: string;
  bank_name: string;
  amount: string;
  bank_holder: string;
  bank_account: string;
  submitted_at: string;
  last_action_at: string;
  status: string;
}
export interface UpdateTransactionsStatusPayload {
  status: string;
  transactions: number[];
}

/**
 * Transactions List
 */
export const getTransactionsListAction = createAsyncThunk<
  TransactionsListDataType[],
  {} | undefined,
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>(
  'getTransactionsList/getTransactionsListAction',
  async (_payload, { rejectWithValue, getState }) => {
    const { page, pageSize, sort, filters } = getState().transactionsList;
    try {
      const response = await TransactionsService.getTransactionsList({
        ...sort,
        ...filters,
        page,
        pageSize,
      });
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

export const getTransactionDetailAction = createAsyncThunk<
  TransactionDetailDataType,
  {},
  {
    rejectValue: ErrorType;
  }
>(
  'getTransactionDetail/getTransactionDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TransactionsService.getTransactionDetail(payload);
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

export const updateTransactionsStatusAction = createAsyncThunk<
  {},
  UpdateTransactionsStatusPayload,
  {
    rejectValue: ErrorType;
  }
>(
  'updateTransactionsStatus/updateTransactionsStatusAction',
  async (payload: UpdateTransactionsStatusPayload, { rejectWithValue }) => {
    try {
      const response = await TransactionsService.changeTransactionsStatus(
        payload,
      );
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

interface TransactionsListState {
  loading: boolean;
  changeStatusSuccess: boolean;
  data: TransactionsListDataType[];
  detailData: TransactionDetailDataType;
  page: number;
  pageSize: number;
  sort: { sortName: string; sortValue: string };
  filters: {
    status: string;
    start_date: number | null;
    end_date: number | null;
  };
  total: number;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: TransactionsListState = {
  loading: false,
  changeStatusSuccess: false,
  page: defaultCurrentPage,
  pageSize: defaultPageSize,
  sort: {
    sortName: 'submitted_at',
    sortValue: SortKeys.descend,
  },
  filters: {
    status: '',
    start_date: null,
    end_date: null,
  },
  data: [],
  detailData: {
    user_email: '',
    bank_name: '',
    amount: '',
    bank_holder: '',
    bank_account: '',
    submitted_at: '',
    last_action_at: '',
    status: '',
  },
  total: 0,
  error: null,
};

export const transactionsListSlice = createSlice({
  name: 'transactionsList',
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
    sortChangeAction: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
    filtersChangeAction: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsListAction.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getTransactionsListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getTransactionsListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getTransactionDetailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionDetailAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.detailData = action.payload.data;
      })
      .addCase(getTransactionDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateTransactionsStatusAction.pending, (state) => {
        state.loading = true;
        state.changeStatusSuccess = false;
      })
      .addCase(updateTransactionsStatusAction.fulfilled, (state) => {
        state.loading = false;
        state.changeStatusSuccess = true;
      })
      .addCase(updateTransactionsStatusAction.rejected, (state, action) => {
        state.loading = false;
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
  paginationChangeAction,
  sortChangeAction,
  filtersChangeAction,
} = transactionsListSlice.actions;

export const selectLoading = (state: RootState) =>
  state.transactionsList.loading;
export const selectDataTotal = (state: RootState) =>
  state.transactionsList.total;
export const selectCurrentPage = (state: RootState) =>
  state.transactionsList.page;
export const selectCurrentPageSize = (state: RootState) =>
  state.transactionsList.pageSize;
export const selectChangeStatusSuccess = (state: RootState) =>
  state.transactionsList.changeStatusSuccess;
export const selectFilters = (state: RootState) =>
  state.transactionsList.filters;
export const selectDetailData = (state: RootState) =>
  state.transactionsList.detailData;
export const selectData = (state: RootState) => state.transactionsList.data;
export const selectError = (state: RootState) => state.transactionsList.error;
export const selectSort = (state: RootState) => state.transactionsList.sort;

export default transactionsListSlice.reducer;
