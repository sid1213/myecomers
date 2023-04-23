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
  loading: boolean;
  error: null | string;
}

const initialState: SingleproductState = {
  items: [],
  loading: true,
  error: "",
};

export const fetchLimitedProducts = createAsyncThunk(
  "products",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products?limit=10", {
        method: "GET",
      });
      const data: SingleproductState["items"] = await res.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLimitedProducts.pending, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchLimitedProducts.fulfilled,
        (state, action: PayloadAction<SingleproductState["items"]>) => {
          state.loading = true;
          state.items = action.payload;
        }
      );
  },
});
export default productsSlice.reducer;
