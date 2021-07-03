import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "../features/auth/authSlice";
import noteSliceReducer from '../features/pages/pageSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    notion: noteSliceReducer
  },
});
