import { Carousel, Card, Button } from "antd";
import img1 from "../images/MK.avif";
import img2 from "../images/banner-1.avif";
import { Link } from "react-router-dom";
import { fetchLimitedProducts } from "../store/productSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

const { Meta } = Card;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const limitedProductData = useAppSelector((state) => state.myProducts.items);
  useEffect(() => {
    dispatch(fetchLimitedProducts());
  });
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
        <h1 className="mt-2">Best seller</h1>
        <div className=" product-main">
          {limitedProductData.map((ele, index) => {
            return (
              <Link to={`/products/${ele.id}`} key={ele.id}>
                <Card
                  hoverable
                  style={{ width: 300 }}
                  cover={<img alt="example" src={ele.image} />}
                >
                  <Meta title={ele.title} description={`$${ele.price}`} />
                </Card>
              </Link>
            );
          })}
        </div>
        <Button>
          <Link to="/products"> View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
