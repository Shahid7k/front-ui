import React, { useState, useContext } from 'react';
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
    <div className='container'>
      <div className=''>
            <button className={`btn btn-raised btn-outline-primary m-3 `} 
            // onClick={goBack}
            onClick={() =>history.goBack()}
              style={mode}>
                <i className='fas fa-angle-left mr-2' />
                Back
                </button>
          </div>
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
