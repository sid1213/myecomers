import { Col, Row } from "antd";
import Style from "../style/User.module.scss";
import logo from "../images/logo.png";

function Order() {
  return (
    <div>
      <Row className={`${Style.row}`}>
        <Col>
          <img
            src={logo}
            alt=""
            style={{ width: "40px", objectFit: "contain" }}
          />
        </Col>
        <Col>hello</Col>
        <Col>hello</Col>
        <Col>bhai</Col>
      </Row>
    </div>
  );
}

export default Order;
