import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
import { SetRefundKey } from '../../constants/General';
// eslint-disable-next-line import/no-cycle

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

export enum CreateEventActionType {
  publish = 1,
  saveAsDraft = 0,
}
export interface ListTicketType {
  id: number | string;
  name: string;
  eventName: string;
  checked?: boolean;
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
    ticketTypeIds: string[];
  };
  usageCount: number;
  delete?: boolean;
}

export interface TicketListProps {
  id: string;
  name: string;
  description: string;
  price: number | string;
  absorbFees: boolean;
  stock: number | string;
  ceilingPrice: number | string;
  royaltiesFee: number | string;
  image: string;
  imageType: string;
  thumbnailUrl: string;
  thumbnailType: string;
  sellStartTime: string;
  sellEndTime: string;
  visibility: boolean;
  connectedTickets: {
    ticketTypeId: number;
    eventName?: string;
    name?: string;
    delete?: boolean;
    id?: any;
  }[];
  imageName: string;
  thumbnailName: string;
  soldTotal: number;
  delete?: boolean;
}

export interface DescriptionImagesProps {
  image: string;
  size: string;
}

export interface CreateEventFormValueProps {
  name: string;
  location: string;
  locationCoord: string;
  address: string;
  image: string;
  descriptionShort: string;
  description: string;
  descriptionImages: DescriptionImagesProps[];
  ticketTypes: TicketListProps[];
  discounts: PromoListProps[];
  refundPolicy: SetRefundKey.nonRefundable;
  contactEmail: string;
  organizerId?: string;
  startTime?: string;
  endTime?: string;
  publish?: number;
  status?: number;
  id?: any;
  organizerName?: string;
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
  contactEmail: string;
}

export interface ResponseUpdateId {
  id: string;
  idFlag: string;
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
 * Get list ticket type
 */
export const getListTicketTypeAction = createAsyncThunk<
  ListTicketType[],
  undefined,
  {
    rejectValue: ErrorType;
  }
>(
  'getListTicketType/getListTicketTypeAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await EventsService.getListTicketType();
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
  { payload: CreateEventFormValueProps; id: string },
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
>('createEvent/openAiGeneratorAction', async (payload) => {
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

/**
 * check discount code
 */
export const checkDiscountCodeAction = createAsyncThunk<
  any,
  {
    code: string;
    eventId: number;
  },
  {
    rejectValue: ErrorType;
  }
>('createEvent/checkDiscountCodeAction', async (payload) => {
  try {
    const response = await EventsService.checkDiscountCode(payload);
    return response;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return err.response;
  }
});

/**
 * check connect ticket
 */
export const checkConnectTicketAction = createAsyncThunk<
  any,
  {
    ticketTypeId: any;
    eventId: number;
    targetTypeId: number;
  },
  {
    rejectValue: ErrorType;
  }
>('createEvent/checkConnectTicketAction', async (payload) => {
  try {
    const response = await EventsService.checkConnectTicket(payload);
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
  listTicketTypeLoading: boolean;
  publishLoading: boolean;
  saveDraftLoading: boolean;
  showLoadingMessage: boolean;
  needUpdateEventId: string;
  needUpdateTicketsId: ResponseUpdateId[];
  needUpdateDiscountsId: ResponseUpdateId[];
  data: { id: number | string };
  listTicketType: ListTicketType[];
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
  listTicketTypeLoading: false,
  publishLoading: false,
  saveDraftLoading: false,
  showLoadingMessage: false,
  needUpdateEventId: '',
  needUpdateTicketsId: [],
  needUpdateDiscountsId: [],
  data: { id: '' },
  listTicketType: [],
  organizerData: [],
  error: null,
};

export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    reset: () => initialState,
    updateNeedUpdateEventId: (state, action) => {
      state.needUpdateEventId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventAction.pending, (state) => {
        state.data = { id: 0 };
        state.showLoadingMessage = true;
        state.publishLoading = true;
      })
      .addCase(createEventAction.fulfilled, (state, action: any) => {
        state.needUpdateEventId = '';
        state.needUpdateTicketsId = [];
        state.needUpdateDiscountsId = [];
        state.showLoadingMessage = false;
        state.publishLoading = false;
        state.data = action.payload;
      })
      .addCase(createEventAction.rejected, (state, action) => {
        state.showLoadingMessage = false;
        state.publishLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(createEventSaveDraftAction.pending, (state) => {
        state.saveDraftLoading = true;
      })
      .addCase(createEventSaveDraftAction.fulfilled, (state, action: any) => {
        state.saveDraftLoading = false;
        state.needUpdateTicketsId = action.payload.ticketTypes;
        state.needUpdateDiscountsId = action.payload.discounts;
        state.needUpdateEventId = action.payload.id;
      })
      .addCase(createEventSaveDraftAction.rejected, (state, action) => {
        state.saveDraftLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getListTicketTypeAction.pending, (state) => {
        state.listTicketType = [];
        state.listTicketTypeLoading = true;
      })
      .addCase(getListTicketTypeAction.fulfilled, (state, action: any) => {
        state.listTicketTypeLoading = false;
        state.listTicketType = action.payload;
      })
      .addCase(getListTicketTypeAction.rejected, (state, action) => {
        state.listTicketTypeLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateEventAction.pending, (state) => {
        state.data = { id: 0 };
        state.showLoadingMessage = true;
        if (state.needUpdateEventId) {
          state.saveDraftLoading = true;
        } else {
          state.publishLoading = true;
        }
      })
      .addCase(updateEventAction.fulfilled, (state, action: any) => {
        state.showLoadingMessage = false;
        if (state.needUpdateEventId) {
          state.saveDraftLoading = false;
        } else {
          state.publishLoading = false;
        }
        state.needUpdateTicketsId = action.payload.ticketTypes;
        state.needUpdateDiscountsId = action.payload.discounts;
        state.data = action.payload;
      })
      .addCase(updateEventAction.rejected, (state, action: any) => {
        state.showLoadingMessage = false;
        if (state.needUpdateEventId) {
          state.saveDraftLoading = false;
        } else {
          state.publishLoading = false;
        }
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
      })
      .addCase(checkDiscountCodeAction.pending, (state) => {
        if (state.needUpdateEventId) {
          state.saveDraftLoading = true;
        } else {
          state.publishLoading = true;
        }
      })
      .addCase(checkDiscountCodeAction.fulfilled, (state) => {
        if (state.needUpdateEventId) {
          state.saveDraftLoading = false;
        } else {
          state.publishLoading = false;
        }
      })
      .addCase(checkDiscountCodeAction.rejected, (state) => {
        if (state.needUpdateEventId) {
          state.saveDraftLoading = false;
        } else {
          state.publishLoading = false;
        }
      });
  },
});

export const { reset, updateNeedUpdateEventId } = createEventSlice.actions;

export const selectLoading = (state: RootState) => state.createEvent.loading;
export const selectSaveDraftLoading = (state: RootState) =>
  state.createEvent.saveDraftLoading;
export const selectPublishLoading = (state: RootState) =>
  state.createEvent.publishLoading;
export const selectData = (state: RootState) => state.createEvent.data;
export const selectOrganizerData = (state: RootState) =>
  state.createEvent.organizerData;
export const selectError = (state: RootState) => state.createEvent.error;
export const selectListTicketType = (state: RootState) =>
  state.createEvent.listTicketType;
export const selectNeedUpdateEventId = (state: RootState) =>
  state.createEvent.needUpdateEventId;
export const selectNeedUpdateTicketsId = (state: RootState) =>
  state.createEvent.needUpdateTicketsId;
export const selectNeedUpdateDiscountsId = (state: RootState) =>
  state.createEvent.needUpdateDiscountsId;
export const selectListTicketTypeLoading = (state: RootState) =>
  state.createEvent.listTicketTypeLoading;
export const selectShowLoadingMessage = (state: RootState) =>
  state.createEvent.showLoadingMessage;

export default createEventSlice.reducer;
