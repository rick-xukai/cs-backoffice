import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import EventsService from '../../services/API/Events';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface TicketTypesItemType {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  ceilingPrice: number;
  purchaseLimit: number;
  image: string;
  imageType: string;
  thumbnailUrl: string;
  thumbnailType: string;
  externalLink: string;
  blockchainUrl: string;
  royaltiesFee?: number;
}
export interface EventDashboardDataType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  image: string;
  status: number;
  stocks: {
    stockTotal: number;
    soldTotal: number;
    importTotal: number;
  };
  buyers: {
    userCount: number;
    conversionRate: number;
  };
  pageViews: {
    viewCount: number;
    averageDailyCount: number;
  };
  netSales: {
    revenue: number;
    grossSales: number;
  };
  ticketTypes: {
    name: string;
    image: string;
    stock: number;
    soldTotal: number;
    importTotal: number;
  }[];
  discounts: {
    name: string;
    usageCount: number;
    limit: number;
  }[];
}

/**
 * Event Dashboard
 */
export const getEventDashboardAction = createAsyncThunk<
  EventDashboardDataType,
  string | number,
  {
    rejectValue: ErrorType;
  }
>(
  'getEventDashboard/getEventDashboardAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EventsService.getEventDashboard({
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

interface EventDashboardState {
  loading: boolean;
  data: EventDashboardDataType;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: EventDashboardState = {
  loading: false,
  data: {
    id: '',
    name: '',
    startTime: '',
    endTime: '',
    image: '',
    status: 0,
    stocks: {
      stockTotal: 0,
      soldTotal: 0,
      importTotal: 0,
    },
    buyers: {
      userCount: 0,
      conversionRate: 0,
    },
    pageViews: {
      viewCount: 0,
      averageDailyCount: 0,
    },
    netSales: {
      revenue: 0,
      grossSales: 0,
    },
    ticketTypes: [],
    discounts: [],
  },
  error: null,
};

export const eventDashboardSlice = createSlice({
  name: 'eventDashboard',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventDashboardAction.pending, (state) => {
        state.data = {} as EventDashboardDataType;
        state.loading = true;
      })
      .addCase(getEventDashboardAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getEventDashboardAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});
export const { reset } = eventDashboardSlice.actions;

export const selectLoading = (state: RootState) => state.eventDashboard.loading;
export const selectDetailData = (state: RootState) => state.eventDashboard.data;

export default eventDashboardSlice.reducer;
