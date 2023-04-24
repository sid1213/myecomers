import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import Item from "antd/es/list/Item";

export interface ProductState {
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
  items: ProductState[];
  loading: boolean;
  error: null | string;
}
export interface SingleProductState {
  item: ProductState;
  myloading: boolean;
  myerror: null | string;
}
export interface cartState {
  AddedProducts: {
    cartitem: ProductState[];
    quantity: number;
  };
  cartVolume: number;
  totalAmt: number;
}
const initialState: AllProductState = {
  items: [],
  loading: true,
  error: "",
};
const singleProduct: SingleProductState = {
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
const cart: cartState = {
  AddedProducts: {
    cartitem: [],
    quantity: 0,
  },
  cartVolume: 0,
  totalAmt: 0,
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
      const data: SingleProductState["item"] = await res.json();
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
        (state, action: PayloadAction<SingleProductState["item"]>) => {
          state.myloading = true;
          state.item = action.payload;
        }
      );
  },
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    addCart(state, action: PayloadAction<ProductState>) {
      // console.log(action.payload);
      let find = state.AddedProducts.cartitem.findIndex(
        (item) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.AddedProducts.quantity += 1;
      } else {
        state.AddedProducts.cartitem.push(action.payload);
        state.AddedProducts.quantity = 1;
      }
    },
  },
});

export const { addCart } = cartSlice.actions;

export default combineReducers({
  product: productsSlice.reducer,
  singleProductSlice: singleProductSlice.reducer,
  cartSlice: cartSlice.reducer,
});
