import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ChatType } from "../types";

interface ChatStateType {
  chat: ChatType | null;
  error: string | null;
  success: string | null;
  loading: boolean;
}

const initialState: ChatStateType = {
  chat: null,
  error: null,
  success: null,
  loading: false,
};

export const getChat = createAsyncThunk(
  "chat/getALl",
  async (
    data: { token: string; data: { [key: string]: string } },
    { rejectWithValue }
  ) => {
    let queryStr = "";
    for (const [key, value] of Object.entries(data.data)) {
      queryStr += `${key}=${value}&`;
    }
    try {
      const response = await axios.get(
        `/api/v1/chats?${queryStr.slice(0, -1)}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChat.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.chat = null;
    });
    builder.addCase(getChat.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.chat = (payload as unknown) as ChatType;
    });
    builder.addCase(getChat.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.chat = null;
    });
  },
});

export default chatSlice.reducer;
