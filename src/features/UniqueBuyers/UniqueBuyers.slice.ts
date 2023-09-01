import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface UniqueBuyersDataType {
  name: string;
  email: string;
  ownedTickets: number;
  gender: string;
  birthday: string;
  isActivated: boolean;
  updatedAt: string;
}

/**
 * Unique Buyers
 */
export const getUniqueBuyersAction = createAsyncThunk<
  UniqueBuyersDataType,
  {
    eventId: string | number;
    keyword: string;
    isActivated?: boolean;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'uniqueBuyers/getUniqueBuyersAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getUnqiueBuyers(payload);
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

interface UniqueBuyersState {
  uniqueBuyersLoading: boolean;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
  uniqueBuyers: UniqueBuyersDataType[];
}

const initialState: UniqueBuyersState = {
  uniqueBuyersLoading: true,
  error: null,
  uniqueBuyers: [],
};

export const uniqueBuyersSlice = createSlice({
  name: 'uniqueBuyers',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUniqueBuyersAction.pending, (state) => {
        state.uniqueBuyersLoading = true;
      })
      .addCase(getUniqueBuyersAction.fulfilled, (state, action: any) => {
        state.uniqueBuyersLoading = false;
        state.uniqueBuyers = action.payload.data;
      })
      .addCase(getUniqueBuyersAction.rejected, (state, action) => {
        state.uniqueBuyersLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});
export const { reset } = uniqueBuyersSlice.actions;

export const selectUniqueBuyersLoading = (state: RootState) =>
  state.uniqueBuyers.uniqueBuyersLoading;
export const selectUniqueBuyers = (state: RootState) =>
  state.uniqueBuyers.uniqueBuyers;

export default uniqueBuyersSlice.reducer;
