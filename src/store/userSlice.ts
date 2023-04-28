import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserOrderState, userCartState, userState } from "../type";
import {
  getUserDetailFromLocalStorage,
  setTodoOnLocalStorage,
} from "./productSlice";

const userDetails: userState[] = getUserDetailFromLocalStorage();

export const userSlice = createSlice({
  name: "user",
  initialState: userDetails,
  reducers: {
    addUser(state, action: PayloadAction<userState>) {
      state.push(action.payload);
      setTodoOnLocalStorage(state);
    },
    addUserCart(state, action: PayloadAction<userCartState>) {
      let find = state[action.payload.index].userCart.findIndex(
        (ele) => ele.item.id === action.payload.userCart.item.id
      );
      if (find >= 0) {
        state[action.payload.index].userCart[find].quantity += 1;
      } else {
        state[action.payload.index].userCart.push(action.payload.userCart);
        setTodoOnLocalStorage(state);
      }
    },
    setMyorder(state, action: PayloadAction<UserOrderState>) {
      state[action.payload.index].userOrder = [
        ...state[action.payload.index].userOrder,
        ...action.payload.userCart,
      ];
      state[action.payload.index].userCart = [];
      setTodoOnLocalStorage(state);
    },
  },
});

export const { addUser, addUserCart, setMyorder } = userSlice.actions;
export default userSlice.reducer;
