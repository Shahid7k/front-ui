import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { mode, condition, dark } from '../../../utils/theme';
import { editUser, getUserById } from '../../../requests/user';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { LOADING } from '../../layout/otherConstants';
import { BarLoader } from 'react-spinners';

const initialUserState = {
  firstName: '',
  lastName: '',
  gender: '',
  profession: '',
  about: '',
  email: '',
  city: '',
  country: '',
  phoneNo: '',
  photo: '',
  darkEnabled: false,
};

const validatorInititalState = {
  firstName: {
    error: false,
    hasError: name => name.trim().length < 3,
    message: 'Please enter a valid first name (min. of 3 characters)',
  },

  lastName: {
    error: false,
    hasError: name => name.trim().length < 3,
    message: 'Please enter a valid last name (min. of 3 characters)',
  },

  country: {
    error: false,
    hasError: name => name.trim().length === 0,
    message: 'Please enter country',
  },

  city: {
    error: false,
    hasError: name => name.trim().length === 0,
    message: 'Please enter city',
  },
  profession: {
    error: false,
    hasError: name => name.trim().length === 0,
    message: 'Please tell us who you are',
  },

  phoneNo: {
    error: false,
    hasError: number =>
      !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(number),
    message: 'Please enter a Phone number',
  },
};

const EditProfile = () => {
  const { addAlert } = React.useContext(alertContext);

  let history = useHistory();

  const { userAuth, toggleDarkMode } = useContext(authContext);

  const userId = userAuth.user._id;

  const [redirect, setRedirect] = useState(false);

  const [user, setUser] = useState({ ...initialUserState });

  const [formDataValidator, setFormDataValidator] = useState({
    ...validatorInititalState,
  });

  const handleValidatorChange = e => {
    const value = user[e.target.name];
    const currValidator = { ...formDataValidator[e.target.name] };
    console.log('val', value);
    currValidator.error = currValidator.hasError(value);
    setFormDataValidator({
      ...formDataValidator,
      [e.target.name]: currValidator,
    });
  };

  const [showLoader, setShowLoader] = useState(true);

  // const userDetails = new FormData();

  useEffect(() => {
    (async function () {
      const res = await getUserById(userId);
      // console.log(JSON.stringify(res));
      if (res.data) {
        setUser(res.data);
      }
      setShowLoader(false);

      const {
        firstName,
        lastName,
        gender,
        profession,
        about,
        city,
        country,
        phoneNo,
        // photo,
        email,
        darkEnabled,
      } = res.data;

      setUser({
        ...user,
        firstName,
        lastName,
        gender,
        profession,
        about,
        city,
        country,
        phoneNo,
        email,
        darkEnabled,
      });
    })();
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await editUser(userId, user);
    // console.log(data);
    if (response.data) {
      addAlert('Profile Updated', 'success');
      setRedirect(true);
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };
  const toggleMode = name => e => {
    setUser({ ...user, darkEnabled: name === 'dark' });
    // const userAuthDetails = { ...userAuth, user[darkEnabled]: name === 'dark' };
    let userInAuth = userAuth.user;
    userInAuth = { ...userInAuth, darkEnabled: name === 'dark' };
    toggleDarkMode(name);
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
    darkEnabled,
  } = user;

  // console.log(darkEnabled);

  // const userToken = JSON.parse(localStorage.getItem('userInfo')).token;
  if (redirect) return <Redirect to={`/profile/${userId}`} />;

  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />

      {!showLoader ? (
        <div className='bg-mint-cream container' style={{ minHeight: '100vh' }}>
          <div className=''>
            <button
              className={`btn btn-raised btn-outline-primary m-1 `}
              // onClick={goBack}
              onClick={() => history.goBack()}
              style={mode}
            >
              <i className='fas fa-angle-left mr-2' />
              Back
            </button>
          </div>
          <div className='fl-r m-5'>
            <label className='mx-4 h5 underline'>
              Mode:{' '}
              <div className='font08'>{darkEnabled ? 'Dark' : 'Light'}</div>
            </label>
            <br />
            {/* THE ABOVE TEXT WRAPPED IN DIV {inside Label,not the Label} IS JUST TO CHECK IF OUR DARK,LIGHT MODES ARE WORKING PROPERLY OR NOT! */}
            <div
              className={`btn btn-dark  bg-darker ${
                condition ? 'disabled' : ''
              } `}
              onClick={toggleMode('dark')}
            >
              Dark
            </div>
            <button
              className={`btn btn-raised btn-light ${
                condition ? '' : 'disabled'
              }`}
              onClick={toggleMode('light')}
            >
              Light
            </button>
            <br />
          </div>

          <br />
          <form className='form'>
            <div className={`container ${condition ? 'bg-dark' : 'bg-white'} `}>
              <div className='form-inline'>
                <div className='d-flex flex-wrap'>
                  <div className=' p-2 w-25'>
                    <img
                      src='https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png'
                      alt='profilePic'
                      style={{ height: '25vh', width: '80%' }}
                    />
                  </div>

                  <div className=' font11  p-5 w-44 text-center'>
                    <span>
                      <i
                        className={`fas p-0 ${
                          gender === 'M' ? 'fa-mars' : 'fa-venus'
                        }`}
                      />{' '}
                      <input
                        className='form-control col-2 m-0 my-1'
                        type='text'
                        placeholder={`${gender === 'male' ? 'Male' : 'Female'}`}
                        value={`${gender === 'male' ? 'Male' : 'Female'}`}
                        readOnly
                        style={mode}
                      />
                    </span>
                    <br />
                    <input
                      type='text'
                      className={`${
                        formDataValidator.firstName.error ? 'border-danger' : ''
                      } form-control  mb-2 col-6 m-0`}
                      placeholder='firstName'
                      name='firstName'
                      value={firstName}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                      style={mode}
                    />
                    <input
                      type='text'
                      className={`${
                        formDataValidator.lastName.error ? 'border-danger' : ''
                      } form-control  mb-2 col-6 m-0`}
                      placeholder='lastName'
                      name='lastName'
                      value={lastName}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                      style={mode}
                    />
                    <br />
                    {formDataValidator.lastName.error && (
                      <span className='errorMsg font07 mx-1 my-0'>
                        {formDataValidator.lastName.message}
                      </span>
                    )}

                    {formDataValidator.firstName.error && (
                      <span className='errorMsg font07 mx-1 my-0'>
                        {formDataValidator.firstName.message}
                      </span>
                    )}
                    <br />
                    <input
                      type='text'
                      className={`${
                        formDataValidator.profession.error
                          ? 'border-danger'
                          : ''
                      }  form-control mx-sm-3 mb-2 col-6 m-0`}
                      placeholder='Profession'
                      name='profession'
                      value={profession}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                      style={mode}
                    />
                    {formDataValidator.profession.error && (
                      <span className='errorMsg font07'>
                        {formDataValidator.profession.message}
                      </span>
                    )}
                    <br />
                    <i className='fas fa-map-marker-alt p-2'></i>
                    <input
                      type='text'
                      className={`${
                        formDataValidator.city.error ? 'border-danger' : ''
                      } form-control mx-sm-3 mb-2 col-3 m-0`}
                      placeholder='City'
                      name='city'
                      value={city}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                      style={mode}
                    />

                    <input
                      type='text'
                      className={`${
                        formDataValidator.country.error ? 'border-danger' : ''
                      } form-control mx-sm-3 mb-2 col-3 m-0`}
                      placeholder='Country'
                      name='country'
                      value={country}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                      style={mode}
                    />
                    <br />
                    {formDataValidator.city.error && (
                      <span className='errorMsg font07 mx-1 my-0'>
                        {formDataValidator.city.message}
                      </span>
                    )}
                    {formDataValidator.country.error && (
                      <span className='errorMsg font07 mx-1 my-0'>
                        {formDataValidator.country.message}
                      </span>
                    )}
                    <br />
                    <i className='far fa-envelope p-2'></i>
                    <input
                      type='email'
                      className='form-control mx-sm-3 mb-2 col-6 m-0 p-0'
                      placeholder='Email'
                      name='email'
                      value={email || ''}
                      style={mode}
                      readOnly
                    />
                    <br />
                    <i className='fas fa-phone'></i>
                    <input
                      type='tel'
                      className={` ${
                        formDataValidator.phoneNo.error ? 'border-danger' : ''
                      } form-control mx-sm-3 mb-2 col-6 m-0 p-0`}
                      placeholder='Phone Number'
                      name='phoneNo'
                      value={phoneNo || ''}
                      style={mode}
                      onChange={handleChange}
                      onBlur={handleValidatorChange}
                    />
                    {formDataValidator.phoneNo.error && (
                      <span className='errorMsg font07'>
                        {formDataValidator.phoneNo.message}
                      </span>
                    )}
                    <br />
                  </div>

                  {user.photoURL !== '' && (
                    <img src={user.photoURL} alt='ProfilePic' />
                  )}
                </div>
              </div>

              <hr />
              <div className=' text-center'>
                --ABOUT--
                <br />
                <textarea
                  type='text'
                  onChange={handleChange}
                  className='form-control'
                  name='about'
                  //  onChange={this.handleChange("about")}
                  value={about}
                  id='validationDefaultUsername'
                  placeholder='About '
                  rows='5'
                  aria-describedby='inputGroupPrepend2'
                  required
                  style={mode}
                />
              </div>
              <hr />
            </div>
            <button
              onClick={handleSubmit}
              className='btn btn-raised btn-outline-info'
              style={mode}
            >
              Save the Changes
            </button>
          </form>
        </div>
      ) : (
        <>{LOADING}</>
      )}
    </Fragment>
  );
};

export default EditProfile;
