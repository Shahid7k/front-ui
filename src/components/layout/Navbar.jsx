import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authContext } from '../../context/AuthContext';
import {
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  DASHBOARD,
  POST_BLOG,
  HOME_ROUTE,
  SINGLEPROFILE,
  PROFILES,
} from '../../constants/routesNomenclature';
import { logout } from '../../requests/auth';

const Navbar = ({ title, icon }) => {
  const { userAuth, setUnAuthStatus } = useContext(authContext);

  const handleLogout = () => {
    logout();
    setUnAuthStatus();
  };

  return (
    <div className='navbar navbar-expand-lg navBar'>
      <h1>
        <NavLink to='/' className='text-decoration-none '>
          <i className={icon} /> {title}
        </NavLink>
      </h1>

      {userAuth.token
        ? getAuthLinks(userAuth.user, handleLogout)
        : getNoAuthLinks()}
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

const getAuthLinks = (user, handleLogout) => (
  <Fragment>
    <ul className='my-auto ml-auto'>
      <li>
        <NavLink to={HOME_ROUTE} className='text-decoration-none'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={DASHBOARD} className='text-decoration-none'>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to={PROFILES} className='text-decoration-none'>
          Profiles
        </NavLink>
      </li>
    </ul>
    <div className='dropdown'>
      <button
        style={{ minWidth: '120px' }}
        className='btn btn-dark nobg dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        {user.firstName || ''}
      </button>
      <div
        className='dropdown-menu font12'
        aria-labelledby='dropdownMenuButton'
      >
        <NavLink
          to={POST_BLOG}
          className='nobg text-dark dropdown-item text-decoration-nonee'
        >
          New Blog
        </NavLink>
        <NavLink
          to={DASHBOARD}
          className='nobg text-dark dropdown-item text-decoration-none'
        >
          Dashboard
        </NavLink>
        <NavLink
          to={`/profile/${user._id}`}
          className='nobg text-dark dropdown-item text-decoration-none'
        >
          My Profile
        </NavLink>

        <NavLink
          to='#'
          className='nobg text-dark dropdown-item text-decoration-none'
          onClick={handleLogout}
        >
          Log out
        </NavLink>
      </div>
    </div>
  </Fragment>
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
