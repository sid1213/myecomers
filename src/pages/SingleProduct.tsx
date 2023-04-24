import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card, Skeleton, Image } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchSingleProduct } from "../store/productSlice";
import { useEffect } from "react";

function SingleProduct() {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const { myerror, item, myloading } = useAppSelector(
    (state) => state.myProducts.singleProductSlice
  );

  console.log(myloading);

  const { Meta } = Card;

  useEffect(() => {
    dispatch(fetchSingleProduct(`${id}`));
  }, [dispatch]);

  return (
    <div className="container">
      {myloading ? (
        <div className="singleProduct" key={item.id}>
          <div className="leftcontet">
            <Image src={item.image} alt="img" />
          </div>

          <div className="rightContent">
            <h1>{item.title}</h1>
            <h2>{item.category}</h2>
            <span>${item.price}</span>

            <p>{item.description}</p>
            <div className="rating">
              {[...Array(Math.ceil(item.rating.rate))].map((ele, index) => {
                return <StarFilled key={index} />;
              })}
            </div>
            <Button type="primary">Add to cart</Button>
          </div>
        </div>
      ) : (
        <div>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[<h1>$--</h1>, "none"]}
          >
            <Skeleton loading={true} avatar active>
              <Meta title={<Skeleton />} description={<Skeleton />} />
            </Skeleton>
          </Card>
        </div>
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
