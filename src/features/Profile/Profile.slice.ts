import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { verificationApi } from '../../utils/func';
import { RootState } from '../../app/store';
import UsersService from '../../services/API/Users';

/* eslint-disable no-param-reassign, complexity */

const defaultProfileInfo = {
  id: 0,
  uuid: '',
  name: '',
  description: '',
  banner: '',
  logo: '',
  marketingSite: '',
};

export interface ErrorType {
  code: number | undefined;
  message: string;
}

export interface OrganizerProfileInfo {
  id: number;
  uuid: string;
  name: string;
  description: string;
  banner: string;
  logo: string;
  marketingSite: string;
}

export interface UpdateProfilePayload {
  description: string;
  banner: string;
  logo: string;
  marketingSite: string;
}

/**
 * get profile info
 */
export const getProfileInfoAction = createAsyncThunk<
  OrganizerProfileInfo,
  undefined,
  {
    rejectValue: ErrorType;
  }
>('getProfileInfo/getProfileInfoAction', async (_, { rejectWithValue }) => {
  try {
    const response = await UsersService.getProfileInfo();
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
 * update profile info
 */
export const updateProfileInfoAction = createAsyncThunk<
  {},
  UpdateProfilePayload,
  {
    rejectValue: ErrorType;
  }
>(
  'updateProfileInfo/updateProfileInfoAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UsersService.updateProfileInfo(payload);
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

interface ProfileState {
  loading: boolean;
  data: OrganizerProfileInfo;
  error:
    | {
        code: number | undefined;
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: ProfileState = {
  loading: false,
  data: defaultProfileInfo,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfoAction.pending, (state) => {
        state.data = defaultProfileInfo;
        state.loading = true;
      })
      .addCase(getProfileInfoAction.fulfilled, (state, action: any) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfileInfoAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateProfileInfoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileInfoAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfileInfoAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as ErrorType;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset } = profileSlice.actions;

export const selectLoading = (state: RootState) => state.profile.loading;
export const selectData = (state: RootState) => state.profile.data;
export const selectError = (state: RootState) => state.profile.error;

export default profileSlice.reducer;
