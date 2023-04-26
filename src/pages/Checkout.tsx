import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Card,
  Row,
  Col,
} from "antd";

import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

const onFinish = (values: any) => {
  console.log(values);
  values = [];
};

function Checkout() {
  const dataArr = useAppSelector(
    (state) => state.cartSlice.cartSlice.AddedProducts
  );

  return (
    <div className="container checkoutMain">
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
                rules={[{ required: true, type: "string", message: "shdgsh" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lname"
                rules={[{ required: true, type: "string", message: "shdgsh" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true }]}
              >
                <Cascader
                  options={[
                    {
                      value: "zhejiang",
                      label: "Zhejiang",
                    },
                  ]}
                />
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
    </div>
  );
}

export default Checkout;
