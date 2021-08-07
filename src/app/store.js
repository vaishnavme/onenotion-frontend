import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from "../features/auth/authSlice";
import notionSliceReducer from "../features/notions/notionSlice";
import sharedPageReducer from "../features/shared/sharedSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    notion: notionSliceReducer,
    share: sharedPageReducer
  },
});
