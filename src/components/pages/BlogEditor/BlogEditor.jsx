import React, { useState, useEffect } from 'react';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './BlogEditor.css';
import RichEditor from './RichEditor/RichEditor';

const initialState = {
  title: '',
  description: '',
  content: '',
};

const BlogEditor = props => {
  const [blog, setBlog] = useState(initialState);

  const { initialBlogState, handleSubmit, ...rest } = props;

  useEffect(() => {
    if (initialBlogState) {
      setBlog(initialBlogState);
    }
  }, [initialBlogState]);

  const { title, description, content } = blog;

  const handleSave = () => {
    handleSubmit && handleSubmit(blog);
  };

  return (
    <div className='container' style={{ maxWidth: '900px' }}>
      <input
        type='text'
        placeholder='Title...'
        className={
          rest.readOnly ? 'border-top-0 border-left-0 border-right-0' : ''
        }
        name='blogTitle'
        value={title}
        disabled={rest.readOnly}
        onChange={e => setBlog({ ...blog, title: e.target.value })}
      />
      <input
        type='text'
        placeholder='Description...'
        className={
          rest.readOnly ? 'border-top-0 border-left-0 border-right-0' : ''
        }
        name='blogDescription'
        value={description}
        disabled={rest.readOnly}
        onChange={e => setBlog({ ...blog, description: e.target.value })}
      />
      <RichEditor
        {...rest}
        initialBlogState={initialBlogState}
        handleBlogContentChange={markup =>
          setBlog({ ...blog, content: markup })
        }
      />
      {!rest.readOnly && (
        <button
          className='btn btn-dark d-block ml-auto my-2 mr-2'
          disabled={title.length === 0 || content.length === 0}
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
  );
};

BlogEditor.defaultProps = {
  initialBlogState: '',
  readOnly: false,
  toolbarHidden: false,
};

export default BlogEditor;
