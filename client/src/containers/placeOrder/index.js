import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/actions/orderActions';
import { ReactComponent as User } from '../../assets/svgs/user.svg';
import { ReactComponent as Address } from '../../assets/svgs/placeholder.svg';
import { ReactComponent as Email } from '../../assets/svgs/mail.svg';
import { ReactComponent as Edit } from '../../assets/svgs/pen.svg';
// import { ReactComponent as PaymentMode } from '../../assets/svgs/payment-method.svg';
import { ReactComponent as Tax } from '../../assets/svgs/tax_pay.svg';
import { ReactComponent as Total } from '../../assets/svgs/best-price.svg';
import { ReactComponent as Shipping } from '../../assets/svgs/truck.svg';
import { ReactComponent as Item } from '../../assets/svgs/shopping-bag.svg';

import './placeOrder.styles.scss';

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const orderState = useSelector((state) => state.order);
  const userInfo = useSelector((state) => state.user);
  const { shippingAddress, cartItems, payMethod } = cart;
  const { user } = userInfo;
  const { order, success } = orderState;

  const dispatch = useDispatch();

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  cart.shippingPrice = Number(cart.itemsPrice > 500 ? 0 : 50);
  cart.taxPrice = Number((0.12 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    cart.taxPrice +
    cart.shippingPrice
  ).toFixed(2);

  const combinedAdress = `${shippingAddress.address},${shippingAddress.city},${shippingAddress.zipCode}`;

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        payMethod: payMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, order, success]);

  return (
    <div className="place__order__container">
      <div className="place__order__container__items">
        <h2>Items</h2>
        <div className="place__order__container__items__view">
          {cartItems.map((item) => {
            return (
              <div
                className="place__order__container__items__view__card"
                key={item.product}
              >
                <img src={item.image} alt={item.image} />
                <p>{item.name}</p>
                <div className="price">
                  <strong>{item.qty}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="place__order__container__details">
        <div className="place__order__container__details--shipping">
          <div className="tab--info">
            <p>Shipping Info</p>
            <div className="info--svg">
              <Edit />
            </div>
          </div>
          <ul>
            <li>
              <div className="icons">
                <User />
              </div>
              {user.name}
            </li>
            <li>
              <div className="icons">
                <Email />
              </div>
              {user.email}
            </li>
            <li>
              <div className="icons">
                <Address />
              </div>
              {combinedAdress}
            </li>
          </ul>
        </div>
        {/* <div className="place__order__container__details--payment">
          <div className="tab--info">
            <p>Payment</p>
            <div className="info--svg">
              <Edit />
            </div>
          </div>
          <ul>
            <li>
              <div className="icons">
                <PaymentMode />
              </div>
              {payMethod}
            </li>
          </ul>
        </div> */}
        <div className="place__order__container__details--price">
          <div className="tab--info">
            <p>Order Summary</p>
          </div>
          <ul>
            <li>
              <div className="icons">
                <Item />
              </div>
              Items : ₹ {cart.itemsPrice}
            </li>
            <li className="green">
              <div className="icons">
                <Shipping />
              </div>
              Shipping : ₹ {cart.shippingPrice}
            </li>
            <li className="green">
              <div className="icons">
                <Tax />
              </div>
              Tax : ₹ {cart.taxPrice}
            </li>
            <li className="green">
              <div className="icons">
                <Total />
              </div>
              Total : ₹ {cart.totalPrice}
            </li>
          </ul>
        </div>

        <div className="place__order__container__details--CTA">
          <button onClick={handlePlaceOrder}>ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
