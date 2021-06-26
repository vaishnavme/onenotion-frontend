import { configureStore } from '@reduxjs/toolkit';
import noteSliceReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    notion: noteSliceReducer
  },
});
