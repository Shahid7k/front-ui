import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { EDITPROFILE } from '../../../constants/routesNomenclature';
import BlogCard from '../../layout/BlogCard';
import { getBlogsByUserId, deleteBlog } from '../../../requests/blog';
import { alertContext } from '../../../context/AlertContext';
import { getUserById, deleteUser } from '../../../requests/user';
import { getQuesByUser } from '../../../requests/ques';
import { logout } from '../../../requests/auth';
import { mode, condition } from '../../../utils/theme';

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
      updateState({ ...state, userData: result.data, loading: false });

      const res = await getBlogsByUserId(userId);
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
    if (answer) {
      deleteUserConfirmed();
    }
  };

  const {
    firstName,
    lastName,
    profession,
    city,
    country,
    email,
    phoneNo,
    gender,
    about,
    created,
  } = state.userData;

  if (deletedAccount) return <Redirect to='/' />;
  return (
    <div className='container my-5' style={{ minHeight: '100vh' }}>
      <img
        src='https://images.unsplash.com/photo-1520698857293-5d763dde010f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        className='bg-still'
        alt='BackGroundPic'
      />
      <div className='fl-l'>
        <button
          className={`btn btn-white btn-outline-primary m-1`}
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

      <div className={`container ${condition ? 'bg-dark' : 'bg-white'} `}>
        <div className='container d-flex flex-wrap'>
          <div className='ml-5 mt-5 p-2 w-25'>
            <img
              // src='https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png'
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3oew7CirJdodwRVmgyXyiwa0mVJYgPI29tQKR2mH1-vc2S7U3&usqp=CAU'
              alt='profilePic'
              style={{ height: '25vh', width: 'auto' }}
            />
          </div>

          <div className=' font15 pt-5 pb-3 w-50 text-center'>
            <div className='my-1'>
              <i
                className={`fas p-2 ${
                  gender === 'male' ? 'fa-mars' : 'fa-venus'
                }`}
              />
              {firstName} {lastName}
            </div>

            <div className='my-1'>
              <i className='fas fa-briefcase mr-2 p-2' />
              {profession}
            </div>

            <div className='my-1'>
              {' '}
              <i className='fas fa-map-marker-alt mr-2 p-2' />
              {city} {' ,'} {country}
            </div>

            <div className='my-1'>
              {' '}
              <i className='fas fa-envelope mr-2 p-2' />
              {email}
            </div>

            <div className='my-1'>
              <i className='fas fa-phone mr-2' />
              {phoneNo}
            </div>
          </div>

          {state.photoURL !== '' && (
            <img src={state.photoURL} alt='ProfilePic' />
          )}
        </div>

        <hr />

        <div className='font12 text-center'>
          <div className='poiret-one font14 underline font-weight-bold '>
            A B O U T
          </div>

          <br />

          {about === undefined
            ? `The user didn't say anything about ${
                gender === 'male' ? 'him' : 'her'
              }self yet `
            : about}
        </div>
        <hr />
        <ul className='d-flex flex-wrap justify-content-around text-center'>
          {/* <li>
            <i className='far fa-circle'></i>
            <br />
            {'~ ~ ~ ~'}
          </li> */}
          <li>
            <i className='far fa-circle'></i>
            <br />
            {blogs.length}
            <p>BLOGS</p>
          </li>
          <li>
            <i className='far fa-circle'></i>
            <br />
            {created && created.substring(0, 10)}
            <p>Joined</p>
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
  );
};

export default SingleProfile;
