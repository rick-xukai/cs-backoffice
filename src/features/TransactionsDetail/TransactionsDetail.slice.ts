import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import TransactionsService from '../../services/API/Transactions';

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
    const { transactionId } = getState().transactionsDetail;
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
  'transactionsDetail/updateTransactionsStatusAction',
  async (
    payload: UpdateTransactionsStatusPayload,
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const { transactionId } = getState().transactionsDetail;
      const response = await TransactionsService.changeTransactionsStatus(
        payload,
      );
      if (verificationApi(response)) {
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

interface TransactionsDetailState {
  loading: boolean;
  changeStatusSuccess: boolean;
  data: TransactionsDataType;
  transactionId: string;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: TransactionsDetailState = {
  loading: false,
  changeStatusSuccess: false,
  transactionId: '',
  data: {
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
  error: null,
};

export const transactionsDetailSlice = createSlice({
  name: 'transactionsDetail',
  initialState,
  reducers: {
    reset: () => initialState,
    setTransactionIdAction: (state, action) => {
      state.transactionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionDetailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionDetailAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
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

export const { reset, setTransactionIdAction } =
  transactionsDetailSlice.actions;

export const selectchangeStatusSuccess = (state: RootState) =>
  state.transactionsDetail.changeStatusSuccess;
export const selectData = (state: RootState) => state.transactionsDetail.data;
export const selectLoading = (state: RootState) =>
  state.transactionsDetail.loading;
export const selectError = (state: RootState) => state.transactionsDetail.error;

export default transactionsDetailSlice.reducer;
