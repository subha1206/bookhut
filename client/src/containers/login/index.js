import React from 'react';

import './login.styles.scss';

const Login = () => {
  return (
    <div className="login__container">
      <div className="login__container__info"></div>
      <div className="login__container__CTA">
        <div className="login__container__CTA--form">
          <form>
            <input type="text" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password"/>
            <input type="submit" value="Login" />
            <p>New user? register</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
