import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface UniqueAttendeesDataType {
  name: string;
  email: string;
  ownedTickets: number;
  gender: string;
  birthday: string;
  isActivated: boolean;
  updatedAt: string;
}

export interface EventScannedDataType {
  name: string;
  email: string;
  ticketNo: string;
  ticketType: string;
  seat: string;
  source: number;
}

export interface UniqueAttendeesSummaryDataType {
  attendeesCount: number;
  scannedCount: number;
}

export enum SourceType {
  primary = 0,
  secondary = 1,
  import = 2,
  transerred = 4,
}

export const getUniqueAttendeesAction = createAsyncThunk<
  UniqueAttendeesDataType,
  {
    eventId: string | number;
    keyword: string;
    isActivated?: boolean;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'uniqueAttendees/getUniqueAttendeesAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getUnqiueAttendees(payload);
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

export const getEventScannedAction = createAsyncThunk<
  EventScannedDataType,
  {
    eventId: string | number;
    keyword: string;
    ticketTypeId?: number;
    source?: number;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'uniqueAttendees/getEventScannedAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventScanned(payload);
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

export const getUniqueAttendeesSummaryAction = createAsyncThunk<
  UniqueAttendeesDataType,
  {
    eventId: string | number;
  },
  {
    rejectValue: ErrorType;
  }
>(
  'uniqueAttendees/getUniqueAttendeesSummaryAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getUnqiueAttendeesSummary(payload);
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

interface UniqueAttendeesState {
  loading: boolean;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
  uniqueAttendees: UniqueAttendeesDataType[];
  eventScanned: EventScannedDataType[];
  uniqueAttendeesSummary: UniqueAttendeesSummaryDataType;
}

const initialState: UniqueAttendeesState = {
  loading: true,
  error: null,
  uniqueAttendees: [],
  eventScanned: [],
  uniqueAttendeesSummary: {
    attendeesCount: 0,
    scannedCount: 0,
  },
};

export const uniqueAttendeesSlice = createSlice({
  name: 'uniqueAttendees',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUniqueAttendeesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUniqueAttendeesAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.uniqueAttendees = action.payload.data;
      })
      .addCase(getUniqueAttendeesAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getEventScannedAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventScannedAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.eventScanned = action.payload.data;
      })
      .addCase(getEventScannedAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getUniqueAttendeesSummaryAction.pending, () => {})
      .addCase(
        getUniqueAttendeesSummaryAction.fulfilled,
        (state, action: any) => {
          state.uniqueAttendeesSummary = action.payload.data;
        },
      )
      .addCase(getUniqueAttendeesSummaryAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});
export const { reset } = uniqueAttendeesSlice.actions;

export const selectUniqueAttendeesLoading = (state: RootState) =>
  state.uniqueAttendees.loading;
export const selectUniqueAttendees = (state: RootState) =>
  state.uniqueAttendees.uniqueAttendees;

export const selectUniqueAttendeesSummary = (state: RootState) =>
  state.uniqueAttendees.uniqueAttendeesSummary;

export const selectEventScanned = (state: RootState) =>
  state.uniqueAttendees.eventScanned;

export const selectLoading = (state: RootState) =>
  state.uniqueAttendees.loading;

export default uniqueAttendeesSlice.reducer;
