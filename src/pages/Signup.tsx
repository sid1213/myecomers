import { Button, Form, Input, message } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { addUser } from "../store/productSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const userCheck = useAppSelector((state) => state.userSlice.userSlice);

  const onFinish = (values: any) => {
    if (!userCheck.find((ele) => ele.user.userName === values.username)) {
      message.success("user added");

      dispatch(
        addUser({
          user: {
            name: values.name.trim(),
            userName: values.username.trim(),
            password: values.password,
          },
          userCart: [],
          userOrder: [],
        })
      );
      form.resetFields();
    } else {
      message.error("username already exist please try anything else");
    }

    console.log(userCheck.find((ele) => ele.user.userName === values.username));
    console.log(userCheck);
  };

  const onFinishFailed = () => {
    message.error("please fill all details");
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className="login">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
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
          <Link to="/login" className="ms-2">
            Login
          </Link>
        </h1>
      </Form>
    </div>
  );
};

export default Signup;
