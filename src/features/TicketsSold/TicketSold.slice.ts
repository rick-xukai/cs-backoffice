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
  status: number;
  source: number;
  keyword: string;
  ticketTypeId: number;
}

export interface TicketSoldListItemProps {
  id: number;
  user: {
    name: string;
    email: string;
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
}

/**
 * get ticket sold list
 */
export const getTicketSoldListAction = createAsyncThunk<
  { count: number; list: TicketSoldListItemProps[] },
  GetListParams,
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
 * Upload File
 */
// export const uploadProfileFileAction = createAsyncThunk<
//   { url: string },
//   {},
//   {
//     rejectValue: ErrorType;
//   }
// >(
//   'uploadProfileFile/uploadProfileFileAction',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await UsersService.uploadProfileFile(payload);
//       if (verificationApi(response)) {
//         return response.data;
//       }
//       return rejectWithValue({
//         code: response.code,
//         message: response.message,
//       } as ErrorType);
//     } catch (err: any) {
//       if (!err.response) {
//         throw err;
//       }
//       return rejectWithValue({
//         message: err.response,
//       } as ErrorType);
//     }
//   },
// );

interface TicketSoldState {
  loading: boolean;
  listData: TicketSoldListItemProps[];
  listTotal: number;
  page: number;
  size: number;
  searchKeyword: string | null;
  filterTicketType: number | null;
  filterStatus: number | null;
  filterSource: number | null;
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
  listTotal: 0,
  page: defaultCurrentPage,
  size: defaultPageSize,
  searchKeyword: null,
  filterTicketType: null,
  filterStatus: null,
  filterSource: null,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
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
      });
    //   .addCase(updateProfileInfoAction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateProfileInfoAction.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(updateProfileInfoAction.rejected, (state, action) => {
    //     state.loading = false;
    //     if (action.payload) {
    //       state.error = action.payload as ErrorType;
    //     } else {
    //       state.error = action.error as ErrorType;
    //     }
    //   });
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
} = ticketSoldSlice.actions;

export const selectLoading = (state: RootState) => state.ticketSold.loading;
export const selectListData = (state: RootState) => state.ticketSold.listData;
export const selectListTotal = (state: RootState) => state.ticketSold.listTotal;
export const selectError = (state: RootState) => state.ticketSold.error;
export const selectPage = (state: RootState) => state.ticketSold.page;
export const selectPageSize = (state: RootState) => state.ticketSold.size;
export const selectFilterStatus = (state: RootState) =>
  state.ticketSold.filterStatus;
export const selectFilterTicketType = (state: RootState) =>
  state.ticketSold.filterTicketType;
export const selectFilterSource = (state: RootState) =>
  state.ticketSold.filterSource;
export const selectSearchKeyword = (state: RootState) =>
  state.ticketSold.searchKeyword;

export default ticketSoldSlice.reducer;
