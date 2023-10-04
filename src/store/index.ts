import { configureStore } from '@reduxjs/toolkit';
import { cricketerSlice } from './cricketer-slice';

export const store = configureStore({
  reducer: { cricketers: cricketerSlice.reducer  },
});

export type RootState = ReturnType<typeof store.getState>;