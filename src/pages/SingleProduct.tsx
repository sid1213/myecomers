import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useAppDispatch } from "../hooks";
import { fetchProducts } from "../store/productSlice";
function SingleProduct() {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  });
  const { Meta } = Card;
  return (
    <div className="container">
      <div className="singleProduct">
        <div className="leftcontet">
          <img
            src="https://fashion-nine.vercel.app/images/Rectangle%204%20(1).png"
            alt="img"
          />
        </div>
        <div className="rightContent">
          <h1>Women Printed Dress Red</h1>
          <h2>men's clothing</h2>
          <span>$109.95</span>

          <p>
            Your perfect pack for everyday use and walks in the forest. Stash
            your laptop (up to 15 inches) in the padded sleeve, your everyday
          </p>
          <div className="rating">
            {[...Array(5)].map((ele, index) => {
              return <StarFilled key={index} />;
            })}
          </div>
          <Button type="primary">Add to cart</Button>
        </div>
      </div>
      <div className=" product-main">
        <Card
          hoverable
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
        <Card
          hoverable
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description={`$${500}`} />
        </Card>
      </div>
    </div>
  );
}

export default SingleProduct;
