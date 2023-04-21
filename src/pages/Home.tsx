import { Carousel, Card, Button } from "antd";
import img1 from "../images/MK.avif";
import img2 from "../images/banner-1.avif";

const { Meta } = Card;
const Home: React.FC = () => {
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
        <Button>View All Products</Button>
      </div>
    </div>
  );
};

export default Home;
