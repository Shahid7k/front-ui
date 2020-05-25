import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import BlogCard from '../../layout/BlogCard';
import { getBlogs } from '../../../requests/blog';
import { BarLoader } from 'react-spinners';

// const blogs = [
//   {
//     title: 'test1',
//     description: 'hfdjhfdhjaf',
//     content: '',
//   },
//   {
//     title: 'test2',
//     description: 'hfdjhfdhjaf',
//     content: '',
//   },
//   {
//     title: 'test3',
//     description: 'hfdjhfdhjaf',
//     content: '',
//   },
//   {
//     title: 'test4',
//     description: 'hfdjhfdhjaf',
//     content: '',
//   },
//   {
//     title: 'test',
//     description: 'hfdjhfdhjaf',
//     content: '',
//   },
// ];

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
      <BarLoader loading={showLoader} color='#333' width={'100%'} />
      <div className='row container'>
        {!showLoader &&
          blogs.map((blog, index) => (
            <div
              key={`blog-${index}`}
              onClick={() => history.push(`/blogs/${blog._id}`)}
              className='col-md-4 col-md-offset-3'
            >
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Home;
