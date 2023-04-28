import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import singleProductSlice from "./productSlice";
import limitedProductSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import currentUserSlice from "./loginDetails";
export const store = configureStore({
  reducer: {
    myProducts: productsSlice,
    singleProductSlice,
    limitedProductSlice,
    cartSlice,
    userSlice,
    currentUserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
