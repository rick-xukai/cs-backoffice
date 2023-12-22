import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultCurrentPage, defaultPageSize } from '../../constants/General';
import { RootState } from '../../app/store';
import { verificationApi } from '../../utils/func';
import OrganizerService from '../../services/API/Organizer';
/* eslint-disable no-param-reassign, complexity */

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export enum OrganiserStatusKeys {
  active = 1,
  inactive = 0,
}

export interface GetOrganizerListPayload {
  page: number;
  size: number;
  keyword: string;
  status: number | null;
  summary: boolean;
}

export interface OrganizerListProps {
  id: number;
  uuid: string;
  name: string;
  contactEmail: string;
  description: string;
  banner: string;
  logo: string;
  adminUserTotal: number;
  eventTotal: number;
  status: number;
  createdAt: string;
}

/**
 * Organizer List
 */
export const getOrganizerListAction = createAsyncThunk<
  { count: number; list: OrganizerListProps[] },
  GetOrganizerListPayload,
  {
    rejectValue: ErrorType;
  }
>(
  'getOrganizerList/getOrganizerListAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.getOrganizerList(payload);
      if (verificationApi(response)) {
        return {
          count: Number(response.headers['x-total-count']),
          list: response.data,
        };
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
 * delete organizer
 */
export const deleteOrganizerAction = createAsyncThunk<
  {},
  { id: string },
  {
    rejectValue: ErrorType;
  }
>(
  'deleteOrganizer/deleteOrganizerAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.deleteOrganizer(payload.id);
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

interface OrganiserState {
  loading: boolean;
  deleteLoading: boolean;
  data: [];
  total: number;
  page: number;
  size: number;
  searchKeyword: string;
  filterStatus: number | null;
  filterStatusText: string;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: OrganiserState = {
  loading: false,
  deleteLoading: false,
  page: defaultCurrentPage,
  size: defaultPageSize,
  searchKeyword: '',
  filterStatus: OrganiserStatusKeys.active,
  filterStatusText: '',
  data: [],
  total: 0,
  error: null,
};

export const organiserSlice = createSlice({
  name: 'organiser',
  initialState,
  reducers: {
    reset: () => initialState,
    resetState: (state) => {
      state.loading = initialState.loading;
      state.data = initialState.data;
      state.total = initialState.total;
      state.error = initialState.error;
    },
    resetOrganiserRelatedState: (state) => {
      state.page = defaultCurrentPage;
      state.size = defaultPageSize;
      state.searchKeyword = '';
      state.filterStatus = OrganiserStatusKeys.active;
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
    setFilterStatusText: (state, action) => {
      state.filterStatusText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizerListAction.pending, (state) => {
        state.data = initialState.data;
        state.loading = true;
      })
      .addCase(getOrganizerListAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload.list;
        state.total = action.payload.count;
      })
      .addCase(getOrganizerListAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(deleteOrganizerAction.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteOrganizerAction.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteOrganizerAction.rejected, (state, action) => {
        state.deleteLoading = false;
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
  setSearchKeyword,
  setFilterStatus,
  setFilterStatusText,
  setPage,
  setPageSize,
  resetOrganiserRelatedState,
} = organiserSlice.actions;

export const selectLoading = (state: RootState) => state.organiser.loading;
export const selectError = (state: RootState) => state.organiser.error;
export const selectData = (state: RootState) => state.organiser.data;
export const selectDataTotal = (state: RootState) => state.organiser.total;
export const selectFilterStatus = (state: RootState) =>
  state.organiser.filterStatus;
export const selectFilterStatusText = (state: RootState) =>
  state.organiser.filterStatusText;
export const selectSearchKeyword = (state: RootState) =>
  state.organiser.searchKeyword;
export const selectPage = (state: RootState) => state.organiser.page;
export const selectPageSize = (state: RootState) => state.organiser.size;
export const selectDeleteLoading = (state: RootState) =>
  state.organiser.deleteLoading;

export default organiserSlice.reducer;
