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
export interface cartDetails {
  item: ProductState;
  quantity: number;
}
export interface cartState {
  AddedProducts: cartDetails[];
  cartVolume: number;
  totalAmt: number;
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
  userCart: cartDetails[];
  userOrder: cartDetails[];
}
export interface userCartState {
  userCart: cartDetails;
  index: number;
}
export interface UserOrderState {
  userCart: userState["userCart"];
  index: number;
}
