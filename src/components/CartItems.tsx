import { CartDetails } from "../type";
import { Image, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useAppDispatch } from "../hooks";
import { useCallback } from "react";
import { deleteCartItem } from "../store/cartSlice";

const CartItems: React.FC<CartDetails> = ({ item, quantity }) => {
  const dispatch = useAppDispatch();

  const deleteItem = useCallback(
    (id: number) => {
      dispatch(deleteCartItem(id));
    },
    [dispatch]
  );

  return (
    <div className="cartItem" key={item.id}>
      <div className="item">
        <div className="imgContainer">
          <Image
            src={item.image}
            preview={false}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="itemDetail">
          <h4>{item.title}</h4>
          <p>
            {quantity} × ${item.price}
          </p>
        </div>
      </div>
      <Button
        className="dltItem"
        onClick={() => {
          deleteItem(item.id);
        }}
      >
        <DeleteFilled />
      </Button>
    </div>
  );
};

export default CartItems;
