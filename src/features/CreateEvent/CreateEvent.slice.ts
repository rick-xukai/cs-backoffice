import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
import { SetRefundKey } from '../../constants/General';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export enum PromoType {
  code = 0,
  bundle = 1,
}
export enum DiscountType {
  percentage = 0,
  amount = 1,
}
export enum ApplyCodeToType {
  all = 0,
  certain = 1,
}
export enum MethodType {
  auto = 0,
  discount = 1,
}

export interface PromoListProps {
  type: PromoType;
  name: string;
  code: string;
  discount: {
    type: DiscountType;
    value?: number;
  };
  quantity?: number;
  method: MethodType;
  condition: {
    ticketTypeId: any;
    quantity?: number;
  };
  gift: {
    ticketTypeId: any;
    quantity?: number;
  };
  id: string;
  apply: {
    type: ApplyCodeToType;
    ticketTypeIds: { name: string; price: any; id: any }[];
  };
}

export interface TicketListProps {
  id: string;
  name: string;
  description: string;
  price: string;
  absorbFees: boolean;
  stock: string;
  ceilingPrice: string;
  royaltiesFee: string;
  image: string;
  imageType: string;
  thumbnailUrl: string;
  thumbnailType: string;
  sellStartTime: string;
  sellEndTime: string;
  visibility: boolean;
  connectedTickets: {
    ticketTypeId: number;
    eventName: string;
    ticketName: string;
  }[];
  imageName: string;
  thumbnailName: string;
}

export interface DescriptionImagesProps {
  image: string;
  size: string;
}

export interface CreateEventFormValueProps {
  name: string;
  location: string;
  locationCoord: string;
  organizerId: string;
  address: string;
  startTime: string;
  endTime: string;
  image: string;
  descriptionShort: string;
  description: string;
  descriptionImages: DescriptionImagesProps[];
  ticketList: TicketListProps[];
  promoList: PromoListProps[];
  refundPolicy: SetRefundKey.nonRefund;
  status?: number;
  descriptionImagesFileList?: any[];
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

export const verificationApi = (response: any) =>
  response.code === 200 && response.message === 'OK';

/**
 * Create event
 */
export const createEventAction = createAsyncThunk<
  { id: number },
  CreateEventFormValueProps,
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
 * Create event save as draft
 */
export const createEventSaveDraftAction = createAsyncThunk<
  { id: number },
  CreateEventFormValueProps,
  {
    rejectValue: ErrorType;
  }
>(
  'createEventSaveDraft/createEventSaveDraftAction',
  async (payload, { rejectWithValue }) => {
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
  },
);

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
  { url: string; code: number },
  {},
  {
    rejectValue: ErrorType;
  }
>('uploadFile/uploadFileAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EventsService.uploadFile(payload);
    if (verificationApi(response)) {
      return { ...response.data, code: response.code };
    }
    rejectWithValue({
      code: response.code,
      message: response.message,
    } as ErrorType);
    return response;
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
  publishLoading: boolean;
  saveDraftLoading: boolean;
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
  publishLoading: false,
  saveDraftLoading: false,
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
        state.publishLoading = true;
      })
      .addCase(createEventAction.fulfilled, (state, action: any) => {
        state.publishLoading = false;
        state.data = action.payload;
      })
      .addCase(createEventAction.rejected, (state, action) => {
        state.publishLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(createEventSaveDraftAction.pending, (state) => {
        state.data = { id: 0 };
        state.saveDraftLoading = true;
      })
      .addCase(createEventSaveDraftAction.fulfilled, (state, action: any) => {
        state.saveDraftLoading = false;
        state.data = action.payload;
      })
      .addCase(createEventSaveDraftAction.rejected, (state, action) => {
        state.saveDraftLoading = false;
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
export const selectSaveDraftLoading = (state: RootState) =>
  state.createEvent.saveDraftLoading;
export const selectPublishLoading = (state: RootState) =>
  state.createEvent.publishLoading;
export const selectData = (state: RootState) => state.createEvent.data;
export const selectOrganizerData = (state: RootState) =>
  state.createEvent.organizerData;
export const selectError = (state: RootState) => state.createEvent.error;

export default createEventSlice.reducer;
