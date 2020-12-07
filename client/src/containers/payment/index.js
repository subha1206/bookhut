import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';

import './payment.styles.scss';

const Payment = ({ history }) => {
  const [payMethod, setPayMethod] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payMethod, history));
  };

  function onChangeValue(event) {
    const method = event.target.value;
    setPayMethod(method);
  }
  return (
    <div className="payment__container">
      <h3>Payment Method</h3>
      <div className="payment__container__form">
        <div className="radio-group" onChange={onChangeValue}>
          <div className="radio">
            <input type="radio" value="Credit or Debit Card" name="gender" />{' '}
            Credit or Debit card
          </div>
          <div className="radio">
            <input type="radio" value="Female" name="gender" /> Female
          </div>
          <div className="radio">
            <input type="radio" value="Other" name="gender" /> Other
          </div>
        </div>
        <input
          onClick={handleSubmit}
          className="submit"
          type="submit"
          value="NEXT"
        />
      </div>
    </div>
  );
};

export default Payment;
