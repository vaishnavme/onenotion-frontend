import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "../features/auth/authSlice";
import noteSliceReducer from '../features/pages/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    notion: noteSliceReducer
  },
});
