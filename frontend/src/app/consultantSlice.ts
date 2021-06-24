import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { boolean, string } from "yup/lib/locale";
import { ConsultantType } from "../types";

interface consultantStateType {
  consultant: ConsultantType | null;
  consultants: ConsultantType[];
  error: null | string;
  success: null | string;
  loading: boolean;
}

const initialState: consultantStateType = {
  consultant: null,
  consultants: [],
  error: null,
  success: null,
  loading: false,
};

export const getConsultant = createAsyncThunk(
  "consultant/get",
  async (data: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/consultants/userId/${data.userId}`
      );
      return response.data.data;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const getConsultantById = createAsyncThunk(
  "consultant/get",
  async (data: { consultantId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/consultants/${data.consultantId}`
      );
      return response.data.data;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getConsultants = createAsyncThunk(
  "consultant/getAll",
  async (data: { [key: string]: string }, { rejectWithValue }) => {
    let queryStr = "";
    for (const [key, value] of Object.entries(data)) {
      queryStr += `${key}=${value}&`;
    }
    try {
      const response = await axios.get(
        `/api/v1/consultants?${queryStr.slice(0, -1)}`
      );
      return response.data.data;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConsultant.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.consultant = null;
    });
    builder.addCase(getConsultant.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consultant = payload;
    });
    builder.addCase(getConsultant.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.consultant = null;
    });
    builder.addCase(getConsultants.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.consultants = [];
    });
    builder.addCase(getConsultants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.consultants = (payload as unknown) as ConsultantType[];
    });
    builder.addCase(getConsultants.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.consultants = [];
    });
  },
});

export default consultantSlice.reducer;
