import React, { Fragment, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BlogEditor from '../BlogEditor/BlogEditor';
import { getBlogById } from '../../../requests/blog';
import { blogInitialState } from '../BlogEditor/BlogEditor';
import { BarLoader } from 'react-spinners';

const Blog = () => {
  const history = useHistory();

  const [blog, setBlog] = useState(blogInitialState);

  const [showLoader, setShowLoader] = useState(true);

  const { blogId } = useParams();

  React.useEffect(() => {
    (async function () {
      const res = await getBlogById(blogId);
      console.log(res.data);
      if (res.data) {
        setBlog(res.data);
      }

      setShowLoader(false);
    })();
  }, []);

  // console.log(blogId);

  function goBack() {
    history.goBack();
  }

  return (
    <Fragment>
      <BarLoader loading={showLoader} color='#333' width={'100%'} />
      {!showLoader && (
        <React.Fragment>
          <div className='container'>
            <button className='btn btn-lg btn-dark mt-2 mb-5' onClick={goBack}>
              <i className='fas fa-arrow-left mr-2' />
              Back
            </button>
          </div>
          <BlogEditor
            initialBlogState={blog}
            readOnly={true}
            toolbarHidden={true}
          />
        </React.Fragment>
      )}
    </Fragment>
  );
};

export default Blog;
