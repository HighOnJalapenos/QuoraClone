import { configureStore } from "@reduxjs/toolkit";
import { quoraApi } from "./services/quoraApi";

export const store = configureStore({
  reducer: {
    [quoraApi.reducerPath]: quoraApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quoraApi.middleware),
});
