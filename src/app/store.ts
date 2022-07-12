import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesSlice from "../features/categories/categoriesSlice";
import newsSlice from "../features/news/newsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    news: newsSlice,
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
