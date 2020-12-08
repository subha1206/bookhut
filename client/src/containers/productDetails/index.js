import React, { useEffect, useState } from 'react';
import QuantityBox from '../../components/common/quantityBox';
import Review from '../../components/product/review';
import Loader from '../../components/common/loader';
import { getOneProduct, addReview } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import './productDetails.styles.scss';
const ProductDetails = ({ history, match }) => {
  const [reviewData, setReviewData] = useState('');
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productDetails);
  const userLogin = useSelector((state) => state.user);

  const { product, loading } = productState;

  const [count, setCount] = useState(1);

  const handleChange = (e) => {
    const value = e.target.value;
    setReviewData({
      ...reviewData,
      [e.target.name]: value,
    });
  };

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${count}`);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    dispatch(addReview(match.params.id, reviewData));
    setReviewData('');
  };

  useEffect(() => {
    dispatch(getOneProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <div className="product-details__container">
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '10em' }}>
          <Loader />
        </div>
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
            {userLogin.token ? (
              <form>
                <textarea
                  name="review"
                  id="review"
                  cols="30"
                  rows="5"
                  onChange={handleChange}
                ></textarea>
                <button onClick={handleAddReview} type="submit">
                  Add Review
                </button>
              </form>
            ) : (
              <div className="login__error__review">
                <strong>
                  Looks like you'r not logged in, Please login to write a
                  review!
                </strong>
              </div>
            )}
            {product?.reviews
              .slice(0)
              .reverse()
              .map((review) => {
                return <Review key={review._id} review={review} />;
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
