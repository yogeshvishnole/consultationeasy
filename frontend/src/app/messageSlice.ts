import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MessageType } from "../types";

interface MessageStateType {
  messages: MessageType[];
  error: null | string;
  loading: boolean;
  sending: boolean;
  success: null | string;
}

const initialState: MessageStateType = {
  messages: [],
  error: null,
  loading: false,
  sending: false,
  success: null,
};

export const sendMessage = createAsyncThunk(
  "message/create",
  async (
    data: { token: string; message: string; chatId: string },
    { rejectWithValue }
  ) => {
    const { message, chatId, token } = data;
    try {
      const response = await axios.post(
        `/api/v1/messages`,
        { message, chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/getAll",
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
        `/api/v1/messages?${queryStr.slice(0, -1)}`,
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

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state, { payload }) => {
      state.sending = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      state.sending = false;
      state.error = null;
      state.success = "Message sent successfully";
    });
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
      console.log("Err sending message", payload);
      state.sending = false;
      state.error = "Error sending the message";
      state.success = null;
    });
    builder.addCase(getMessages.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.messages = [];
    });
    builder.addCase(getMessages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.messages = (payload as unknown) as MessageType[];
    });
    builder.addCase(getMessages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.messages = [];
    });
  },
});

export default messageSlice.reducer;
