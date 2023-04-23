import { Carousel, Card, Button, Skeleton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import img1 from "../images/MK.avif";
import img2 from "../images/banner-1.avif";
import { Link } from "react-router-dom";
import { fetchLimitedProducts } from "../store/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

const { Meta } = Card;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, items, loading } = useAppSelector((state) => state.myProducts);
  useEffect(() => {
    dispatch(fetchLimitedProducts());
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
        <div className=" product-main">
          {loading ? (
            items.map((ele, index) => {
              return (
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
              );
            })
          ) : (
            <div className="loading">
              {[...Array(5)].map(() => {
                return (
                  <Card
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
        </div>
        <h1 className="mt-2 heading">Men's product</h1>
        <div className=" product-main">
          {loading ? (
            items.map((ele, index) => {
              return (
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
              );
            })
          ) : (
            <div className="loading">
              {[...Array(5)].map(() => {
                return (
                  <Card
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
        </div>
        <Button>
          <Link to="/products"> View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
