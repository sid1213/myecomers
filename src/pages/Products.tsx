import { Card, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllProducts } from "../store/productSlice";
const { Meta } = Card;

function Products() {
  const dispatch = useAppDispatch();

  const { error, items, loading } = useAppSelector(
    (state) => state.myProducts.product
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
    console.log(items);
  }, [dispatch]);
  return (
    <div className="container">
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
      </div>
    </div>
  );
}

export default Products;
