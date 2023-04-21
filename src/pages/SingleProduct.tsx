import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useAppSelector } from "../hooks";
import { productState } from "../store/productSlice";

function SingleProduct() {
  let { id } = useParams();

  const limitedProductData = useAppSelector((state) => state.myProducts.items);

  const product: productState[] = limitedProductData.filter((ele) => {
    return String(ele.id) === id;
  });

  console.log(product[0]);

  const { Meta } = Card;

  return (
    <div className="container">
      <div className="singleProduct">
        <div className="leftcontet">
          <img src={product[0].image} alt="img" />
        </div>
        <div className="rightContent">
          <h1>{product[0].title}</h1>
          <h2>{product[0].category}</h2>
          <span>${product[0].price}</span>

          <p>
            Your perfect pack for everyday use and walks in the forest. Stash
            your laptop (up to 15 inches) in the padded sleeve, your everyday
          </p>
          <div className="rating">
            {[...Array(Math.ceil(product[0].rating.rate))].map((ele, index) => {
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
