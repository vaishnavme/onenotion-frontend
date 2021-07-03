import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "../features/auth/authSlice";
import noteSliceReducer from '../features/pages/pageSlice';
import sharedPageReducer from "../features/shared/sharedSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    notion: noteSliceReducer,
    shared: sharedPageReducer
  },
});
