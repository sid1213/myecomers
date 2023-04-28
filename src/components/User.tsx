import { Button, Col, Menu, Row, Tag } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLogStatus } from "../store/loginDetails";
import Style from "../style/User.module.scss";
import type { MenuProps } from "antd";
import Order from "./Order";
import { clearCart } from "../store/productSlice";

interface prop {
  name: string;
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];

const rootSubmenuKeys = ["sub1"];

const User: React.FC<prop> = ({ name }) => {
  const dispatch = useAppDispatch();

  const userCheck = useAppSelector((state) => state.userSlice.userSlice);

  const userLoginStatus = useAppSelector((state) => state.currentUserSlice);

  const CurrentuserOrder = userCheck[userLoginStatus.userIndex].userOrder.map(
    (ele) => {
      console.log(ele);
      return getItem(<Order ele={ele} />, "1");
    }
  );
  const items: MenuItem[] = [
    getItem("My orders", "sub1", <InboxOutlined />, [...CurrentuserOrder]),
  ];

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const logout = () => {
    let logged = false;
    let userIndex = -1;
    dispatch(setLogStatus({ logged, userIndex }));
    dispatch(clearCart());
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className={`container ${Style.user}`}>
      <Row className={Style.row}>
        <Col>
          <h1 className="mt-2">
            Welcome <Tag color="magenta"> {name}</Tag>
          </h1>
        </Col>
        <Col>
          <Button className="mt-2" type="primary" onClick={logout}>
            Logout
          </Button>{" "}
        </Col>
      </Row>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: "100%" }}
        items={items}
        className={`${Style.menu}`}
      />
    </div>
  );
};

export default User;
