import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getOrderDetails,
  updatePayment,
} from '../../redux/actions/orderActions';
import { clearCart } from '../../redux/actions/cartActions.js';
import Loader from '../../components/common/loader';
import convertDate from '../../utils/convertDate';

import './order.styles.scss';
const Order = ({ match, history }) => {
  const orderDetails = useSelector((state) => state.order);
  const { orderItems, shippingAddress, order, loading } = orderDetails;
  const dispatch = useDispatch();

  function loadScripct() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    await loadScripct();

    const {
      data: { id, amount, currency },
    } = await axios.post(`/api/v1/orders/${match.params.id}/pay`, {
      amount: order?.totalPrice + order?.shippingPrice,
    });

    const options = {
      key: process.env.RAZORPAY_ID,
      amount: amount,
      currency: currency,
      name: 'BookHut',
      description: 'Test Transaction!',
      image: '',
      order_id: id,
      handler: function (response) {
        const paymentOpt = {
          paymentResult: response,
          isPaid: true,
          paidAt: Date.now(),
        };
        dispatch(updatePayment(match.params.id, paymentOpt));
        dispatch(clearCart());
      },
      prefill: {
        name: order?.user.name,
        email: order?.user.email,
      },
      theme: {
        color: '#5ef36d',
      },
    };
    const payObj = new window.Razorpay(options);
    payObj.open();
  }

  const redirectToProfile = () => {
    history.push('/profile');
  };
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <div className="order__container">
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '10em' }}>
          <Loader />
        </div>
      ) : (
        <>
          {' '}
          <div className="order__container__congrats">
            <h2>Congratulation!</h2>
            {!order?.isPaid ? (
              <p>
                Hi, {order?.user?.name} we have received your order please pay
                bellow so we can start processing your order.{' '}
              </p>
            ) : (
              <p>
                Hi, {order?.user?.name} your payment has been successfull, we
                will notify you when your order is on shipping
              </p>
            )}
          </div>
          <div className="order__container__list">
            {orderItems.map((item) => {
              return (
                <div
                  className="order__container__list__item"
                  key={item.product}
                >
                  <div className="order__container__list__item__details">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                  <div className="order__container__list__item__qty">
                    <p>{item.qty}</p>
                    <p>₹ {item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order__container__price">
            <div className="order__container__price--shipping">
              <strong>Payment & Shipping details</strong>
              <p>
                Payment Status :{' '}
                {order?.isPaid ? (
                  <span className="green">{`Paid,${convertDate(
                    order?.paidAt
                  )}`}</span>
                ) : (
                  <span className="red">Not Paid</span>
                )}
              </p>

              <p>Delivered to : {order?.user.name}</p>
              <p>
                Delivery Address :{' '}
                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.zipCode}, ${shippingAddress.state}`}
              </p>
              <p>
                Delivered :{' '}
                {order?.isDelivered ? (
                  <span className="green">Delivered</span>
                ) : (
                  <span className="red">Not Delivered</span>
                )}
              </p>
            </div>
            <div className="order__container__price--pay">
              <p>Subtotal : {order?.totalPrice}</p>
              <p>Shipping : {order?.shippingPrice}</p>
              <strong>
                TOTAL : {order?.totalPrice + order?.shippingPrice}
              </strong>
            </div>
          </div>
          <div className="order__container__CTA">
            {order?.isPaid ? (
              <button onClick={redirectToProfile}>Go To Profile</button>
            ) : (
              <button onClick={handlePayment}>PAY</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
