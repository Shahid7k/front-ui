import React, { Fragment, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BlogEditor from '../BlogEditor/BlogEditor';
import { getBlogById } from '../../../requests/blog';
import { DASHBOARD } from '../../../constants/routesNomenclature';
import { blogInitialState } from '../BlogEditor/BlogEditor';
import { BarLoader } from 'react-spinners';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { editBlog } from '../../../requests/blog';

const Blog = () => {
  const { blogId } = useParams();

  const history = useHistory();

  const { userAuth } = useContext(authContext);

  const { addAlert } = useContext(alertContext);

  const [blog, setBlog] = useState(blogInitialState);

  const [showLoader, setShowLoader] = useState(true);

  const [isEditable, setIsEditable] = useState(false);

  const [showSave, setShowSave] = useState(false);

  React.useEffect(() => {
    (async function () {
      const res = await getBlogById(blogId);
      // console.log(res.data);
      if (res.data) {
        setBlog(res.data);
      }

      setShowLoader(false);
    })();
  }, []);

  const handleSave = blogData => {
    setBlog(blogData);
    setIsEditable(true);
    setShowSave(true);
  };

  const handleSubmit = async () => {
    setIsEditable(false);
    const response = await editBlog(blogId, blog);
    if (response.data) {
      addAlert('Blog successfully edited!', 'success');
      history.push(DASHBOARD);
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const { title, description, content, postedBy } = blog;

  return (
    <Fragment>
      <BarLoader loading={showLoader} color='#333' width={'100%'} />
      {!showLoader && (
        <Fragment>
          <div className='container'>
            <div className='fl-l'>
              <button
                className='btn btn-dark mt-2 mb-5'
                onClick={() => history.goBack()}
              >
                <i className='fas fa-angle-left mr-2' />
                Back
              </button>
            </div>

            <div className='text-right'>
              {userAuth.user._id === postedBy._id && (
                <Fragment>
                  {!isEditable && (
                    <button
                      className='btn btn-primary mt-2 mb-5'
                      onClick={() => setIsEditable(true)}
                    >
                      <i className='fas fa-pen mr-2' />
                      Edit
                    </button>
                  )}

                  {isEditable && showSave && (
                    <button
                      className='btn btn-success mt-2 ml-2 mb-5'
                      disabled={
                        title.length < 4 ||
                        description.length < 5 ||
                        content.length < 30
                      }
                      onClick={handleSubmit}
                    >
                      <i className='fas fa-save mr-2' />
                      Save
                    </button>
                  )}
                </Fragment>
              )}
            </div>

            <BlogEditor
              initialBlogState={blog}
              readOnly={!isEditable}
              toolbarHidden={!isEditable}
              handleSave={handleSave}
            />
            {!isEditable && (
              <button className='btn btn-raised bg-info my-2'>Like</button>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Blog;
