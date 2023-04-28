import { Carousel, Card, Button, Skeleton, Row, Col } from "antd";
import img1 from "../images/MK.avif";
import img2 from "../images/banner-1.avif";
import { Link } from "react-router-dom";
import { fetchLimitedProducts } from "../store/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Style from "../style/User.module.scss";
const { Meta } = Card;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { error, items, loading } = useAppSelector(
    (state) => state.myProducts.product
  );

  useEffect(() => {
    dispatch(fetchLimitedProducts("10"));
  }, [dispatch]);

  return (
    <div className="home">
      <Carousel className="carousel" autoplay={true} draggable>
        <div className="carousel-img">
          <img src={img1} alt="" />
        </div>
        <div className="carousel-img">
          <img src={img2} alt="" />
        </div>
        <div className="carousel-img">
          <img src={img1} alt="" />
        </div>
      </Carousel>

      <div className="container mb-2">
        <h1 className="mt-2 heading">Trending products</h1>
        <Row className={`mt-2 ${Style.row}`}>
          {loading ? (
            items.map((ele) => {
              return (
                <Col xs={11} sm={7} md={6} lg={5} className="mb-2">
                  <Link to={`/products/${ele.id}`} key={ele.id}>
                    <Card
                      className="productCard "
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
        <h1 className="mt-2 heading">Men's product</h1>
        <Row className={`mt-2 ${Style.row}`}>
          {loading ? (
            items
              .filter((ele) => ele.category === "men's clothing")
              .map((ele) => {
                return (
                  <Col xs={11} sm={7} md={6} lg={5} className="mb-2">
                    <Link to={`/products/${ele.id}`} key={ele.id}>
                      <Card
                        className="productCard"
                        style={{ width: 200 }}
                        cover={<img alt={ele.title} src={ele.image} />}
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
        <Link to="/products">
          <Button>View All Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
