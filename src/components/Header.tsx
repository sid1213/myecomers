import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import logo from "../images/logo.png";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge, Avatar, Col, Row, Drawer, Button, Dropdown } from "antd";
import MiniCart from "../components/MiniCart";
import { useState } from "react";
import { useAppSelector } from "../hooks";

function Header() {
  const [open, setOpen] = useState(false); //to open Drawer

  const cartLength = useAppSelector((state) => state.cartSlice.AddedProducts);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span className="miniCartContainer">
          <MiniCart />
        </span>
      ),
    },
  ];
  return (
    <header>
      <nav className="navBar container">
        <Row justify={"space-between"} className="navbarRow" align={"middle"}>
          <Col className="gutter-row" span={6} xs={4}>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
          </Col>
          <Col className="gutter-row" span={14} xs={0} sm={14}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </Col>
          <Col className="gutter-row" span={6} xs={0} sm={6}>
            <ul className="text-end ">
              <li>
                <Link to="/login">
                  <Avatar icon={<UserOutlined />}></Avatar>
                </Link>
              </li>

              <li>
                <Dropdown menu={{ items }}>
                  <Badge count={cartLength.length} showZero size="small">
                    <Link to="/cart" onClick={(e) => e.stopPropagation()}>
                      <Avatar icon={<ShoppingCartOutlined />}></Avatar>
                    </Link>
                  </Badge>
                </Dropdown>
              </li>
            </ul>
          </Col>
          <Col className="gutter-row" span={2} xs={2} sm={0}>
            <Button className="toggleBtn" onClick={showDrawer}>
              <Avatar shape="square" icon={<MenuOutlined />}></Avatar>
            </Button>
            <Drawer
              title="Basic Drawer"
              style={{ zIndex: "11" }}
              placement="right"
              onClose={onClose}
              open={open}
              className="navDrawer"
            >
              <ul>
                <li>
                  <Link to="/" onClick={onClose}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/products" onClick={onClose}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={onClose}>
                    <Avatar icon={<UserOutlined />}></Avatar>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" onClick={onClose}>
                    <Badge count={cartLength.length} showZero size="small">
                      <Avatar icon={<ShoppingCartOutlined />}></Avatar>
                    </Badge>
                  </Link>
                </li>
              </ul>
            </Drawer>
          </Col>
        </Row>
      </nav>
    </header>
  );
}

export default Header;
