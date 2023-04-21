import { configureStore } from "@reduxjs/toolkit";
import { products } from "./productSlice";
export const store = configureStore({
  reducer: {
    // myProducts: products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
