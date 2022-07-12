import * as api from  '../../api';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { CategoryInterface } from "../../components/Categories/Category/Category";

interface CounterState {
  categories: CategoryInterface[],
  status: string,
  error: string | null | undefined
}

const initialState: CounterState = {
  categories: [],
  status: 'idle',
  error: null,
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data } = await api.fetchCategories();
    return data;
  }
);

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default CategoriesSlice.reducer;
