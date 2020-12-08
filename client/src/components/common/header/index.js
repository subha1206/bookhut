import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
// import SearchBox from '../searchBox';
import Dropdown from './DropDown';
import logo from '../../../assets/image/bookhut.png';
import './header.styles.scss';

const Header = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { user } = userLogin;
  const { cartItems } = cart;

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const handleLogout = () => {
    setDropdown(false);
    dispatch(logout(history));
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {/* <li className="nav-item">
            <SearchBox />
          </li> */}
          <li className="nav-item">
            <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
              Cart({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </Link>
          </li>
          {user ? (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={closeMobileMenu}
            >
              <div className="nav-links">{user.name}</div>
              {dropdown && <Dropdown handleLogout={handleLogout} />}
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                SignIn
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
