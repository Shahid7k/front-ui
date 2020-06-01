import React, { useState, useContext, Fragment } from 'react';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';
import BlogEditor from '../../BlogEditor/BlogEditor';
import { authContext } from '../../../../context/AuthContext';
import { DASHBOARD } from '../../../../constants/routesNomenclature';
import { alertContext } from '../../../../context/AlertContext';
import { postBlog } from '../../../../requests/blog';
import { blogInitialState } from '../../BlogEditor/BlogEditor';
import { mode } from '../../../../utils/theme';

const PostBlog = () => {
  const history = useHistory();

  const [initialBlogState, setInitialBlogState] = useState(blogInitialState);

  const [showSave, setShowSave] = useState(false);

  const { userAuth } = useContext(authContext);

  const { addAlert } = useContext(alertContext);

  const handleSubmit = async blog => {
    const response = await postBlog(userAuth.user._id, blog);
    if (response.data) {
      addAlert('Blog successfully posted!', 'success');
      history.push(DASHBOARD);
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const handleSave = blog => {
    setInitialBlogState(blog);
    setShowSave(true);
  };

  const { title, description, content } = initialBlogState;

  return (
    <div className='my-5'>
      <BlogEditor
        initialBlogState={initialBlogState}
        handleSubmit={handleSubmit}
        showPostButton={true}
      />
      {showSave && (
        <button
          className='btn btn-success mt-2 ml-2 mb-5'
          disabled={
            title.length < 4 || description.length < 5 || content.length < 30
          }
          onClick={handleSave}
        >
          Post
        </button>
      )}
    </div>
  );
};

export default PostBlog;
