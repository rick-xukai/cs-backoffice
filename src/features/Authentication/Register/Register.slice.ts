import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthenticationService from '../../../services/API/Authentication';
import { RootState } from '../../../app/store';
/* eslint-disable no-param-reassign, complexity */
export interface ErrorType {
  message: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
// register
export const registerAction = createAsyncThunk<
  string,
  RegisterPayload,
  {
    rejectValue: ErrorType;
  }
>(
  'register/registerAction',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    const response = await AuthenticationService.doRegister(payload);
    try {
      if (response.success) {
        return response.results;
      }
      return rejectWithValue({
        message: response.message,
      } as ErrorType);
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue({
        message: err.response,
      } as ErrorType);
    }
  },
);

export interface RegisterState {
  loading: boolean;
  error:
    | {
        message: string | undefined;
      }
    | undefined
    | null;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, () => initialState)
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error as ErrorType;
        }
      });
  },
});
export const selectLoading = (state: RootState) => state.register.loading;
export const selectError = (state: RootState) => state.register.error;

export default registerSlice.reducer;
