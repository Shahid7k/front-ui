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
    
    <div className="dropdown" >
      <button className="btn btn-dark nobg dropdown-toggle font14"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {"Log In"}
      </button>
      <div className="dropdown-menu font12" aria-labelledby="dropdownMenuButton">
        {/* <a className="dropdown-item text-dark"  href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <a className="dropdown-item"  href="#">Something else here</a> */}
      
      <NavLink to={SIGNIN_ROUTE} className='text-dark dropdown-item text-decoration-none'>
        Sign In
      </NavLink>
    
      <NavLink to={SIGNUP_ROUTE} className='text-dark dropdown-item text-decoration-none'>
        Sign Up
      </NavLink>

      </div>
    </div>
    
);

const getAuthLinks = handleLogout => (
  // <ul className='my-auto'>
  //   <li>
  //     <NavLink to='/' className='text-decoration-none'>
  //       Home
  //     </NavLink>
  //   </li>
  //   <li>
  //     <NavLink to={DASHBOARD} className='text-decoration-none'>
  //       Dashboard
  //     </NavLink>
  //   </li>
  //   <li>
  //     <NavLink to={PROFILE} className='text-decoration-none'>
  //       Profile
  //     </NavLink>
  //   </li>

  //   <li>
  //     <NavLink to='#' className='text-decoration-none' onClick={handleLogout}>
  //       Log out
  //     </NavLink>
  //   </li>
  // </ul>
  <div className="dropdown" >
    <button className="btn btn-dark nobg dropdown-toggle font14"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {"Hi User"}
    </button>
    <div className="dropdown-menu font12" aria-labelledby="dropdownMenuButton">
    <NavLink to='/' className='nobg text-dark dropdown-item text-decoration-none'>
       Home
      </NavLink>
      <NavLink  to={DASHBOARD}   className=' nobg text-dark dropdown-item text-decoration-none'>
        Dashboard
      </NavLink>
      <NavLink  to={PROFILE}  className='nobg text-dark dropdown-item text-decoration-none'>
        Profile
      </NavLink>

      <NavLink  to='#' className='nobg text-dark dropdown-item text-decoration-none'>
        Log out
      </NavLink>

    </div>
  </div>
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
