import React, { useEffect, useState } from 'react';
import QuantityBox from '../../components/common/quantityBox';
import Review from '../../components/product/review';
import Loader from '../../components/common/loader';
import { getOneProduct } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import './productDetails.styles.scss';
const ProductDetails = ({ history, match }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productDetails);
  const { product, loading } = productState;

  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${count}`);
  };

  useEffect(() => {
    dispatch(getOneProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <div className="product-details__container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-details__container__product__info">
            <div className="product-details__container__product__info--image">
              <img src={product?.image} alt="" />
            </div>
            <div className="product-details__container__product__info--details">
              <div className="product-details__container__product__info--details__cred">
                <h2>{product?.name}</h2>
                <p>₹ {product?.price}</p>
                <p className="is-in-stock">In Stock</p>
              </div>
              <div className="product-details__container__product__info--details__desc">
                <p className="product-details__container__product__info--details__desc--title">
                  Description
                </p>
                <p className="desc-text">{product?.description}</p>
              </div>
              <div className="product-details__container__product__info--details__CTA">
                <QuantityBox
                  qty={product?.countInStock}
                  setCount={setCount}
                  count={count}
                />
                <button className="CTA" onClick={handleAddToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="product-details__container__product__reviews">
            <p>Reviews</p>
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
