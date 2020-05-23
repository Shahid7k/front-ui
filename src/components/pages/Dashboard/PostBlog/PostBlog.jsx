import React, { useState, useContext } from 'react';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BlogEditor from '../../BlogEditor/BlogEditor';
import { authContext } from '../../../../context/authContext';
import { postBlog } from '../../../../requests/blog';

const initialState = {
  title: 'Test Blog',
  description: 'Testing the blog',
  content: `<p>Test Data Entered</p><ul><li>Lorem Ipsum</li>/ul>`,
};

const PostBlog = () => {
  // const onSubmit = (e, markup) => {
  //   console.log(e);
  //   console.log(markup);
  //   setContent(markup);
  // };

  const [initialBlogState, setInitialBlogState] = useState(initialState);

  const { userAuth } = useContext(authContext);

  const handleSubmit = async blog => {
    const data = await postBlog(userAuth.user._id, blog);
    console.log('post data', data);
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

export default PostBlog;
