import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BookingType } from "../types";

interface bookingStateType {
  booking: BookingType | null;
  bookings: BookingType[];
  error: null | string;
  success: null | string;
  loading: boolean;
}

const initialState: bookingStateType = {
  booking: null,
  bookings: [],
  error: null,
  success: null,
  loading: false,
};

export const getBooking = createAsyncThunk(
  "booking/get",
  async (data: { token: string; id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/bookings/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (err) {
      console.log("Err", err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getBookings = createAsyncThunk(
  "bookings/getAll",
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
        `/api/v1/bookings?${queryStr.slice(0, -1)}`,
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

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooking.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.booking = null;
    });
    builder.addCase(getBooking.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.booking = payload;
    });
    builder.addCase(getBooking.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.booking = null;
    });
    builder.addCase(getBookings.pending, (state, { payload }) => {
      state.loading = true;
      state.error = null;
      state.bookings = [];
    });
    builder.addCase(getBookings.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.bookings = (payload as unknown) as BookingType[];
    });
    builder.addCase(getBookings.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
      state.bookings = [];
    });
  },
});

export default bookingSlice.reducer;
