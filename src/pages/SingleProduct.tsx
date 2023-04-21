import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchLimitedProducts } from "../store/productSlice";
import { useEffect } from "react";

function SingleProduct() {
  let { id } = useParams();

  const dispatch = useAppDispatch();

  const { error, items, loading } = useAppSelector((state) => state.myProducts);

  console.log(loading);

  const { Meta } = Card;

  useEffect(() => {
    dispatch(fetchLimitedProducts());
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        items.map((ele) => {
          if (String(ele.id) === id) {
            return (
              <div className="singleProduct">
                <div className="leftcontet">
                  <img src={ele.image} alt="img" />
                </div>

                <div className="rightContent">
                  <h1>{ele.title}</h1>
                  <h2>{ele.category}</h2>
                  <span>${ele.price}</span>

                  <p>{ele.description}</p>
                  <div className="rating">
                    {[...Array(Math.ceil(ele.rating.rate))].map(
                      (ele, index) => {
                        return <StarFilled key={index} />;
                      }
                    )}
                  </div>
                  <Button type="primary">Add to cart</Button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div>loading</div>
      )}

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
