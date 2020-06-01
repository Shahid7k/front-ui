import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './BlogEditor.css';
import { authContext } from '../../../context/AuthContext';
import RichEditor from './RichEditor/RichEditor';

export const blogInitialState = {
  title: '',
  description: '',
  content: '',
};

const BlogEditor = props => {
  const history = useHistory();

  const [blog, setBlog] = useState(blogInitialState);

  const userId = useContext(authContext).userAuth.user._id;

  const [isEditable, setIsEditable] = useState(false);

  const { initialBlogState, handleSubmit, ...rest } = props;

  useEffect(() => {
    if (initialBlogState) {
      setBlog(initialBlogState);
    }
    if (rest.showPostButton) {
      setIsEditable(true);
    }
  }, [initialBlogState]);

  const { title, description, content } = blog;

  const handleSave = () => {
    handleSubmit && handleSubmit(blog);
  };

  return (
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
          {rest.showPostButton && (
            <button
              className='btn btn-success mt-2 ml-2 mb-5'
              disabled={
                title.length < 4 ||
                description.length < 5 ||
                content.length < 20
              }
              onClick={handleSave}
            >
              <i className='fas fa-save mr-2' />
              Post
            </button>
          )}
          {blog.postedBy && userId === blog.postedBy._id && (
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

              {isEditable && (
                <button
                  className='btn btn-success mt-2 ml-2 mb-5'
                  disabled={
                    title.length < 4 ||
                    description.length < 5 ||
                    content.length < 20
                  }
                  onClick={handleSave}
                >
                  <i className='fas fa-save mr-2' />
                  Save
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>

      <div className='container'>
        <input
          type='text'
          placeholder='Title...'
          className={
            !isEditable ? 'border-top-0 border-left-0 border-right-0' : ''
          }
          name='blogTitle'
          value={title}
          disabled={!isEditable}
          onChange={e => setBlog({ ...blog, title: e.target.value })}
        />
        <input
          type='text'
          placeholder='Description...'
          className={
            !isEditable ? 'border-top-0 border-left-0 border-right-0' : ''
          }
          name='blogDescription'
          value={description}
          disabled={!isEditable}
          onChange={e => setBlog({ ...blog, description: e.target.value })}
        />
        <RichEditor
          initialBlogState={initialBlogState}
          readOnly={!isEditable}
          toolbarHidden={!isEditable}
          handleBlogContentChange={markup =>
            setBlog({ ...blog, content: markup })
          }
        />
      </div>
    </Fragment>
  );
};

BlogEditor.defaultProps = {
  initialBlogState: '',
  readOnly: false,
  toolbarHidden: false,
  showPostButton: false,
};

export default BlogEditor;
