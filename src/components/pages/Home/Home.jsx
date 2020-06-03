import React, { useState, Fragment } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import BlogCard from '../../layout/BlogCard';
import { getBlogs } from '../../../requests/blog';
import { getAllQa } from '../../../requests/ques';
import { BarLoader } from 'react-spinners';
import { condition } from '../../../utils/theme';
import { LOADING } from '../../layout/otherConstants';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [qa, setQa] = useState([]);

  const [showLoader, setShowLoader] = useState(true);

  const history = useHistory();

  React.useEffect(() => {
    (async function () {
      const res = await getBlogs();
      const result = await getAllQa();

      if (res.data && result.data) {
        setBlogs(res.data);
        const n = Math.min(5, result.data.ques.length);
        setQa(result.data.ques.slice(0, n));
      }
      setShowLoader(false);
    })();
  }, []);

  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />

      {!showLoader && (
        <div className='clearfix'>
          <div className='w-100'>
            <div className='write-blog-top position position-relative  '>
              <div className='d-inline-block' id='blog-text'>
                <hr />
                <span className='architects-daughter'>
                  {' '}
                  Blogging is...{' '}
                </span>{' '}
                <br />
                <div className='h2 permanent-marker mx-4 p-0'>
                  Thinking <div className='text-center p-0 m-0'> out </div>
                  <div className='text-right mx-4 p-0'> loud</div>
                </div>
                <div className='architects-daughter text-center'>
                  {' '}
                  where the other folks <br /> think back!{' '}
                </div>
                <hr />
              </div>

              <div className=' d-inline-block' id='create-blog-button'>
                <NavLink
                  to='/post-blog'
                  className={`btn ${
                    condition ? 'btn-outline-dark' : 'btn-outline-light'
                  }`}
                >
                  Create blog <i className='fas fa-angle-right mr-2' />
                </NavLink>
              </div>
            </div>
          </div>

          <div className='d-flex align-items-start'>
            <div className='w-75 d-inline-flex'>
              <div className='row m-2'>
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

            <div className='w-22 text-wrap my-4 px-3 mx-1 border text-truncate d-inline-flex'>
              <div>
                <div className='h3'>
                  {' '}
                  {
                    '<SOME TEXT><SOME TEXT><SOME TEXT><SOME TEXT><SOME TEXT><SOME TEXT><SOME TEXT>'
                  }{' '}
                </div>
                <hr />
                <NavLink to='/ask' className='btn btn-raised btn-info'>
                  {' '}
                  Ask{' '}
                </NavLink>
                <div className='h6 underline'>{'Recent Questions:'}</div>
                {qa.map((ques, i) => (
                  <NavLink
                    key={i}
                    to={`/question/${ques._id}`}
                    className={`h6 ${condition ? 'text-white' : ''}`}
                  >
                    <hr />
                    <i className='fas mx-1 fa-chevron-right'></i>
                    {ques.title.substring(0, 50)}...
                  </NavLink>
                ))}
                <hr />
                <hr />
                <div className='h4'>
                  <NavLink
                    to='/allqa'
                    className={` ${condition ? 'text-white' : ''}`}
                  >
                    {'▓ QA Section >'}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
