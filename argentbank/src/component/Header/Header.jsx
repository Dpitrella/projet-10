import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const user = useSelector(state => state.user);
  const location = useLocation();
  const isUserPage = location.pathname === '/user';
  const isLoggedIn = !!user.email;

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/images/logo/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className='log-out'>
        {isUserPage && isLoggedIn ? (
          <>
            <div className="main-nav-item" >
              <FontAwesomeIcon icon={faUserCircle} />
              {user.userName || `${user.firstName} ${user.lastName}`}
            </div>
            <Link className="main-nav-item" to="/">
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
