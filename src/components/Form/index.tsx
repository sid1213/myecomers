import { Button, Form, Input, InputNumber, Radio, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";
import { setMyorder } from "../../store/userSlice";
import { clearCart } from "../../store/cartSlice";

const CheckoutForm = () => {
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
  //   const dataArr = useAppSelector((state) => state.cartSlice.AddedProducts);

  return (
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

      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="PinCode" name="pincode" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Payment" name="payment" rules={[{ required: true }]}>
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
  );
};

export default CheckoutForm;
