import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authenticate/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    tickets: ticketReducer,
  },
});
