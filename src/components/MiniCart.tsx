import { useAppSelector } from "../hooks";
import CartItems from "./CartItems";

function MiniCart() {
  const miniCartItems = useAppSelector(
    (state) => state.cartSlice.AddedProducts
  );

  return (
    <div className="minicart ">
      <div className="cartContent">
        {miniCartItems.length
          ? miniCartItems.map((ele) => {
              return <CartItems item={ele.item} quantity={ele.quantity} />;
            })
          : "No Product"}
      </div>
      <div className={`total ${miniCartItems.length ? "" : "hidden"}`}>
        <h3>Total amount:</h3>
        <h3>
          $
          {miniCartItems.length
            ? miniCartItems.reduce((total, ele) => {
                return (total = total + ele.quantity * ele.item.price);
              }, 0)
            : 0}
        </h3>
      </div>
    </div>
  );
}

export default MiniCart;
