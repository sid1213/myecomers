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
  singleProductLoading: boolean;
  singleProductError: null | string;
}
export interface CartDetails {
  item: ProductState;
  quantity: number;
}
export interface CartState {
  AddedProducts: CartDetails[];
}
export interface AddAndRemoveItemState {
  id: ProductState["id"];
  operator: "minus" | "plus";
}
export interface userState {
  user: {
    name: string;
    userName: string;
    password: string;
  };
  userCart: CartDetails[];
  userOrder: CartDetails[];
}
export interface userCartState {
  userCart: CartDetails;
  index: number;
}
export interface UserOrderState {
  userCart: userState["userCart"];
  index: number;
}
