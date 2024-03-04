import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import TicketSoldService from '../../services/API/TicketSold';
import { defaultCurrentPage, defaultPageSize } from '../../constants/General';

/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface GetListParams {
  page: number;
  size: number;
  status?: number | undefined;
  source?: number | undefined;
  keyword?: string;
  ticketTypeId?: number | undefined;
  saleStatus?: number | undefined;
}

export interface TicketSoldListItemProps {
  id: number;
  user: {
    name: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  ticketType: {
    name: string;
  };
  total: number;
  price: number;
  discount: number;
  absorbFees: number;
  organizerAbsorbFees: number;
  paymentFees: number;
  seat: number;
  ticketNo: string;
  status: number;
  source: number;
  createdAt: string;
  saleStatus: number;
  promoCode?: string;
}

export interface TicketSoldCountItemProps {
  id: string;
  name: string;
  stocks: {
    soldTotal: number;
    importTotal: number;
    cancelTotal: number;
  };
  ticketTypes: { id: number; name: string }[];
}

export interface ImportTicketProps {
  email: string;
  ticketType: string;
}

export const defaultTicketSoldCount = {
  id: '',
  name: '',
  stocks: {
    soldTotal: 0,
    importTotal: 0,
    cancelTotal: 0,
  },
  ticketTypes: [],
};

/**
 * get ticket sold list
 */
export const getTicketSoldListAction = createAsyncThunk<
  { count: number; list: TicketSoldListItemProps[] },
  { id: string; data: GetListParams },
  {
    rejectValue: ErrorType;
  }
>(
  'getTicketSoldList/getTicketSoldListAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketSoldService.getTicketSoldList(payload);
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
 * get all ticket sold list
 */
export const getAllTicketSoldListAction = createAsyncThunk<
  { count: number; list: TicketSoldListItemProps[] },
  { id: string; data: GetListParams },
  {
    rejectValue: ErrorType;
  }
>(
  'getAllTicketSoldListAction/getAllTicketSoldListAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketSoldService.getTicketSoldList(payload);
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
 * get ticket sold count
 */
export const getTicketSoldCountAction = createAsyncThunk<
  TicketSoldCountItemProps,
  string,
  {
    rejectValue: ErrorType;
  }
>(
  'getTicketSoldCount/getTicketSoldCountAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketSoldService.getTicketSoldCount(payload);
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
 * update ticket status
 */
export const updateTicketStatusAction = createAsyncThunk<
  {},
  { id: string; data: { status: number } },
  {
    rejectValue: ErrorType;
  }
>(
  'updateTicketStatus/updateTicketStatusAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await TicketSoldService.updateTicketStatus(payload);
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
 * import tickets
 */
export const importTicketsAction = createAsyncThunk<
  {},
  { id: string; data: ImportTicketProps[] },
  {
    rejectValue: ErrorType;
  }
>('importTickets/importTicketsAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await TicketSoldService.importTickets(payload);
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

interface TicketSoldState {
  loading: boolean;
  listData: TicketSoldListItemProps[];
  allListData: TicketSoldListItemProps[];
  getAllListDataLoading: boolean;
  listTotal: number;
  ticketSoldCount: TicketSoldCountItemProps;
  page: number;
  size: number;
  searchKeyword: string;
  filterTicketType: number | undefined;
  filterStatus: number | undefined;
  filterSource: number | undefined;
  saleStatus: number | undefined;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: TicketSoldState = {
  loading: false,
  listData: [],
  allListData: [],
  getAllListDataLoading: false,
  listTotal: 0,
  page: defaultCurrentPage,
  size: defaultPageSize,
  searchKeyword: '',
  filterTicketType: undefined,
  filterStatus: undefined,
  filterSource: undefined,
  saleStatus: undefined,
  error: null,
  ticketSoldCount: defaultTicketSoldCount,
};

export const ticketSoldSlice = createSlice({
  name: 'ticketSold',
  initialState,
  reducers: {
    reset: () => initialState,
    resetState: (state) => {
      state.loading = initialState.loading;
      state.listData = initialState.listData;
      state.listTotal = initialState.listTotal;
      state.error = initialState.error;
      state.ticketSoldCount = initialState.ticketSoldCount;
      state.searchKeyword = '';
      state.filterTicketType = undefined;
      state.filterStatus = undefined;
      state.filterSource = undefined;
      state.saleStatus = undefined;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.size = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterTicketType: (state, action) => {
      state.filterTicketType = action.payload;
    },
    setFilterSource: (state, action) => {
      state.filterSource = action.payload;
    },
    setSaleStatus: (state, action) => {
      state.saleStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketSoldCountAction.pending, (state) => {
        state.ticketSoldCount = defaultTicketSoldCount;
        state.loading = true;
      })
      .addCase(getTicketSoldCountAction.fulfilled, (state, action: any) => {
        state.ticketSoldCount = action.payload;
      })
      .addCase(getTicketSoldCountAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getTicketSoldListAction.pending, (state) => {
        state.listData = [];
        state.loading = true;
      })
      .addCase(getTicketSoldListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.listData = action.payload.list;
        state.listTotal = action.payload.count;
      })
      .addCase(getTicketSoldListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getAllTicketSoldListAction.pending, (state) => {
        state.allListData = [];
        state.getAllListDataLoading = true;
      })
      .addCase(getAllTicketSoldListAction.fulfilled, (state, action: any) => {
        state.getAllListDataLoading = false;
        state.allListData = action.payload.list;
      })
      .addCase(getAllTicketSoldListAction.rejected, (state, action) => {
        state.getAllListDataLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateTicketStatusAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(importTicketsAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const {
  reset,
  resetState,
  setPage,
  setPageSize,
  setFilterSource,
  setFilterStatus,
  setFilterTicketType,
  setSearchKeyword,
  setSaleStatus,
} = ticketSoldSlice.actions;

export const selectLoading = (state: RootState) => state.ticketSold.loading;
export const selectListData = (state: RootState) => state.ticketSold.listData;
export const selectListTotal = (state: RootState) => state.ticketSold.listTotal;
export const selectError = (state: RootState) => state.ticketSold.error;
export const selectPage = (state: RootState) => state.ticketSold.page;
export const selectPageSize = (state: RootState) => state.ticketSold.size;
export const selectTicketSoldCount = (state: RootState) =>
  state.ticketSold.ticketSoldCount;
export const selectFilterStatus = (state: RootState) =>
  state.ticketSold.filterStatus;
export const selectFilterTicketType = (state: RootState) =>
  state.ticketSold.filterTicketType;
export const selectFilterSource = (state: RootState) =>
  state.ticketSold.filterSource;
export const selectSearchKeyword = (state: RootState) =>
  state.ticketSold.searchKeyword;
export const selectSaleStatus = (state: RootState) =>
  state.ticketSold.saleStatus;
export const selectAllListData = (state: RootState) =>
  state.ticketSold.allListData;
export const selectGetAllListDataLoading = (state: RootState) =>
  state.ticketSold.getAllListDataLoading;

export default ticketSoldSlice.reducer;
