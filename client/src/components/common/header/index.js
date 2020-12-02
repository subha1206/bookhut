import React, { useState } from 'react';

import SearchBox from '../searchBox';
import DropDown from './DropDown';
import logo from '../../../assets/image/bookhut.png';
import './header.styles.scss';

const Header = () => {
  const [userToggle, setUserToggle] = useState(false);
  return (
    <nav className="header__container">
      <div className="header__container__logo">
        <img src={logo} alt="BookHub" />
      </div>
      <div className="header__container__search">
        <SearchBox />
      </div>
      <div className="header__container__info">
        <ul className="header__container__info__item">
          <li>Cart</li>
          <li>Profile</li>
          <DropDown />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
