import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  LANDING_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  DASHBOARD,
  ALLPROFILES,
  ALLQA_ROUTE,
  PROFILE,
  HOME_ROUTE,
  POST_BLOG,
} from '../../constants/routesNomenclature';
import { authContext } from '../../context/AuthContext';
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
        <NavLink to={LANDING_ROUTE} className='text-decoration-none'>
          <i className={icon} /> {title}
        </NavLink>
      </h1>

      {userAuth.token ? getAuthLinks(handleLogout) : getNoAuthLinks()}
    </div>
  );
};

// const getNavItems = () => {
//   return (
//     <>
//       <NavLink to={DASHBOARD} className='listItem text-decoration-none'>
//         {'Dashboard'}
//       </NavLink>
//       <NavLink to='#' className='listItem text-decoration-none'>
//         {'Explore'}
//       </NavLink>
//       <NavLink to='#' className='listItem text-decoration-none'>
//         {'title'}
//       </NavLink>
//     </>
//   );
// };

const getNoAuthLinks = () => (
  <div className='dropdown'>
    <button
      className='btn btn-dark nobg dropdown-toggle font14'
      type='button'
      id='dropdownMenuButton'
      data-toggle='dropdown'
      aria-haspopup='true'
      aria-expanded='false'
    >
      {'Log In'}
    </button>
    <div className='dropdown-menu font12' aria-labelledby='dropdownMenuButton'>
      <NavLink
        to={SIGNIN_ROUTE}
        className='text-dark dropdown-item text-decoration-none'
      >
        Sign In
      </NavLink>
      <NavLink
        to={SIGNUP_ROUTE}
        className='text-dark dropdown-item text-decoration-none'
      >
        Sign Up
      </NavLink>
    </div>
  </div>
);

const getAuthLinks = handleLogout => (
  <ul className='my-auto'>
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
      <NavLink to={ALLPROFILES} className='text-decoration-none'>
        Profile
      </NavLink>
    </li>

    <li>
      <NavLink to='#' className='text-decoration-none' onClick={handleLogout}>
        Log out
      </NavLink>
    </li>
  </ul>

  // <div className='dropdown'>
  //   <button
  //     className='btn btn-dark nobg dropdown-toggle font14'
  //     type='button'
  //     id='dropdownMenuButton'
  //     data-toggle='dropdown'
  //     aria-haspopup='true'
  //     aria-expanded='false'
  //   >
  //     {'Log In'}
  //   </button>
  //   <div className='dropdown-menu font12' aria-labelledby='dropdownMenuButton'>
  //     <NavLink
  //       to={SIGNIN_ROUTE}
  //       className='text-dark dropdown-item text-decoration-none'
  //     >
  //       Sign In
  //     </NavLink>
  //     <NavLink
  //       to={SIGNUP_ROUTE}
  //       className='text-dark dropdown-item text-decoration-none'
  //     >
  //       Sign Up
  //     </NavLink>
  //   </div>
  // </div>

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
  // <ul className='my-auto'>
  //   <li>
  //     <NavLink to={HOME_ROUTE} className='text-decoration-none'>
  //       Home
  //     </NavLink>
  //   </li>
  //   <li>
  //     <NavLink to={DASHBOARD} className='text-decoration-none'>
  //       Dashboard
  //     </NavLink>
  //     <NavLink
  //       to={ALLPROFILES}
  //       className='nobg text-dark dropdown-item text-decoration-none'
  //     >
  //       Profile
  //     </NavLink>
  //   </li>

  //   <li>
  //     <NavLink to='#' className='text-decoration-none' onClick={handleLogout}>
  //       Log out
  //     </NavLink>
  //   </li>
  // </ul>

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
    </ul>
    <div className='dropdown'>
      <button
        className='btn btn-dark nobg dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        {'Welcome User'}
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
          to={PROFILE}
          className='nobg text-dark dropdown-item text-decoration-none'
        >
          Profile
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
