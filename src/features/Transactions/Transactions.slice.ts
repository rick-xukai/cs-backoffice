import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { SortKeys } from '../../constants/Keys';
import { RootState } from '../../app/store';
import TransactionsService from '../../services/API/Transactions';
import { defaultPageSize, defaultCurrentPage } from '../../constants/General';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TransactionsDataType {
  id: string;
  userEmail: string;
  bankName: string;
  cardHolder: string;
  cardNo: string;
  amount: number;
  currency: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTransactionsStatusPayload {
  note: string;
  ids: string[];
}

/**
 * Transactions List
 */
export const getTransactionsListAction = createAsyncThunk<
  { count: number; list: TransactionsDataType[] },
  {} | undefined,
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>(
  'getTransactionsList/getTransactionsListAction',
  async (_payload, { rejectWithValue, getState }) => {
    const { page, pageSize, filters } = getState().transactionsList;
    try {
      const response = await TransactionsService.getTransactionsList({
        ...filters,
        page,
        size: pageSize,
      });
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

export const getTransactionDetailAction = createAsyncThunk<
  TransactionsDataType,
  undefined,
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>(
  'getTransactionDetail/getTransactionDetailAction',
  async (_, { rejectWithValue, getState }) => {
    const { transactionId } = getState().transactionsList;
    try {
      const response = await TransactionsService.getTransactionDetail(
        transactionId,
      );
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

export const updateTransactionsStatusAction = createAsyncThunk<
  {},
  UpdateTransactionsStatusPayload,
  {
    rejectValue: ErrorType;
    state: RootState;
  }
>(
  'updateTransactionsStatus/updateTransactionsStatusAction',
  async (
    payload: UpdateTransactionsStatusPayload,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { transactionId } = getState().transactionsList;
      const response = await TransactionsService.changeTransactionsStatus(
        payload,
      );
      if (verificationApi(response)) {
        dispatch(getTransactionsListAction());
        if (transactionId) {
          dispatch(getTransactionDetailAction());
        }
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

interface TransactionsListState {
  loading: boolean;
  changeStatusSuccess: boolean;
  data: TransactionsDataType[];
  detailData: TransactionsDataType;
  page: number;
  pageSize: number;
  sort: { sortName: string; sortValue: string };
  filters: {
    status: number | null;
    startDate: string | null;
    endDate: string | null;
  };
  transactionId: string;
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
    status: null,
    startDate: null,
    endDate: null,
  },
  transactionId: '',
  data: [],
  detailData: {
    id: '',
    userEmail: '',
    bankName: '',
    cardHolder: '',
    cardNo: '',
    amount: 0,
    currency: '',
    status: 0,
    createdAt: '',
    updatedAt: '',
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
    setTransactionIdAction: (state, action) => {
      state.transactionId = action.payload;
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
        state.data = action.payload.list;
        state.total = action.payload.count;
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
        state.detailData = action.payload;
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
  setTransactionIdAction,
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
