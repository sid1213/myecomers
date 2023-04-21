import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface productState {
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
export interface SingleproductState {
  items: productState[];
}

const initialState: SingleproductState = {
  items: [],
};

export const fetchLimitedProducts = createAsyncThunk("products", async () => {
  const res = await fetch("https://fakestoreapi.com/products?limit=9", {
    method: "GET",
  });
  const data = await res.json();
  return data;
});

// export const fetchSingleProduct = createAsyncThunk{
//   "singleProduct",
//   async()=>{

//   }
// }
export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLimitedProducts.fulfilled,
      (state, action: PayloadAction<[]>) => {
        state.items = action.payload;
      }
    );
  },
});
export default productsSlice.reducer;
