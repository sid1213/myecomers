import { createReducer, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils";

const initialState = "";
interface productState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = createAsyncThunk("products", async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=9", {
    method: "GET",
  });
  const data = await res.json();
  return data;
});

export const products = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(state);
    });
  },
});
export default products.reducer;
