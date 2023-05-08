import { Carousel, Card, Button, Skeleton, Row, Image } from "antd";
import img1 from "../images/MK.avif";
import img2 from "../images/banner-1.avif";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../store/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Style from "../components/User/style.module.scss";
import ProductList from "../components/CardColumn";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.myProducts.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <Carousel className="carousel" autoplay={true} draggable>
        <div className="carousel-img">
          <Image preview={false} src={img1} alt="" />
        </div>
        <div className="carousel-img">
          <Image preview={false} src={img2} alt="" />
        </div>
        <div className="carousel-img">
          <Image preview={false} src={img1} alt="" />
        </div>
      </Carousel>

      <div className="container mb-2">
        <h1 className="mt-2 heading">Trending products</h1>
        <Row className={`mt-2 ${Style.row}`}>
          {products.loading ? (
            products.items.map((ele) => {
              return (
                <ProductList
                  id={ele.id}
                  title={ele.title}
                  price={ele.price}
                  image={ele.image}
                  category={ele.category}
                />
              );
            })
          ) : (
            <div className="loading">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return (
                    <Card
                      key={index}
                      cover={
                        <Skeleton.Image
                          active={false}
                          className="cardSkeleton"
                        />
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
          {products.loading ? (
            products.items
              .filter((ele) => ele.category === "men's clothing")
              .map((ele) => {
                return (
                  <ProductList
                    id={ele.id}
                    title={ele.title}
                    price={ele.price}
                    image={ele.image}
                    category={ele.category}
                  />
                );
              })
          ) : (
            <div className="loading">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return (
                    <Card
                      key={index}
                      cover={
                        <Skeleton.Image
                          active={false}
                          className="cardSkeleton"
                        />
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
