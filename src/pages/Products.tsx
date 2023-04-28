import { Card, Col, Row, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllProducts } from "../store/productSlice";
import Style from "../style/User.module.scss";

const { Meta } = Card;

function Products() {
  const dispatch = useAppDispatch();

  const { error, items, loading } = useAppSelector(
    (state) => state.myProducts.product
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
    console.log(items);
  }, []);

  return (
    <div className="container">
      <Row className={`mt-2 ${Style.row}`}>
        {loading ? (
          items.map((ele) => {
            return (
              <Col xs={11} sm={7} md={6} lg={5} className="mb-2">
                <Link to={`/products/${ele.id}`} key={ele.id}>
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
          <div className="loading">
            {[...Array(5)].map((ele, index) => {
              return (
                <Card
                  key={index}
                  cover={
                    <Skeleton.Image active={false} className="cardSkeleton" />
                  }
                  style={{ width: 200 }}
                >
                  <Skeleton loading={true} active={false} />
                </Card>
              );
            })}
          </div>
        )}
      </Row>
    </div>
  );
}

export default Products;
