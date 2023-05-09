import { useMemo } from "react";
import { useAppSelector } from "../hooks";
import CartItems from "./CartItems";

function MiniCart() {
  const miniCartItems = useAppSelector(
    (state) => state.cartSlice.AddedProducts
  );

  const CalculatedValue = useMemo(() => {
    // console.log("run");
    return miniCartItems.length
      ? miniCartItems.reduce((total, ele) => {
          total = total + ele.quantity;
          return total;
        }, 0)
      : 0;
  }, [miniCartItems]);

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
        <h3>${CalculatedValue}</h3>
      </div>
    </div>
  );
}

export default MiniCart;
