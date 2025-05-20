import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { uiSlice } from '../../features/ui/slices/uiSlice';
import { nuggetApi } from '../../features/nugget/api/nuggetApi';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [nuggetApi.reducerPath]: nuggetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nuggetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
