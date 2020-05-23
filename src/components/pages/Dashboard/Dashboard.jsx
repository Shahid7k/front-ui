import React from 'react';
import { NavLink } from 'react-router-dom';
import BlogComponent from '../BlogComponent/BlogComponent';
import { POST_BLOG } from '../../../constants/routesNomenclature';

const Dashboard = () => {
  // const onSubmit = (e, markup) => {
  //   console.log(e);
  //   console.log(markup);
  //   setContent(markup);
  // };

  return (
    <div>
      My Dashboard Page
      <button type='submit' className='btn btn-dark btn-lg d-block'>
        <NavLink to={POST_BLOG} className='text-white text-decoration-none'>
          New Blog
        </NavLink>
      </button>
      {/* <BlogComponent /> */}
    </div>
  );
};

export default Dashboard;
