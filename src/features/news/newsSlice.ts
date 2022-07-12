import * as api from  '../../api';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewsInterface } from "../../components/News/News";

interface CounterState {
  categoryId: number | null,
  news: NewsInterface[],
  currentStory: number | null,
  pages: number | null,
  status: string,
  error: string | null | undefined
}

const initialState: CounterState = {
  categoryId: null,
  news: [],
  currentStory: null,
  pages: null,
  status: 'idle',
  error: null,
}

export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategory',
  async ({ id, page }: { id: number, page: number }) => {
    const { data } = await api.fetchNewsByCategory(id, page);
    return data;
  }
);

export const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, { payload }) => {
          state.status = 'succeeded';
          state.news = payload.content;
          state.pages = payload.totalPages;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export const { setCategoryId, setCurrentStory } = NewsSlice.actions;

export default NewsSlice.reducer;
