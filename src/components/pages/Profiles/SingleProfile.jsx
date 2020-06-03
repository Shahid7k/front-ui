import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { mode, condition } from '../../../utils/theme';
import { authContext } from '../../../context/AuthContext';
import { EDITPROFILE } from '../../../constants/routesNomenclature';
import BlogCard from '../../layout/BlogCard';
import { getBlogsByUserId, deleteBlog } from '../../../requests/blog';
import { alertContext } from '../../../context/AlertContext';
import { getUserById, deleteUser } from '../../../requests/user';
import { getQuesByUser } from '../../../requests/ques';
import { logout } from '../../../requests/auth';

const initialState = {
  showPosts: false,
  userData: '',
  loading: false,
  photoURL: '',
};

const SingleProfile = () => {
  const { userId } = useParams();

  let history = useHistory();

  const [state, updateState] = useState({ ...initialState });

  const [blogs, setBlogs] = useState([]);
  const [deletedAccount, deleteAccount] = useState(false);
  const { addAlert } = useContext(alertContext);

  const { userAuth, setUnAuthStatus } = useContext(authContext);

  //Logic to retrieve User Data from the _id from URL LINK
  // useEffect(()=>{
  //     async function getData(){
  //         updateState({...state,loading:true})
  //         const photo=await axios.get("http://localhost:8080/user/photo/"+userId)
  //         // console.log("photo=",JSON.stringify(photo))
  //         const result2=await axios.get("http://localhost:8080/user/"+userId)
  //         // console.log("result=2",JSON.stringify(result2))
  //         updateState({...state,photoURL:photo,userData:result2.data,loading:false})

  //     }
  //     getData()
  // },[])
  // console.log("C - ",Context)

  useEffect(() => {
    (async function () {
      updateState({ ...state, loading: true });
      const result = await getUserById(userId);
      // console.log(JSON.stringify(result))
      updateState({ ...state, userData: result.data, loading: false });

      const res = await getBlogsByUserId(userId);
      // console.log(res.data);
      if (res.data.length !== 0) {
        setBlogs(res.data);
      }
      const quesArr = await getQuesByUser(userId);
      console.log(quesArr);
    })();
  }, []);

  //Logic to retrieve blogs when showPosts is true

  const toggle = e => {
    e.preventDefault();
    updateState({ ...state, showPosts: !state.showPosts });
  };

  const handleLogout = () => {
    logout();
    setUnAuthStatus();
  };

  const deleteUserConfirmed = async () => {
    // window.alert("This will delete all the blogs, too!")
    blogs.map(async (x, i) => {
      const post = x;
      const res = await deleteBlog(post._id);
      if (res.data) {
        setTimeout(() => {
          addAlert(`Deleting ${i + 1} blogs`, 'success');
        }, 500);
      } else if (res.error) {
        addAlert(res.error.data.error, 'danger');
      }
    });

    const res = await deleteUser(userId);
    console.log('PAGEACCOUNTDELETE:', res);
    if (res.data) {
      handleLogout();
      setTimeout(() => {
        addAlert(`Deleted Account successfully`, 'success');
      }, 1000);
      deleteAccount(true);
    } else {
      addAlert(res.error.data.error, 'danger');
    }
  };

  const deleteUserPrompt = async () => {
    const answer = await window.confirm(
      'Are you sure you want to delete the Account?'
    );
    // console.log("answer:",answer)
    // const answer=true
    if (answer) {
      deleteUserConfirmed();
    }
  };

  // console.log("-->",JSON.stringify(userId))
  const {
    firstName,
    profession,
    city,
    country,
    email,
    phoneNo,
    gender,
    about,
  } = state.userData;

  console.log(gender);

  if (deletedAccount) return <Redirect to='/' />;
  return (
    <div
      className='bg-mint-cream container my-5'
      style={{ minHeight: '100vh' }}
    >
      <div className='fl-l'>
        <button
          className={`btn btn-raised btn-outline-primary m-1 `}
          onClick={() => history.goBack()}
          style={mode}
        >
          <i className='fas fa-angle-left mr-2' />
          Back
        </button>
      </div>
      <div className='text-right'>
        {userAuth.user._id === userId && (
          <Fragment>
            <NavLink to={EDITPROFILE} className='btn btn-info w-10 m-2'>
              <i className='fas fa-user-edit mr-2' />
              Edit Profile
            </NavLink>
            <button
              className='btn btn-danger w-10 m-2'
              onClick={deleteUserPrompt}
            >
              <i className='fas fa-trash-alt mr-2' />
              Delete Account
            </button>
          </Fragment>
        )}
      </div>
      <br />

      <br />
      <div className=''>
        <div className={`container ${condition ? 'bg-dark' : 'bg-white'} `}>
          <div className='d-flex flex-wrap'>
            <div className=' p-2 w-25'>
              <img
                src='https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png'
                alt='profilePic'
                style={{ height: '25vh', width: '80%' }}
              />
            </div>

            <div className=' font11 p-5 w-50 text-center'>
              <span>
                <i
                  className={`fas p-2 ${
                    gender === 'male' ? 'fa-mars' : 'fa-venus'
                  }`}
                ></i>
                {firstName}{' '}
              </span>
              <br />
              {profession}
              <br />
              <i className='fas fa-map-marker-alt p-2'></i>
              {city} {' ,'} {country}
              <br />
              <i className='far fa-envelope p-2'></i>
              {email}
              <br />
              <i className='fas fa-phone'></i>
              {phoneNo} <br />
            </div>

            {state.photoURL !== '' && (
              <img src={state.photoURL} alt='ProfilePic' />
            )}
          </div>{' '}
          <hr />
          <div className=' text-center'>
            --ABOUT--
            <br />
            {about}
          </div>
          <hr />
          <ul className='d-flex flex-wrap justify-content-around text-center'>
            <li>
              <i className='far fa-circle'></i>
              <br />
              {'~ ~ ~ ~'}
            </li>
            <li>
              <i className='far fa-circle'></i>
              <br />
              {blogs.length} {' BLOGS'}
            </li>
            <li>
              <i className='far fa-circle'></i>
              <br />
              {'~ ~ ~ ~'}
            </li>
          </ul>
          <hr />
          {blogs.length !== 0 ? (
            <Fragment>
              <button
                className='btn btn-link btn-raised w-100 p-2 m-2'
                style={mode}
                onClick={toggle}
              >
                {state.showPosts ? 'Hide' : 'Show'} All Blogs
              </button>
              {state.showPosts && (
                <div className='row container'>
                  {blogs.map((blog, index) => (
                    <div
                      key={`blog-${index}`}
                      onClick={() => history.push(`/blogs/${blog._id}`)}
                      className='col-md-4 col-md-offset-3'
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              )}
            </Fragment>
          ) : (
            <h3 className='text-center'>No Blogs By This User.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
