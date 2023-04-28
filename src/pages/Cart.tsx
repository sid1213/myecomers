import { Row, Col, Table, Image, Card, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DeleteOutlined } from "@ant-design/icons";
import ItemCounter from "../components/ItemCounter";
import { useEffect } from "react";
import { deleteCartItem } from "../store/productSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dataArr = useAppSelector(
    (state) => state.cartSlice.cartSlice.AddedProducts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);
  const dataSource = dataArr.map((ele) => {
    return {
      img: (
        <Image
          src={ele.item.image}
          alt="img"
          className="priviewImg"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      poduct: `${ele.item.title}`,
      price: `$${ele.item.price}`,
      quantity: <ItemCounter id={ele.item.id} quantity={ele.quantity} />,
      subtotal: `$${(ele.item.price * ele.quantity).toFixed(2)}`,
      dump: (
        <DeleteOutlined onClick={() => dispatch(deleteCartItem(ele.item.id))} />
      ),
    };
  });

  const columns = [
    {
      title: "",
      dataIndex: "img",
      key: "img",
    },
    {
      title: "Product",
      dataIndex: "poduct",
      key: "poduct",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantitiy",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
    {
      title: " ",
      dataIndex: "dump",
      key: "dump",
    },
  ];
  return (
    <div className="cartMain container ">
      <h1 className="mt-2 mb-1">CART</h1>
      <hr />
      <Row className="mb-2 mt-1 cartRow">
        <Col span={16}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Col>
        <Col span={7}>
          <Card
            title="Cart totals"
            bordered={false}
            style={{ width: "100%" }}
            className="text-center"
          >
            {dataArr.length ? (
              <div>
                <Row>
                  <Col span={12}>
                    <h1>SubTotal</h1>
                  </Col>
                  <Col span={12}>
                    {" "}
                    <h1>
                      $
                      {dataArr
                        .reduce(
                          (total, ele) =>
                            (total = total + ele.item.price * ele.quantity),
                          0
                        )
                        .toFixed(2)}
                    </h1>
                  </Col>
                </Row>
                <br />
                <hr />

                <Row className="mt-1">
                  <Col span={12}>
                    <h1>Grand total</h1>
                  </Col>
                  <Col span={12}>
                    {" "}
                    <h1>
                      $
                      {dataArr
                        .reduce(
                          (total, ele) =>
                            (total = total + ele.item.price * ele.quantity),
                          0
                        )
                        .toFixed(2)}
                    </h1>
                  </Col>
                </Row>
                <Link to="/checkout">
                  <Button className="mt-3 w-full p-0 btn">
                    <h3>Checkout</h3>
                  </Button>
                </Link>
              </div>
            ) : (
              " Add Products to Cart"
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
