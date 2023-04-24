import React, { useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import img from "../images/logo.png";
import { useAppSelector } from "../hooks";
function MiniCart() {
  const miniCartItems = useAppSelector(
    (state) => state.cartSlice.cartSlice.AddedProducts.cartitem
  );
  useEffect(() => {}, [miniCartItems]);
  return (
    <div className="minicart">
      <div className="cartContent">
        {miniCartItems.length
          ? miniCartItems.map((ele) => {
              return (
                <div className="cartItem">
                  <div className="item">
                    <div className="imgContainer">
                      <img
                        src={ele.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="itemDetail">
                      <h4>{ele.title}</h4>
                      <p>1 × $250</p>
                    </div>
                  </div>
                  <div className="dltItem">
                    <DeleteFilled />
                  </div>
                </div>
              );
            })
          : "No Product"}
      </div>
    </div>
  );
}

export default MiniCart;
