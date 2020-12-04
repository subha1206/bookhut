import React from 'react';

import './register.styles.scss';

const Register = () => {
  return (
    <div className="register__container">
      <div className="register__container__info"></div>
      <div className="register__container__CTA">
        <div className="register__container__CTA--form">
          <form>
            <input type="text" name="email" id="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              type="password"
              name="Confirmpassword"
              id="Cnfpassword"
              placeholder="Confirm password"
            />

            <input type="submit" value="Register" />
            <p>Already have an account ? login</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
