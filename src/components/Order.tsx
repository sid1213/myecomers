import { Col, Row } from "antd";
import Style from "./User/style.module.scss";
import { CartDetails } from "../type/index";

interface propState {
  ele: CartDetails;
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
