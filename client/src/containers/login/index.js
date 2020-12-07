import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import Loader from '../../components/common/loader';
import { Link } from 'react-router-dom';

import './login.styles.scss';

const Login = ({ location, history }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { loading, token } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const handleChange = (e) => {
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [e.target.name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (token) {
      history.push(redirect);
    }
  }, [history, redirect, token]);

  return (
    <div className="login__container">
      <div className="login__container__info"></div>
      <div className="login__container__CTA">
        {loading ? (
          <Loader />
        ) : (
          <div className="login__container__CTA--form">
            <form>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <input type="submit" value="Login" onClick={handleLogin} />
              <Link className="register" to="/register">
                New user? register
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
