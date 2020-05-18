import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  DASHBOARD,
  PROFILE,
} from '../../constants/routesNomenclature';
import { authContext } from '../../context/authContext';
import { logout } from '../../requests/auth';

const Navbar = ({ title, icon }) => {
  const { userAuth, setUnAuthStatus } = useContext(authContext);

  const handleLogout = () => {
    logout();
    setUnAuthStatus();
  };

  return (
    <div className='navbar navbar-expand-lg bg-dark py-0'>
      <h1>
        <NavLink to='/' className='text-decoration-none'>
          <i className={icon} /> {title}
        </NavLink>
      </h1>
      {userAuth.token ? getAuthLinks(handleLogout) : getNoAuthLinks()}
    </div>
  );
};

const getNoAuthLinks = () => (
  <ul className='my-auto'>
    <li>
      <NavLink to={SIGNIN_ROUTE} className='text-decoration-none'>
        Sign In
      </NavLink>
    </li>
    <li>
      <NavLink to={SIGNUP_ROUTE} className='text-decoration-none'>
        Sign Up
      </NavLink>
    </li>
  </ul>
);

const getAuthLinks = handleLogout => (
  <ul className='my-auto'>
    <li>
      <NavLink to='/' className='text-decoration-none'>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to={DASHBOARD} className='text-decoration-none'>
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink to={PROFILE} className='text-decoration-none'>
        Profile
      </NavLink>
    </li>

    <li>
      <NavLink to='#' className='text-decoration-none' onClick={handleLogout}>
        Log out
      </NavLink>
    </li>
  </ul>
);

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'frontUI',
  icon: 'fas fa-blog',
};

export default Navbar;
