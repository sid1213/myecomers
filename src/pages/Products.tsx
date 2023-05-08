import { Card, Col, Row, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllProducts } from "../store/productSlice";
import Style from "../components/User/style.module.scss";

const { Meta } = Card;

function Products() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.myProducts.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="container mb-2">
      <Row className={`mt-2 ${Style.row}`}>
        {products.loading ? (
          products.items.map((ele) => {
            return (
              <Col xs={11} sm={7} md={6} lg={5} className="mb-2" key={ele.id}>
                <Link to={`/products/${ele.id}`}>
                  <Card
                    className="productCard"
                    style={{ width: "100%" }}
                    cover={
                      <img
                        alt={ele.title}
                        src={ele.image}
                        style={{ width: "100%" }}
                      />
                    }
                    actions={[<h1>${ele.price}</h1>]}
                  >
                    <Meta title={ele.title} description={ele.category} />
                  </Card>
                </Link>
              </Col>
            );
          })
        ) : (
          <Row className="loading">
            {Array(5)
              .fill(null)
              .map((_, index) => {
                return (
                  <Col
                    key={index}
                    xs={11}
                    sm={7}
                    md={6}
                    lg={5}
                    className="mb-2"
                  >
                    <Card
                      cover={
                        <Skeleton.Image
                          active={false}
                          className="cardSkeleton"
                        />
                      }
                      style={{ width: "100%" }}
                    >
                      <Skeleton loading={true} active={false} />
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
      </Row>
    </div>
  );
}

export default Products;
