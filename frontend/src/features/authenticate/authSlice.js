import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// handle authenticaton of a new user
export const authNewRegister = createAsyncThunk(
  'authentiicate/register',
  async (usr, thunkAPI) => {
    try {
      return await authService.register(usr);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// handle autheticate]ion of a user login

export const authLogin = createAsyncThunk(
  'authentiicate/login',
  async (usr, thunkAPI) => {
    try {
      return await authService.login(usr);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString() ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authLogout = createAsyncThunk('authenticate/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.message = null;
      state.isSuccess = false;
      state.user = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authNewRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authNewRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(authNewRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
