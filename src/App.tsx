import "./style/App.scss";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import Footer from "./components/Footer";
import { Layout } from "antd";
import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id?" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
