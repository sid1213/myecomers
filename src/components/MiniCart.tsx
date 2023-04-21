import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import img from "../images/logo.png";
function MiniCart() {
  return (
    <div className="minicart">
      <div className="cartContent">
        <div className="cartItem">
          <div className="item">
            <div className="imgContainer">
              <img src={img} alt="" />
            </div>
            <div className="itemDetail">
              <h4>Title</h4>
              <p>1 × $250</p>
            </div>
          </div>
          <div className="dltItem">
            <DeleteFilled />
          </div>
        </div>
        <div className="cartItem">
          <div className="item">
            <div className="imgContainer">
              <img src={img} alt="" />
            </div>
            <div className="itemDetail">
              <h4>Title</h4>
              <p>1 × $250</p>
            </div>
          </div>
          <div className="dltItem">
            <DeleteFilled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
