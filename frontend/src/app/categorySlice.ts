import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../types";

interface CategoryState {
  data: Category[];
  error: string | null;
  loading: boolean;
}

const initialState: CategoryState = {
  data: [],
  error: null,
  loading: false,
};

export const getCategories = createAsyncThunk(
  "category/getall",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/categories");
      return response.data.data.categories;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.data = [];
    });
  },
});

export default categorySlice.reducer;
