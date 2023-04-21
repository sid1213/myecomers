import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
export const store = configureStore({
  reducer: {
    myProducts: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
