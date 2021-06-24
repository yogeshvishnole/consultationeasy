import axios from "axios";
import { ICommunicationType } from "../types";

const createConnectAccount = async (token: string | null) => {
  const response = await axios.get("/api/v1/stripe/create-connect-account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getAccountStatus = async (token: string | null) => {
  const response = await axios.get("/api/v1/stripe/get-account-status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getSessionId = async (
  token: string | null,
  data: {
    id: string | undefined;
    communicationType: ICommunicationType;
    numOfDays: number;
  }
) => {
  const response = await axios.post("/api/v1/bookings/stripeSessionId", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const createBookingOnStripeSuccess = async (
  token: string | null,
  data: {
    communicationType: ICommunicationType | undefined;
    numOfDays: number | undefined;
    id: string;
  }
) => {
  const response = await axios.post(`/api/v1/bookings/stripeSuccess`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export default {
  createConnectAccount,
  getAccountStatus,
  getSessionId,
  createBookingOnStripeSuccess,
};
