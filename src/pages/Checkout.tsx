import { Card, Row, Col, Modal } from "antd";
import { useAppSelector } from "../hooks";
import { useState } from "react";

import CheckoutForm from "../components/Form";

function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataArr = useAppSelector((state) => state.cartSlice.AddedProducts);

  return (
    <div className="container checkoutMain mb-2">
      <h1 className="mt-2 mb-2">Checkout</h1>
      <hr />
      <Row className="mt-2">
        <Col span={16}>
          {dataArr.length ? <CheckoutForm /> : "Please add Products"}
        </Col>
        <Col span={8} style={{ height: "fit-content" }}>
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
              </div>
            ) : (
              " Add Products to Cart"
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>Please Login Before checkout </p>
      </Modal>
    </div>
  );
}

export default Checkout;
