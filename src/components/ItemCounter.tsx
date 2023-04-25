import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks";
import { addAndRemoveItem } from "../store/productSlice";
import { useEffect } from "react";

interface propState {
  id: number;
  quantity: number;
}

const ItemCounter: React.FC<propState> = ({ id, quantity }) => {
  const dispatch = useAppDispatch();

  const addItem = () => {
    const operator = "plus";

    dispatch(addAndRemoveItem({ id, operator }));
  };
  const removeItem = () => {
    const operator = "minus";

    dispatch(addAndRemoveItem({ id, operator }));
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <MinusCircleOutlined onClick={removeItem} />
      &nbsp;
      {quantity}&nbsp;
      <PlusCircleOutlined onClick={addItem} />
    </>
  );
};

export default ItemCounter;
