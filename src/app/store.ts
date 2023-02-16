import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from "../components/auth/authSlice"
import toolbarSlice from "../components/toolbar/toolbarSlice"
import publicPicturesSlice from "../components/publicPictures/publicPicturesSlice"
export const store = configureStore({
  reducer: {
    authSlice,
    toolbarSlice,
    publicPicturesSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppState = ReturnType<typeof store.getState>