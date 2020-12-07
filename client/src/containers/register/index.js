import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import Loader from '../../components/common/loader';

import './register.styles.scss';

const Register = ({ history }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading } = userLogin;

  const handleChange = (e) => {
    const value = e.target.value;
    setRegisterData({
      ...registerData,
      [e.target.name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(registerData, history));
  };

  return (
    <div className="register__container">
      <div className="register__container__info"></div>
      <div className="register__container__CTA">
        {loading ? (
          <Loader />
        ) : (
          <div className="register__container__CTA--form">
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <input
                type="password"
                name="passwordConfirm"
                id="Cnfpassword"
                placeholder="Confirm password"
                onChange={handleChange}
              />

              <input type="submit" value="Register" />
              <p>Already have an account ? login</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
