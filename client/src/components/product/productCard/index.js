import React from 'react';

import { Link } from 'react-router-dom';

import './productCard.styles.scss';
const ProductCard = ({ product }) => {
  const urlId = product._id;
  const url = `/products/${urlId}`;
  return (
    <Link to={url} style={{ textDecoration: 'none', color: 'black' }}>
      <div className="product-card__container">
        <img
          className="product-card__container__image"
          src={product.image}
          alt=""
        />
        <div className="product-card__container__info">
          <p className="product-card__container__info--title">{product.name}</p>
          <p className="product-card__container__info--price">
            ₹ {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
