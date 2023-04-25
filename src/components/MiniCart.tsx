import React, { useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCartItem } from "../store/productSlice";

function MiniCart() {
  const miniCartItems = useAppSelector(
    (state) => state.cartSlice.cartSlice.AddedProducts
  );
  const dispatch = useAppDispatch();
  const deleteItem = (id: number) => {
    dispatch(deleteCartItem(id));
  };

  useEffect(() => {}, [dispatch, miniCartItems]);

  return (
    <div className="minicart ">
      <div className="cartContent">
        {miniCartItems.length
          ? miniCartItems.map((ele) => {
              return (
                <div className="cartItem">
                  <div className="item">
                    <div className="imgContainer">
                      <img
                        src={ele.item.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="itemDetail">
                      <h4>{ele.item.title}</h4>
                      <p>
                        {ele.quantity} × ${ele.item.price}
                      </p>
                    </div>
                  </div>
                  <div
                    className="dltItem"
                    onClick={() => {
                      deleteItem(ele.item.id);
                    }}
                  >
                    <DeleteFilled />
                  </div>
                </div>
              );
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
