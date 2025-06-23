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
  firstName: string;
  lastName: string;
  email: string;
  ownedTickets: number;
  gender: string;
  birthday: string;
  isActivated: boolean;
  updatedAt: string;
}

export interface ChartsDataType {
  id: number;
  name: string;
  summary: {
    userCount: number;
    conversionRate: number;
  };
  countries: {
    name: string;
    count: number;
  }[];
  genders: {
    name: string;
    count: number;
  }[];
  ages: {
    name: string;
    count: number;
  }[];
}

/**
 * Unique Buyers
 */
export const getUniqueBuyersAction = createAsyncThunk<
  UniqueBuyersDataType[],
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
        return response.data;
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

export const getUniqueBuyersChartsAction = createAsyncThunk<
  ChartsDataType,
  {
    eventId: string | number;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'uniqueBuyers/getUniqueBuyersChartsAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getUniqueBuyersCharts(payload);
      if (verificationApi(response)) {
        return response.data;
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
  chartsLoading: boolean;
  chartsData: ChartsDataType;
}

const initialState: UniqueBuyersState = {
  uniqueBuyersLoading: true,
  error: null,
  uniqueBuyers: [],
  chartsData: {
    id: 0,
    name: '',
    summary: {
      userCount: 0,
      conversionRate: 0,
    },
    countries: [],
    genders: [],
    ages: [],
  },
  chartsLoading: false,
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
        state.uniqueBuyers = action.payload;
      })
      .addCase(getUniqueBuyersAction.rejected, (state, action) => {
        state.uniqueBuyersLoading = false;
        state.uniqueBuyers = [];
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getUniqueBuyersChartsAction.pending, (state) => {
        state.chartsLoading = true;
      })
      .addCase(getUniqueBuyersChartsAction.fulfilled, (state, action: any) => {
        state.chartsLoading = false;
        state.chartsData = action.payload;
      })
      .addCase(getUniqueBuyersChartsAction.rejected, (state, action) => {
        state.chartsLoading = false;
        state.chartsData = {
          id: 0,
          name: '',
          summary: {
            userCount: 0,
            conversionRate: 0,
          },
          countries: [],
          genders: [],
          ages: [],
        };
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

export const selectUniqueBuyersChartsLoading = (state: RootState) =>
  state.uniqueBuyers.chartsLoading;

export const selectUniqueBuyersChartsData = (state: RootState) =>
  state.uniqueBuyers.chartsData;

export default uniqueBuyersSlice.reducer;
