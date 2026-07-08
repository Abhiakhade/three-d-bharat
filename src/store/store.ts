import { configureStore } from "@reduxjs/toolkit";
import dealReducer from "./slices/dealSlice";

export const store = configureStore({
  reducer: {
    deals: dealReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
