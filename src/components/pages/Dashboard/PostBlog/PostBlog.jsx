import React, { useState, useContext } from 'react';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';
import BlogEditor from '../../BlogEditor/BlogEditor';
import { authContext } from '../../../../context/AuthContext';
import { DASHBOARD } from '../../../../constants/routesNomenclature';
import { alertContext } from '../../../../context/AlertContext';
import { postBlog } from '../../../../requests/blog';
import { blogInitialState } from '../../BlogEditor/BlogEditor';

const PostBlog = () => {
  const history = useHistory();

  const [initialBlogState, setInitialBlogState] = useState(blogInitialState);

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

  return (
    <div className='my-5'>
      <BlogEditor
        initialBlogState={initialBlogState}
        handleSubmit={handleSubmit}
      />
      {/* <BlogEditor
        initialBlogState={initialBlogState}
        readOnly={true}
        toolbarHidden={true}
      /> */}
    </div>
  );
};

export default PostBlog;
