import { Col, Row } from "antd";
import Style from "../style/User.module.scss";
import logo from "../images/logo.png";
import { cartDetails } from "../store/productSlice";

interface propState {
  ele: cartDetails;
}
const Order: React.FC<propState> = ({ ele }) => {
  return (
    <div>
      {}
      <Row className={`${Style.row}`}>
        <Col>
          <img
            src={ele.item.image}
            alt=""
            style={{ width: "40px", objectFit: "contain" }}
          />
        </Col>
        <Col>{ele.item.title}</Col>
        <Col>{ele.quantity}</Col>
        <Col>${ele.item.price * ele.quantity}</Col>
      </Row>
    </div>
  );
};

export default Order;
