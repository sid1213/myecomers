import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  AddAndRemoveItemState,
  AllProductState,
  SingleProductState,
  UserOrderState,
  cartDetails,
  cartState,
  userCartState,
  userState,
} from "../type/index";

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
  AddedProducts: [],
  cartVolume: 0,
  totalAmt: 0,
};

const getUserDetailFromLocalStorage = (): [] => {
  let taskBox = localStorage.getItem("user-detail");
  if (taskBox) {
    return JSON.parse(taskBox || "");
  } else {
    return [];
  }
};

const setTodoOnLocalStorage = (state: userState[]) => {
  localStorage.setItem("user-detail", JSON.stringify(state));
};

const userDetails: userState[] = getUserDetailFromLocalStorage();

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
      // state[action.payload.index].userOrder = action.payload.userCart;
      state[action.payload.index].userOrder = [
        ...state[action.payload.index].userOrder,
        ...action.payload.userCart,
      ];
      state[action.payload.index].userCart = [];
      setTodoOnLocalStorage(state);
    },
  },
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: cart,
  reducers: {
    addCart(state, action: PayloadAction<cartDetails>) {
      let find = state.AddedProducts.findIndex(
        (ele) => ele.item.id === action.payload.item.id
      );
      if (find >= 0) {
        state.AddedProducts[find].quantity += 1;
      } else {
        state.AddedProducts.push(action.payload);
      }
    },
    deleteCartItem(state, action: PayloadAction<cartDetails["item"]["id"]>) {
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
    setCart(state, action: PayloadAction<cartDetails[]>) {
      state.AddedProducts = action.payload;
    },
  },
});

export const { addCart, deleteCartItem, addAndRemoveItem, clearCart, setCart } =
  cartSlice.actions;
export const { addUser, addUserCart, setMyorder } = userSlice.actions;

export default combineReducers({
  product: productsSlice.reducer,
  singleProductSlice: singleProductSlice.reducer,
  cartSlice: cartSlice.reducer,
  userSlice: userSlice.reducer,
});
