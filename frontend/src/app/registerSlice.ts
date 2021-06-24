import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthData } from "../types";

interface RegisterState {
  error: string | null;
  success: string | null;
  loading: boolean;
}

const registerInitialState: RegisterState = {
  error: null,
  success: null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "users/register",
  async (data: AuthData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: registerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.success = payload.message;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export default registerSlice.reducer;
