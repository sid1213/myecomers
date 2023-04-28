import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import singleProductSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./productSlice";
import currentUserSlice from "./loginDetails";
export const store = configureStore({
  reducer: {
    myProducts: productsSlice,
    singleProductSlice,
    cartSlice,
    userSlice,
    currentUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
