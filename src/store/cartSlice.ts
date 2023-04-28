import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddAndRemoveItemState, CartDetails, CartState } from "../type/index";

const cart: CartState = {
  AddedProducts: [],
  cartVolume: 0,
  totalAmt: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    addCart(state, action: PayloadAction<CartDetails>) {
      let find = state.AddedProducts.findIndex(
        (ele) => ele.item.id === action.payload.item.id
      );
      if (find >= 0) {
        state.AddedProducts[find].quantity += 1;
      } else {
        state.AddedProducts.push(action.payload);
      }
    },
    deleteCartItem(state, action: PayloadAction<CartDetails["item"]["id"]>) {
      state.AddedProducts = state.AddedProducts.filter(
        (ele) => ele.item.id !== action.payload
      );
    },
    addAndRemoveItem(state, action: PayloadAction<AddAndRemoveItemState>) {
      let find = state.AddedProducts.findIndex(
        (ele) => ele.item.id === action.payload.id
      );

      if (
        action.payload.operator === "minus" &&
        state.AddedProducts[find].quantity !== 1
      ) {
        state.AddedProducts[find].quantity -= 1;
      } else if (action.payload.operator === "plus") {
        state.AddedProducts[find].quantity += 1;
      }
    },
    clearCart(state) {
      state.AddedProducts = [];
    },
    setCart(state, action: PayloadAction<CartDetails[]>) {
      state.AddedProducts = action.payload;
    },
  },
});

export const { addCart, deleteCartItem, addAndRemoveItem, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
