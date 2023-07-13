import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface TicketTypes {
  ticketTypeId?: string;
  name: string;
  description: string;
  price: number | undefined | string;
  stock: number | undefined | string;
  ceilingPrice: number | undefined | string;
  purchaseLimit: number | undefined | string;
  royaltiesFee?: number | undefined | string;
  image: string;
  imageType: string;
  thumbnailType: string;
  thumbnailUrl: string;
  delete?: boolean;
}

export interface CreateEventPayloadType {
  organizerId: number | string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  image: string;
  ticketTypes?: TicketTypes[];
  royaltiesFee?: number | undefined | string;
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
});

/**
 * Update event
 */
export const updateEventAction = createAsyncThunk<
  { id: number },
  { payload: CreateEventPayloadType; id: string },
  {
    rejectValue: ErrorType;
  }
>('updateEvent/updateEventAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.updateEvent(payload);
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
});

/**
 * fetch open ai
 */
export const openAiGeneratorAction = createAsyncThunk<
  any,
  {},
  {
    rejectValue: ErrorType;
  }
>('uploadFile/uploadFileAction', async (payload) => {
  try {
    const response = await EventsService.openAiGenerator(payload);
    return response;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return err.response;
  }
});

interface CreateEventState {
  loading: boolean;
  data: { id: number | string };
  organizerData: OrganizerData[];
  error:
    | {
        code: number | undefined;
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
      .addCase(updateEventAction.pending, (state) => {
        state.data = { id: 0 };
        state.loading = true;
      })
      .addCase(updateEventAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateEventAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getOrganizerAction.pending, (state) => {
        state.loading = true;
        state.organizerData = [];
      })
      .addCase(getOrganizerAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.organizerData = action.payload;
      })
      .addCase(getOrganizerAction.rejected, (state, action) => {
        state.loading = false;
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
