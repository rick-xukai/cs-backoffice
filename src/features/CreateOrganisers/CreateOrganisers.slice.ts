/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import UsersService from '../../services/API/Users';
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

export interface UserAndPermissionsProps {
  email: string;
  id: string | null;
  isActivated: boolean;
  name: string;
  notes: string;
  role: number | null;
  createdAt: string;
  delete?: boolean;
}

export const defaultCreateUserData: UserAndPermissionsProps = {
  email: '',
  id: '',
  isActivated: true,
  name: '',
  notes: '',
  role: null,
  createdAt: '',
};

export interface CreateOrganiserPayload {
  name: string;
  description: string;
  banner: string;
  logo: string;
  contactEmail: string;
  marketingSite: string;
  status: number;
  users: UserAndPermissionsProps[];
}

export interface OrganiserDetailProps {
  id: number;
  uuid: string;
  name: string;
  description: string;
  banner: string;
  logo: string;
  contactEmail: string;
  marketingSite: string;
  status: number;
  createdAt: string;
  users: UserAndPermissionsProps[];
}

const defaultEmptyData: OrganiserDetailProps = {
  id: 0,
  uuid: '',
  logo: '',
  name: '',
  status: OrganiserStatusKeys.active,
  contactEmail: '',
  description: '',
  banner: '',
  marketingSite: '',
  createdAt: '',
  users: [],
};

/**
 * Upload File
 */
export const uploadProfileFileAction = createAsyncThunk<
  { url: string },
  {},
  {
    rejectValue: ErrorType;
  }
>(
  'uploadProfileFile/uploadProfileFileAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.uploadProfileFile(payload);
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
 * create organizer
 */
export const createOrganizerAction = createAsyncThunk<
  { id: string },
  CreateOrganiserPayload,
  {
    rejectValue: ErrorType;
  }
>(
  'createOrganizer/createOrganizerAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.createOrganizer(payload);
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
 * get organizer detail
 */
export const getOrganizerDetailAction = createAsyncThunk<
  OrganiserDetailProps,
  { id: string },
  {
    rejectValue: ErrorType;
  }
>(
  'getOrganizerDetail/getOrganizerDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.getOrganizerDetail(payload.id);
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
 * check admin user exist
 */
export const checkAdminUserExistAction = createAsyncThunk<
  {},
  { email: string; excludeId?: string },
  {
    rejectValue: ErrorType;
  }
>(
  'checkAdminUserExist/checkAdminUserExistAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.checkAdminUserExist(payload);
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
 * update organizer
 */
export const updateOrganizerAction = createAsyncThunk<
  {},
  { id: string; data: CreateOrganiserPayload },
  {
    rejectValue: ErrorType;
  }
>(
  'updateOrganizer/updateOrganizerAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await OrganizerService.updateOrganizer(
        payload.data,
        payload.id,
      );
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

interface CreateOrganisersState {
  loading: boolean;
  saveButtonLoading: boolean;
  data: { id: string };
  organiserDetail: OrganiserDetailProps;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: CreateOrganisersState = {
  loading: false,
  saveButtonLoading: false,
  data: { id: '' },
  organiserDetail: defaultEmptyData,
  error: null,
};

export const createOrganiserSlice = createSlice({
  name: 'createOrganiser',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrganizerAction.pending, (state) => {
        state.data = initialState.data;
        state.loading = true;
      })
      .addCase(createOrganizerAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrganizerAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateOrganizerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrganizerAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getOrganizerDetailAction.pending, (state) => {
        state.organiserDetail = initialState.organiserDetail;
        state.loading = true;
      })
      .addCase(getOrganizerDetailAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.organiserDetail = action.payload;
      })
      .addCase(getOrganizerDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(checkAdminUserExistAction.pending, (state) => {
        state.saveButtonLoading = true;
      })
      .addCase(checkAdminUserExistAction.fulfilled, (state) => {
        state.saveButtonLoading = false;
      })
      .addCase(checkAdminUserExistAction.rejected, (state, action) => {
        state.saveButtonLoading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = createOrganiserSlice.actions;

export const selectLoading = (state: RootState) =>
  state.createOrganiser.loading;
export const selectSaveButtonLoading = (state: RootState) =>
  state.createOrganiser.saveButtonLoading;
export const selectError = (state: RootState) => state.createOrganiser.error;
export const selectData = (state: RootState) => state.createOrganiser.data;
export const selectOrganiserDetail = (state: RootState) =>
  state.createOrganiser.organiserDetail;

export default createOrganiserSlice.reducer;
