import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface EventPageViewsDataType {
  id: string;
  name: string;
  summary: {
    viewCount: number;
    averageDailyCount: number;
  };
  countries: {
    name: string;
    count: number;
    rate: number;
  }[];
  origins: {
    name: string;
    count: number;
  }[];
}

export interface EventPageViewsAnalysisDataType {
  date: string;
  pageViewTotal: number;
  pageViewUserCount: number;
  ticketSoldCount: number;
}

/**
 * Event Page Views
 */
export const getEventPageViewsAction = createAsyncThunk<
  EventPageViewsDataType,
  string | number,
  {
    rejectValue: ErrorType;
  }
>(
  'eventPageViews/getEventPageViewsAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventPageViews({
        eventId: payload,
      });
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

/**
 * Event Page Views Analysis
 */
export const getEventPageViewsAnalysisAction = createAsyncThunk<
  EventPageViewsAnalysisDataType[],
  {
    eventId: any;
    startDate: string;
    endDate: string;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'eventPageViews/getEventPageViewsAnalysisAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventPageViewsAnalysis(payload);
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

interface EventPageViewsState {
  loading: boolean;
  analysisLoading: boolean;
  pageViewsData: EventPageViewsDataType;
  eventPageViewsAnalysisData: EventPageViewsAnalysisDataType[];
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: EventPageViewsState = {
  loading: true,
  analysisLoading: true,
  pageViewsData: {
    id: '',
    name: '',
    summary: {
      viewCount: 0,
      averageDailyCount: 0,
    },
    countries: [],
    origins: [],
  },
  eventPageViewsAnalysisData: [],
  error: null,
};

export const eventPageViewsSlice = createSlice({
  name: 'eventPageViews',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventPageViewsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventPageViewsAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.pageViewsData = action.payload.data;
      })
      .addCase(getEventPageViewsAction.rejected, (state, action) => {
        state.loading = false;
        state.pageViewsData = {
          id: '',
          name: '',
          summary: {
            viewCount: 0,
            averageDailyCount: 0,
          },
          countries: [],
          origins: [],
        };
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getEventPageViewsAnalysisAction.pending, (state) => {
        state.analysisLoading = true;
      })
      .addCase(
        getEventPageViewsAnalysisAction.fulfilled,
        (state, action: any) => {
          state.analysisLoading = false;
          state.eventPageViewsAnalysisData = action.payload.data;
        },
      )
      .addCase(getEventPageViewsAnalysisAction.rejected, (state, action) => {
        state.analysisLoading = false;
        state.eventPageViewsAnalysisData = [];
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});
export const { reset } = eventPageViewsSlice.actions;

export const selectLoading = (state: RootState) => state.eventPageViews.loading;
export const selectPageViewsData = (state: RootState) =>
  state.eventPageViews.pageViewsData;

export const selectPageViewsAnalysisData = (state: RootState) =>
  state.eventPageViews.eventPageViewsAnalysisData;
export const selectPageViewsAnalysisLoading = (state: RootState) =>
  state.eventPageViews.analysisLoading;
export default eventPageViewsSlice.reducer;
