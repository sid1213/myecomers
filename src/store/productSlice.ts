import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";

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
export interface AllProductState {
  items: productState[];
  loading: boolean;
  error: null | string;
}
export interface singleProductState {
  item: productState;
  myloading: boolean;
  myerror: null | string;
}

const initialState: AllProductState = {
  items: [],
  loading: true,
  error: "",
};
const singleProduct: singleProductState = {
  item: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
  myloading: true,
  myerror: "",
};

export const fetchLimitedProducts = createAsyncThunk(
  "Limitedproducts",
  async (limit: string | undefined, thunkAPI) => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}`,
        {
          method: "GET",
        }
      );
      const data: AllProductState["items"] = await res.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "Allproducts",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
      });
      const data: AllProductState["items"] = await res.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "singleProductsFetch",
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "GET",
      });
      const data: singleProductState["item"] = await res.json();
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
        (state, action: PayloadAction<AllProductState["items"]>) => {
          state.loading = true;
          state.items = action.payload;
        }
      )
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<AllProductState["items"]>) => {
          state.loading = true;
          state.items = action.payload;
        }
      );
  },
});

export const singleProductSlice = createSlice({
  name: "singleproduct",
  initialState: singleProduct,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.myloading = false;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<singleProductState["item"]>) => {
          state.myloading = true;
          state.item = action.payload;
        }
      );
  },
});
export default combineReducers({
  product: productsSlice.reducer,
  singleProductSlice: singleProductSlice.reducer,
});
