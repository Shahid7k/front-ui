import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpUser } from '../../../requests/auth';
import { authContext } from '../../../context/AuthContext';
import { SIGNIN_ROUTE } from '../../../constants/routesNomenclature';
import { alertContext } from '../../../context/AlertContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  country: '',
  city: '',
  profession: '',
  phoneNo: '',
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
    message: 'Please enter a valid first name (min. of 3 characters)',
  },

  email: {
    error: false,
    hasError: emailID =>
      !/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(emailID),
    message: 'Please enter a valid email',
  },

  password: {
    error: false,
    hasError: pwd =>
      !/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
        pwd
      ),
    message:
      'password should be at least 8 characters long with one of (a-z, A-Z, 0-9, special characters)',
  },

  confirmPassword: {
    error: false,
    hasError: (pwd, cpwd) => pwd !== cpwd,
    message: `passwords don't match`,
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

const SignUp = () => {
  const { setAuthStatus } = React.useContext(authContext);
  const { addAlert } = React.useContext(alertContext);

  const [formData, setFormData] = useState({ ...initialState });
  const [formDataValidator, setFormDataValidator] = useState({
    ...validatorInititalState,
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidatorChange = e => {
    const value = formData[e.target.name];
    const currValidator = { ...formDataValidator[e.target.name] };
    console.log('val', value);
    if (e.target.name === 'confirmPassword')
      currValidator.error = currValidator.hasError(formData.password, value);
    else currValidator.error = currValidator.hasError(value);
    setFormDataValidator({
      ...formDataValidator,
      [e.target.name]: currValidator,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { confirmPassword, ...rest } = formData;
    const response = await signUpUser(rest);
    console.log(response);
    if (response.data) {
      addAlert('Account got created', 'success');
      setAuthStatus(response.data);
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    country,
    city,
    profession,
    phoneNo,
  } = formData;

  return (
    <div className='form-container'>
      <div className='form-wrap'>
        <h1>Sign Up</h1>
        <p>It's free and only takes a minute</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='form-control'
              type='text'
              name='firstName'
              value={firstName}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.firstName.error && (
              <span style={spanStyle}>
                {formDataValidator.firstName.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='form-control'
              type='text'
              name='lastName'
              value={lastName}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.lastName.error && (
              <span style={spanStyle}>
                {formDataValidator.lastName.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control'
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.email.error && (
              <span style={spanStyle}>{formDataValidator.email.message}</span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.password.error && (
              <span style={spanStyle}>
                {formDataValidator.password.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              className='form-control'
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.confirmPassword.error && (
              <span style={spanStyle}>
                {formDataValidator.confirmPassword.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <select
              className='form-control'
              name='gender'
              onChange={handleChange}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other' defaultValue>
                Other
              </option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='country'>Country</label>
            <input
              className='form-control'
              type='text'
              name='country'
              value={country}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.country.error && (
              <span style={spanStyle}>{formDataValidator.country.message}</span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='city'>City</label>
            <input
              className='form-control'
              type='text'
              name='city'
              value={city}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.city.error && (
              <span style={spanStyle}>{formDataValidator.city.message}</span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='profession'>Profession</label>
            <input
              className='form-control'
              type='text'
              name='profession'
              value={profession}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.profession.error && (
              <span style={spanStyle}>
                {formDataValidator.profession.message}
              </span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='phoneNo'>Phone Number</label>
            <input
              className='form-control'
              type='tel'
              name='phoneNo'
              value={phoneNo}
              onChange={handleChange}
              onBlur={handleValidatorChange}
            />
            {formDataValidator.phoneNo.error && (
              <span style={spanStyle}>{formDataValidator.phoneNo.message}</span>
            )}
          </div>

          <button type='submit' className='btn'>
            Register
          </button>
          <p className='bottom-text'>
            By clicking the Sign Up button, you agree to our
            <a href='/'> Terms & Conditions</a> and
            <a href='/'> Privacy Policy</a>
          </p>
        </form>
      </div>
      <footer>
        <p>
          Already have an account? &nbsp;
          <Link to={SIGNIN_ROUTE}>
            Sign in <i className='fas fa-sign-in-alt'></i>
          </Link>
        </p>
      </footer>
    </div>
  );
};

const spanStyle = {
  fontSize: '0.8rem',
  color: '#ff0000',
};

export default SignUp;
