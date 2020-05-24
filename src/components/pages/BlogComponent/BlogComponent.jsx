import React, { useState } from 'react';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BlogEditor from './BlogEditor/BlogEditor';

const initialState = {
  title: 'Test Blog',
  description: 'Testing the blog',
  content: `<p>Test Data Entered</p><ul><li>Lorem Ipsum</li>/ul>`,
};

const BlogComponent = () => {
  const [initialBlogState, setInitialBlogState] = useState(initialState);

  const handleSubmit = blog => {
    console.log(blog);
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
