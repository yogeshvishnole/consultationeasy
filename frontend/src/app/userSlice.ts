import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  authenticate,
  getCookie,
  isAuth,
  updateUserInLocalStorage,
} from "../helpers/auth";
import { AuthData, LoginResponseType, UserType } from "../types";
import history from "../helpers/history";
import { rolePath } from "../helpers";

interface UserState {
  user: UserType | null;
  token: string | null;
  error: string | null;
  success: string | null;
  loading: boolean;
}

const initialState: UserState = {
  user: isAuth() || null,
  token: getCookie("token") || null,
  error: null,
  success: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: Omit<AuthData, "name">, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/login", data);
      authenticate(response.data as LoginResponseType, () => {
        history.push(rolePath(response.data?.data.user));
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/get",
  async (data: { token: string | null }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      updateUserInLocalStorage(response.data.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clear: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.user = null;
      state.token = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data.user;
      state.token = payload.token;
    });
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload.message;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      if (state) {
        state.user = payload.data;
      }
    });
  },
});

export const { clear: clearUserFromState } = userSlice.actions;

export default userSlice.reducer;
