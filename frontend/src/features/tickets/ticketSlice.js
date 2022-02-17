import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: [],
  message: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
