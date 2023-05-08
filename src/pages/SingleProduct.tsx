import { Link, useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Button, Card, Skeleton, Image } from "antd";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  fetchLimitedProducts,
  fetchSingleProduct,
} from "../store/productSlice";
import { useEffect } from "react";
import { addUserCart } from "../store/userSlice";
import { addCart } from "../store/cartSlice";

function SingleProduct() {
  const userLoginStatus = useAppSelector((state) => state.currentUserSlice);

  let { id } = useParams();

  const dispatch = useAppDispatch();

  const singleProduct = useAppSelector(
    (state) => state.myProducts.singleProductSlice
  );

  const products = useAppSelector(
    (state) => state.myProducts.limitedProductSlice
  );

  let quantity = 1; //initial quantity

  const { Meta } = Card;

  const addToCart = () => {
    let item = singleProduct.item;
    if (singleProduct.singleProductLoading) {
      dispatch(addCart({ item, quantity }));
    }
    if (userLoginStatus.logged) {
      let userCart = {
        item,
        quantity,
      };
      let index = userLoginStatus.userIndex;
      dispatch(addUserCart({ userCart, index }));
    }
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(`${id}`));
    dispatch(fetchLimitedProducts("5"));
  }, [dispatch, id]);

  return (
    <div className="container">
      {singleProduct.singleProductLoading ? (
        <div className="singleProduct">
          <div className="leftcontet">
            <Image
              src={singleProduct.item.image}
              alt="img"
              className="priviewImg"
            />
          </div>

          <div className="rightContent">
            <h1>{singleProduct.item.title}</h1>
            <h2>{singleProduct.item.category}</h2>
            <span>${singleProduct.item.price}</span>

            <p>{singleProduct.item.description}</p>
            <div className="rating">
              {`(Reviewed by :${singleProduct.item.rating.count}peopls) `}
              <br />
              <br />
              {[...Array(Math.ceil(singleProduct.item.rating.rate))].map(
                (ele, index) => {
                  return <StarFilled key={index} />;
                }
              )}
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
        {products.loading ? (
          products.items
            .filter((ele) => ele.id !== singleProduct.item.id)
            .map((ele) => {
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
