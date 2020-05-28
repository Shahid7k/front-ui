import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import BlogCard from '../../layout/BlogCard';
import { getBlogs } from '../../../requests/blog';
import { BarLoader } from 'react-spinners';
import { condition } from '../../../utils/theme';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const [showLoader, setShowLoader] = useState(true);

  const history = useHistory();

  React.useEffect(() => {
    (async function () {
      const res = await getBlogs();
      if (res.data) {
        setBlogs(res.data);
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
        <div className='container'>
          <div className='row'>
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

export default Home;
