import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  message: string;
}

export interface TicketTypes {
  ticketTypeId?: string;
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  ceilingPrice: number | string;
  purchaseLimit: number | string;
  royaltiesFee: number;
  image: string;
  imageType: string;
}

export interface CreateEventPayloadType {
  organizerId: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  image: string;
  ticketTypes?: TicketTypes[];
  royaltiesFee?: number | string;
}

export interface OrganizerData {
  id: number;
  name: string;
}

/**
 * Create event
 */
export const createEventAction = createAsyncThunk<
  { id: number },
  CreateEventPayloadType,
  {
    rejectValue: ErrorType;
  }
>('createEvent/createEventAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.createEvent(payload);
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
});

/**
 * Get Organizer
 */
export const getOrganizerAction = createAsyncThunk<
  OrganizerData[],
  { page: number; size: number },
  {
    rejectValue: ErrorType;
  }
>('getOrganizer/getOrganizerAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.getOrganizer(payload);
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
});

/**
 * Upload File
 */
export const uploadFileAction = createAsyncThunk<
  { url: string },
  {},
  {
    rejectValue: ErrorType;
  }
>('uploadFile/uploadFileAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.uploadFile(payload);
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
});

interface CreateEventState {
  loading: boolean;
  data: { id: number | string };
  organizerData: [];
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: CreateEventState = {
  loading: false,
  data: { id: '' },
  organizerData: [],
  error: null,
};

export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventAction.pending, (state) => {
        state.data = { id: 0 };
        state.loading = true;
      })
      .addCase(createEventAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createEventAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getOrganizerAction.pending, (state) => {
        state.organizerData = [];
      })
      .addCase(getOrganizerAction.fulfilled, (state, action: any) => {
        state.organizerData = action.payload;
      })
      .addCase(getOrganizerAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = createEventSlice.actions;

export const selectLoading = (state: RootState) => state.createEvent.loading;
export const selectData = (state: RootState) => state.createEvent.data;
export const selectOrganizerData = (state: RootState) =>
  state.createEvent.organizerData;
export const selectError = (state: RootState) => state.createEvent.error;

export default createEventSlice.reducer;
