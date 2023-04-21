import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Avatar } from "antd";
import MiniCart from "../components/MiniCart";
function Header() {
  return (
    <header>
      <nav className="navBar container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/login">
              <Avatar icon={<UserOutlined />}></Avatar>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <Badge count={2} showZero size="small">
                <Avatar icon={<ShoppingCartOutlined />}></Avatar>
              </Badge>
            </Link>
            <span className="miniCartContainer">
              <MiniCart />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
