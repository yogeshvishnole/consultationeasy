import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import consultantReducer from "./consultantSlice";
import bookingReducer from "./bookingSlice";
import chatReducer from "./chatSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    user: userReducer,
    category: categoryReducer,
    consultant: consultantReducer,
    booking: bookingReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
