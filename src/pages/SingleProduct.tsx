import { Link, useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card, Skeleton, Image } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  addCart,
  fetchLimitedProducts,
  fetchSingleProduct,
} from "../store/productSlice";
import { useEffect } from "react";

function SingleProduct() {
  let { id } = useParams();

  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.cartSlice);

  console.log(cart);

  const { myerror, item, myloading } = useAppSelector(
    (state) => state.myProducts.singleProductSlice
  );

  const { error, items, loading } = useAppSelector(
    (state) => state.myProducts.product
  );

  const { Meta } = Card;
  const addToCart = () => {
    if (myloading) {
      dispatch(addCart(item));
    }
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(`${id}`));
    dispatch(fetchLimitedProducts("5"));
  }, [dispatch, id]);

  return (
    <div className="container">
      {myloading ? (
        <div className="singleProduct" key={item.id}>
          <div className="leftcontet">
            <Image src={item.image} alt="img" className="priviewImg" />
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
            <Button type="primary" onClick={addToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Card style={{ width: 400, height: 400 }}>
            <Skeleton.Image active={false} className="cardSkeleton" />
          </Card>
        </div>
      )}

      <div className=" product-main">
        {loading ? (
          items.map((ele, index) => {
            return (
              <Link to={`/products/${ele.id}`} key={index}>
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
            {[...Array(5)].map((ele, index) => {
              return (
                <Card
                  cover={
                    <Skeleton.Image active={false} className="cardSkeleton" />
                  }
                  style={{ width: 200 }}
                  key={index}
                >
                  <Skeleton loading={true} active={false} />
                </Card>
              );
            })}
          </div>
        )}
        <div className="mt-3 text-center w-full">
          <Link to="/products">
            <Button>View All Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
