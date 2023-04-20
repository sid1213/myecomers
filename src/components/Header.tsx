import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="navBar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
