import { configureStore } from "@reduxjs/toolkit";
import { quoraApi } from "./services/quoraApi";
import authReducer from "./Slices/authSlice";
import messageReducer from "./Slices/messageSlice";

export const store = configureStore({
  reducer: {
    [quoraApi.reducerPath]: quoraApi.reducer,
    auth: authReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quoraApi.middleware),
});
