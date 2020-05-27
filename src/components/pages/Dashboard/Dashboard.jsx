import React, { useState, useEffect, useContext, Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { POST_BLOG } from '../../../constants/routesNomenclature';
import { authContext } from '../../../context/AuthContext';
import BlogCard from '../../layout/BlogCard';
import { getBlogsByUserId } from '../../../requests/blog';
import { BarLoader } from 'react-spinners';
import { condition } from '../../../utils/theme';

const Dashboard = () => {
  const { userAuth } = useContext(authContext);

  const [blogs, setBlogs] = useState([]);

  const [showLoader, setShowLoader] = useState(true);

  const history = useHistory();

  useEffect(() => {
    (async function () {
      const res = await getBlogsByUserId(userAuth.user._id);
      if (res.data) {
        setBlogs(res.data);
      }
      setShowLoader(false);
    })();
  }, []);

  // const onSubmit = (e, markup) => {
  //   console.log(e);
  //   console.log(markup);
  //   setContent(markup);
  // };

  return (
    <Fragment>
      <BarLoader loading={showLoader} color={`${condition?"#fff":"#b02"}`} width={'100%'} />
      {!showLoader && (
        <div>
          My Dashboard Page
          <div>
            <button type='submit' className='btn btn-dark btn-lg d-block'>
              <NavLink
                to={POST_BLOG}
                className='text-white text-decoration-none'
              >
                New Blog
              </NavLink>
            </button>
          </div>
          <div className='row container'>
            {blogs.map((blog, index) => (
              <div
                key={`blog-${index}`}
                onClick={() => history.push(`/blogs/${blog._id}`)}
                className='col-md-4 col-md-offset-3'
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
