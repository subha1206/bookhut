import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';

import './shipping.styles.scss';
const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingData, setShippingData] = useState({
    address: shippingAddress?.address,
    city: shippingAddress?.city,
    zipCode: shippingAddress?.zipCode,
    state: shippingAddress?.state,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setShippingData({
      ...shippingData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingData, history));
  };

  return (
    <div className="shipping__container">
      <h3>Shipping Address</h3>
      <div className="shipping__container__form">
        <form onSubmit={handleSubmit}>
          <p>Address</p>
          <input
            type="text"
            name="address"
            id="address"
            value={shippingData.address}
            onChange={handleChange}
          />
          <p>City</p>
          <input
            type="text"
            name="city"
            id="city"
            value={shippingData.city}
            onChange={handleChange}
          />
          <p>PIN Code</p>
          <input
            type="number"
            maxLength="6"
            name="zipCode"
            id="zipCode"
            value={shippingData.zipCode}
            onChange={handleChange}
          />
          <p>State</p>
          <input
            type="text"
            name="state"
            id="state"
            value={shippingData.state}
            onChange={handleChange}
          />
          <input className="submit" type="submit" value="NEXT" />
        </form>
      </div>
    </div>
  );
};

export default Shipping;
