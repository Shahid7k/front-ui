import React, { Fragment, useState, useContext } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import BlogEditor from '../BlogEditor/BlogEditor';
import {
  editBlog,
  getBlogById,
  addComment,
  deleteComment,
  like,
  unlike,
  deleteBlog,
} from '../../../requests/blog';
import { DASHBOARD } from '../../../constants/routesNomenclature';
import { BarLoader } from 'react-spinners';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { mode, condition } from '../../../utils/theme';

const blogState = {
  title: '',
  description: '',
  content: '',
  _id: '',
  created: '',
  postedBy: {},
  likes: [],
  comments: [],
  userLiked: false,
};

const Blog = () => {
  const { blogId } = useParams();

  const history = useHistory();

  const userId = useContext(authContext).userAuth.user._id;

  const { addAlert } = useContext(alertContext);

  const [blog, setBlog] = useState(blogState);

  const [userComment, setUserComment] = useState('');

  // const [userLike, setUserLike] = useState(false);

  const [showLoader, setShowLoader] = useState(true);

  React.useEffect(() => {
    (async function () {
      const res = await getBlogById(blogId);
      // console.log("BLOGDATA:",res.data);
      if (res.data) {
        const match = res.data.likes.indexOf(userId) !== -1;
        // setBlog(res.data);
        setBlog({ ...res.data, userLiked: match });
      }
      setShowLoader(false);
    })();
  }, []);

  // console.log(blog);

  const handleSubmit = async blog => {
    setBlog({ ...blog }, blog);
    const response = await editBlog(blogId, blog);
    if (response.data) {
      history.push(DASHBOARD);
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const handleDelete = async () => {
    const response = await deleteBlog(blogId);
    // console.log(response);
    if (response.data) {
      addAlert('Blog deleted', 'success');
      history.push(DASHBOARD);
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const handleCommentChange = e => {
    setUserComment(e.target.value);
  };

  const submitLike = async () => {
    // setBlog({ ...blog, likes });
    const response = !blog.userLiked
      ? await like(userId, blogId)
      : await unlike(userId, blogId);
    // console.log(response);
    if (response.likes) {
      const match = response.likes.indexOf(userId) !== -1;
      setBlog({ ...blog, likes: response.likes, userLiked: match });
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const submitComment = async () => {
    // setBlog({ ...blog, comments });
    const response = await addComment(userId, blogId, userComment);
    console.log(response);
    if (response.data) {
      setUserComment('');
      setBlog({ ...blog, comments: response.data.comments });
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const removeComment = async userComment => {
    const response = await deleteComment(userId, blogId, userComment);
    console.log(response);
    if (response.data) {
      // setUserComment('');
      addAlert('Comment deleted.', 'success');
      setBlog({ ...blog, comments: response.data.comments });
    } else {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const likesCount = blog.likes.length;
  return (
    <Fragment>
      <BarLoader loading={showLoader} color='#333' width={'100%'} />
      {!showLoader && (
        <Fragment>
          <BlogEditor
            initialBlogState={blog}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />

          <div className='container'>
            <button className='btn btn-info my-2 mr-2' onClick={submitLike}>
              {blog.userLiked ? 'Unlike' : 'Like'}
            </button>
            {likesCount} {likesCount == 1 ? 'Like' : 'Likes'}
            <div>
              <textarea
                style={commentStyle}
                type='text'
                name='comment'
                rows='3'
                cols='50'
                placeholder='Write a comment...'
                value={userComment}
                onChange={handleCommentChange}
              />
              <button className='btn btn-info m-2' onClick={submitComment}>
                Comment
              </button>
            </div>
          </div>
          <div className='container'>
            {blog.comments.length !== 0 &&
              blog.comments.map((comment, i) => (
                <div key={i} className='p'>
                  <div key={i} className='d-flex'>
                    <div className='comment-photo rounded-circle'>
                      {comment !== null && comment !== undefined ? (
                        <NavLink to={`/profile/${comment.postedBy._id}`}>
                          <img
                            src={`http://localhost:8080/user/photo/${comment.postedBy._id}`}
                            alt='Face'
                            onError={i =>
                              (i.target.src =
                                'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png')
                            }
                            className='comment-photo rounded-circle'
                          />
                        </NavLink>
                      ) : (
                        <p> Anonymous!</p>
                      )}
                    </div>
                    <div className='be-comment-content ml-2 w-100'>
                      <div>
                        <NavLink
                          to={`/profile/${comment.postedBy._id}`}
                          style={mode}
                        >
                          <strong>{comment.postedBy.firstName}</strong>
                        </NavLink>
                        <div className='comment-time ml-auto d-inline-block'>
                          <i className='far fa-clock mr-1' />
                          {comment.created.substring(0, 10)}
                          {' , '}
                          {comment.created.substring(11, 19)} {' (GMT)'}
                          {userId === comment.postedBy._id && (
                            <div className='d-inline-block my-auto'>
                              <i
                                className='fas fa-trash mx-3 pointer'
                                style={{ color: '#E51B0E' }}
                                onClick={() => removeComment(comment)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className='comment-text' style={mode}>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const commentStyle = {
  width: '60%',
  padding: '.375rem .75rem',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#495057',
  backgrounColor: ' #fff',
  border: '1px solid #ced4da',
  borderRadius: '.25rem',
};

export default Blog;
