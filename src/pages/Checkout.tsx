import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Card,
  Row,
  Col,
  message,
  Modal,
} from "antd";

import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { setMyorder } from "../store/userSlice";
import { clearCart } from "../store/cartSlice";

function Checkout() {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userCheck = useAppSelector((state) => state.userSlice);

  const userLoginStatus = useAppSelector((state) => state.currentUserSlice);

  const onFinish = (values: any) => {
    if (!userLoginStatus.logged) {
      setIsModalOpen(true);
    } else {
      message.success("Order successful");
      let userCart = userCheck[userLoginStatus.userIndex].userCart;
      let index = userLoginStatus.userIndex;
      console.log(index);
      dispatch(setMyorder({ userCart, index }));
      dispatch(clearCart());
    }
  };
  const dataArr = useAppSelector((state) => state.cartSlice.AddedProducts);

  return (
    <div className="container checkoutMain mb-2">
      <h1 className="mt-2 mb-2">Checkout</h1>
      <hr />
      <Row className="mt-2">
        <Col span={16}>
          {dataArr.length ? (
            <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
              style={{ maxWidth: "100%" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, type: "string" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lname"
                rules={[{ required: true, type: "string" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore={false} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="PinCode"
                name="pincode"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item label="City" name="city" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Payment"
                name="payment"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="cod"> COD </Radio>
                  <Radio value="upi" disabled>
                    UPI
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="submit" className="mt-3">
                <Button htmlType="submit" type="primary">
                  Place order
                </Button>
              </Form.Item>
            </Form>
          ) : (
            "Please add Products"
          )}
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
