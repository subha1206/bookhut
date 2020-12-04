import React, { useEffect } from 'react';
import './home.styles.scss';
import ProductCard from '../../components/product/productCard';
import Loader from '../../components/common/loader';
import { getAllProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const { products, loading } = productState;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="home__container">
      <div className="home__container__product-listing">
        <h2>Products</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="home__container__product-listing--items">
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
