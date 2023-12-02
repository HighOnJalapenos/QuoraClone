import { configureStore } from "@reduxjs/toolkit";
import { quoraApi } from "./services/quoraApi";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    [quoraApi.reducerPath]: quoraApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quoraApi.middleware),
});
