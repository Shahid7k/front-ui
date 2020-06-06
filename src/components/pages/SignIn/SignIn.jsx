import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInUser } from '../../../requests/auth';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { SIGNUP_ROUTE } from '../../../constants/routesNomenclature';

const initialState = {
  email: '',
  password: '',
};

const validatorInititalState = {
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
};

const SignIn = () => {
  const { setAuthStatus } = useContext(authContext);

  const { addAlert } = useContext(alertContext);

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
    currValidator.error = currValidator.hasError(value);
    setFormDataValidator({
      ...formDataValidator,
      [e.target.name]: currValidator,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await signInUser({ email, password });
    console.log(data);
    if (data) {
      setAuthStatus(data);
    } else {
      addAlert('Invalid email/password', 'danger');
      setFormData({ ...initialState });
    }
  };

  const { email, password } = formData;

  return (
    <div className='form-container'>
      <div className='form-wrap'>
        <h1>Sign In</h1>
        <p>Sign in and explore the world!</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
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
          <button type='submit' className='btn'>
            Sign In
          </button>
        </form>
      </div>
      <footer>
        <p>
          Don't have an account? &nbsp;
          <Link to={SIGNUP_ROUTE}>
            Sign up <i className='fas fa-user-plus'></i>
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

export default SignIn;
