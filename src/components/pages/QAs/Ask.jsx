import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { alertContext } from '../../../context/AlertContext';
import { authContext } from '../../../context/AuthContext';
import { askQuestion } from '../../../requests/ques';
import { condition } from '../../../utils/theme';

const initialState = {
  title: '',
  body: '',
  photo: '',
  tags: '',
  fileSize: 0,
};

const validatorInititalState = {
  title: {
    error: false,
    hasError: title => title.trim().length < 4 || title.trim().length > 150,
    message: 'Please write a title of your question with 7-150 characters',
  },

  body: {
    error: false,
    hasError: str => str.trim().length < 10 || str.trim().length > 2000,
    message: 'Problem description must have 10-2000 characters',
  },

  tags: {
    error: false,
    hasError: str => str.trim().length < 3 || str.trim().length > 150,
    message: 'Please add Tags within 3-150 characters',
  },
};

const initialMiscState = {
  asked: false,
};

const Ask = () => {
  let history = useHistory();

  const userId = React.useContext(authContext).userAuth.user._id;

  const [quesData, setQuesData] = useState({ ...initialState });

  const [formDataValidator, setFormDataValidator] = useState({
    ...validatorInititalState,
  });

  const [miscState, setMiscStates] = useState({ ...initialMiscState });

  const { addAlert } = React.useContext(alertContext);

  const handleValidatorChange = e => {
    const value = quesData[e.target.name];

    const currValidator = { ...formDataValidator[e.target.name] };
    currValidator.error = currValidator.hasError(value);

    setFormDataValidator({
      ...formDataValidator,
      [e.target.name]: currValidator,
    });
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    const fileSize = name === 'photo' ? e.target.files[0].size : 0;

    setQuesData({ ...quesData, [name]: value, fileSize });
  };

  const { title, body, tags, photo, fileSize } = quesData;

  const handleSubmit = async e => {
    e.preventDefault();

    if (fileSize > 3000092) {
      alert('Image size cannot be more than 3 MB');
      return;
    }

    const question = new FormData();
    question.append('title', title);
    question.append('body', body);
    question.append('tags', tags);
    question.append('photo', photo);

    console.log('FORMDATA : ', JSON.stringify(question));
    const response = await askQuestion(userId, question);
    console.log('RESPONSE', response);
    if (response.data) {
      addAlert('Your question is posted now', 'success');
      setTimeout(() => {
        setMiscStates({ asked: true });
      }, 2000);
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };

  if (miscState.asked) return <Redirect to='/allqa' />;

  return (
    <div className='container p-4'>
      <button
        className={`btn my-3 ${condition ? 'btn-cyan' : 'btn-dark'}`}
        onClick={() => history.goBack()}
      >
        <i className='fas fa-angle-left mr-2' />
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className='form-group'
        encType='multipart/form-data'
        id='myForm'
      >
        <div className='form-group w-75'>
          <label htmlFor='title' className='font13'>
            Title
          </label>
          <input
            className='form-control'
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            onBlur={handleValidatorChange}
          />
          {formDataValidator.title.error && (
            <span className='errorMsg'>{formDataValidator.title.message}</span>
          )}
        </div>

        <div className='form-group w-75'>
          <label htmlFor='body' className='font13'>
            Body
          </label>
          <textarea
            className='form-control'
            type='text'
            name='body'
            value={body}
            onChange={handleChange}
            onBlur={handleValidatorChange}
            rows='5'
          />
          {formDataValidator.body.error && (
            <span className='errorMsg'>{formDataValidator.body.message}</span>
          )}
        </div>

        <div className='form-group w-75'>
          <label htmlFor='tags' className='font13'>
            Tags
          </label>
          <input
            className='form-control form-control-sm'
            type='text'
            name='tags'
            value={tags}
            onChange={handleChange}
            onBlur={handleValidatorChange}
            placeholder=''
          />
          {formDataValidator.tags.error && (
            <span className='errorMsg'>{formDataValidator.tags.message}</span>
          )}
        </div>

        <div className='col-md-10'>
          <label htmlFor='validationDefault01'>
            Reference Pic<small className='text-muted '> (Optional)</small>
          </label>
          <input
            type='file'
            name='photo'
            onChange={handleChange}
            className='form-control w-50'
            accept='image/*'
          />
        </div>

        <input
          className='btn btn-primary btn-raised mt-4'
          type='submit'
          value='Post the Question'
        />
      </form>
    </div>
  );
};

export default Ask;
