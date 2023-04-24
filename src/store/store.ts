import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import singleProductSlice from "./productSlice";
import cartSlice from "./productSlice";
export const store = configureStore({
  reducer: {
    myProducts: productsSlice,
    singleProductSlice,
    cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
