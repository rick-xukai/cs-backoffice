/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { verificationApi } from '../../utils/func';
import EmailsService from '../../services/API/Emails/Emails.service';
import UsersService from '../../services/API/Users/Users.service';
import {
  defaultCurrentPage,
  defaultPageSize,
  GetAllDataPageSize,
} from '../../constants/General';

export interface ErrorType {
  message: string;
  code?: number;
}

export interface CreateEmailPayload {
  eventId: number;
  subject: string;
  html: string;
  organiserEmail: string;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  sendTime: string;
  socialMediaHtml?: string;
}

export interface EventReminderListProps {
  id: number;
  name: string;
  organizerName: string;
  partnerName: string;
  address: string;
  location: string;
  time: string;
}

export interface EmailDetailProps {
  event: {
    id: number;
    name: string;
    organizer: {
      name: string;
    };
  };
  subject: string;
  html: string;
  sendTime: string;
  organiserEmail: string;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  status: number;
}

const defalutEmailDetail = {
  event: {
    id: 0,
    name: '',
    organizer: {
      name: '',
    },
  },
  subject: '',
  html: '',
  sendTime: '',
  organiserEmail: '',
  facebookLink: '',
  instagramLink: '',
  websiteLink: '',
  status: 0,
};

/**
 * create email
 */
export const createEmailAction = createAsyncThunk<
  {},
  CreateEmailPayload,
  {
    rejectValue: ErrorType;
  }
>('createEmail/createEmailAction', async (payload, { rejectWithValue }) => {
  try {
    const response = await EmailsService.createEmail(payload);
    if (verificationApi(response)) {
      return response.data;
    }

    return rejectWithValue({
      message: response.message,
      code: response.code,
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
 * get reminder list
 */
export const getReminderListAction = createAsyncThunk<
  { count: number; list: EventReminderListProps[] },
  undefined,
  {
    rejectValue: ErrorType;
  }
>('getReminderList/getReminderListAction', async (_, { rejectWithValue }) => {
  try {
    const response = await EmailsService.getEventReminderList({
      page: defaultCurrentPage,
      size: GetAllDataPageSize,
    });
    if (verificationApi(response)) {
      return response.data;
    }

    return rejectWithValue({
      message: response.message,
      code: response.code,
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
 * get email detail
 */
export const getEmailDetailAction = createAsyncThunk<
  EmailDetailProps,
  string,
  {
    rejectValue: ErrorType;
  }
>(
  'getEmailDetail/getEmailDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmailsService.getEventDetail(payload);
      if (verificationApi(response)) {
        return response.data;
      }

      return rejectWithValue({
        message: response.message,
        code: response.code,
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
 * udpate email detail
 */
export const updateEmailDetailAction = createAsyncThunk<
  {},
  { data: CreateEmailPayload; id: string },
  {
    rejectValue: ErrorType;
  }
>(
  'updateEmailDetail/updateEmailDetailAction',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await EmailsService.updateEmailDetail(
        payload.data,
        payload.id,
      );
      if (verificationApi(response)) {
        return response.data;
      }

      return rejectWithValue({
        message: response.message,
        code: response.code,
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

export interface emailEditState {
  loading: boolean;
  uploadFileLoading: boolean;
  eventReminderList: EventReminderListProps[];
  anyFieldChanged: boolean;
  emailDetail: EmailDetailProps;
  error:
    | {
        message: string | undefined;
        code?: number;
      }
    | undefined
    | null;
}

const initialState: emailEditState = {
  loading: false,
  uploadFileLoading: false,
  anyFieldChanged: false,
  eventReminderList: [],
  emailDetail: defalutEmailDetail,
  error: null,
};

export const emailEditSlice = createSlice({
  name: 'emailEdit',
  initialState,
  reducers: {
    reset: () => initialState,
    checkAnyFieldChanged: (state, action) => {
      state.anyFieldChanged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmailAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEmailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getReminderListAction.fulfilled, (state, action) => {
        state.eventReminderList = action.payload.list;
      })
      .addCase(getReminderListAction.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(getEmailDetailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmailDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.emailDetail = action.payload;
      })
      .addCase(getEmailDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(updateEmailDetailAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmailDetailAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateEmailDetailAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      })
      .addCase(uploadProfileFileAction.pending, (state) => {
        state.uploadFileLoading = true;
      })
      .addCase(uploadProfileFileAction.fulfilled, (state) => {
        state.uploadFileLoading = false;
      })
      .addCase(uploadProfileFileAction.rejected, (state, action) => {
        state.uploadFileLoading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});

export const { reset, checkAnyFieldChanged } = emailEditSlice.actions;

export const selectLoading = (state: RootState) => state.emailEdit.loading;
export const selectUploadFileLoading = (state: RootState) =>
  state.emailEdit.uploadFileLoading;
export const selectError = (state: RootState) => state.emailEdit.error;
export const selectEventReminderList = (state: RootState) =>
  state.emailEdit.eventReminderList;
export const selectEmailDetail = (state: RootState) =>
  state.emailEdit.emailDetail;
export const selectAnyFieldChanged = (state: RootState) =>
  state.emailEdit.anyFieldChanged;

export default emailEditSlice.reducer;
