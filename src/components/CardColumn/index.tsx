import { Card, Col, Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ProductState } from "../../type";
import style from "./style.module.scss";
const { Meta } = Card;

type curretList = Omit<ProductState, "rating" | "description">;
const ProductList: React.FC<curretList> = ({
  id,
  title,
  price,
  image,
  category,
}) => {
  return (
    <Col xs={11} sm={7} md={6} lg={5} className="mb-2" key={id}>
      <Link to={`/products/${id}`}>
        <Card
          className={style.size}
          cover={
            <Image
              alt={title}
              src={image}
              preview={false}
              className={style.img}
            />
          }
          actions={[<h1>${price}</h1>]}
        >
          <Meta title={title} description={category} />
        </Card>
      </Link>
    </Col>
  );
};

export default ProductList;
