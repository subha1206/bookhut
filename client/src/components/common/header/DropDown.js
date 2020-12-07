import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown({ handleLogout }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        <li>
          <Link
            className="dropdown-link"
            to="/profile"
            onClick={() => setClick(false)}
          >
            Profile
          </Link>
        </li>
        <li>
          <div className="dropdown-link" onClick={handleLogout}>
            LogOut
          </div>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;
