import { configureStore } from '@reduxjs/toolkit';
import { noteSlice } from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    notion: noteSlice.reducer
  },
});
