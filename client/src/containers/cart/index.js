import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import cross from '../../assets/image/32x32.png';
import './cart.styles.scss';

const Cart = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleProceedToCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [productID, qty, dispatch]);

  return (
    <div className="cart__container">
      <div className="cart__container__items">
        <div className="cart__container__items--heading">
          <ul>
            <li className="big--span">Product</li>
            <li className="price--span">Price</li>
            <li className="Qty--span">Qty</li>
            <li className="total--span">Total</li>
          </ul>
        </div>

        {cartItems?.map((item) => {
          return (
            <div className="cart__container__items--single" key={item.product}>
              <div className="cart__container__items--single--product">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <div className="cart__container__items--single--price">
                <p>₹ {item.price.toFixed(2)}</p>
              </div>
              <div className="cart__container__items--single--qty">
                <select
                  name="quantity"
                  id=""
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((qty) => (
                    <option key={qty + 1} value={qty + 1}>
                      {qty + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cart__container__items--single--total">
                <p>₹ {(item.price * item.qty).toFixed(2)}</p>
              </div>
              <div className="cart__container__items--single--remove">
                <img
                  onClick={() => handleRemoveFromCart(item.product)}
                  src={cross}
                  alt="remove item"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__container__CTA">
        <div className="cart__container__CTA__card">
          <h3>
            SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            ITEMS
          </h3>
          <p>
            ₹{' '}
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </p>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
