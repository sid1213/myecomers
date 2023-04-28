import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { setLogStatus } from "../store/loginDetails";
import User from "../components/User";
import { setCart } from "../store/productSlice";

const Login: React.FC = () => {
  const userCheck = useAppSelector((state) => state.userSlice.userSlice);

  const userLoginStatus = useAppSelector((state) => state.currentUserSlice);

  const dispatch = useAppDispatch();

  // console.log(user);
  const onFinish = (values: any) => {
    let userIndex = userCheck.findIndex(
      (ele) => ele.user.userName === values.username
    );

    if (userCheck.find((ele) => ele.user.userName === values.username)) {
      if (userCheck.find((ele) => ele.user.password === values.password)) {
        message.success(userCheck[userIndex].user.name);
        let logged = true;
        dispatch(setLogStatus({ logged, userIndex }));
        dispatch(setCart(userCheck[userIndex].userCart));
      } else {
        message.error("wrong password");
      }
    } else {
      message.error("wrong credentials");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, [dispatch]);
  return (
    <div className="login">
      {!userLoginStatus.logged ? (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <h1>
            Click to{" "}
            <Link to="/signup" className="ms-2">
              Signup
            </Link>
          </h1>
        </Form>
      ) : (
        <User name={userCheck[userLoginStatus.userIndex].user.name} />
      )}
    </div>
  );
};
export default Login;
