import React, { useState, useContext } from 'react';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { authContext } from '../../../context/authContext';
import { postBlog } from '../../../requests/blog';
import BlogEditor from './BlogEditor/BlogEditor';

const initialState = {
  title: 'Test Blog',
  description: 'Testing the blog',
  content: `<p>Test Data Entered</p><ul><li>Lorem Ipsum</li>/ul>`,
};

const BlogComponent = () => {
  const [initialBlogState, setInitialBlogState] = useState(initialState);

  const { userAuth } = useContext(authContext);

  const handleSubmit = async blog => {
    const data = await postBlog(userAuth.user._id, blog);
    console.log('blog data', data);
  };

  return (
    <div>
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

export default BlogComponent;
