import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "../features/auth/authSlice";
import pageSliceReducer from "../features/pages/pageSlice";
import sharedPageReducer from "../features/shared/sharedSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    page: pageSliceReducer,
    share: sharedPageReducer
  },
});
