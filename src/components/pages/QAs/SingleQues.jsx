import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import axios from 'axios';
import { mode, condition } from '../../../utils/theme';
import { answer, deleteAnswer, deleteQues } from '../../../requests/ques';

const initialQuesState = {
  title: '',
  body: '',
  tags: '',
  answers: [],
  postedBy: '',
  created: '',
  satisfied: false,
  showAnswers: false,
  showAnsBox: false,
  answer: '',
};

const SingleQues = () => {
  const history = useHistory();

  let props = useParams();

  const userId = React.useContext(authContext).userAuth.user._id;

  const [quesArr, setQuesArr] = useState([]);

  const { quesId } = props;

  const [quesState, fetchQues] = useState({ ...initialQuesState });

  const [redirect, setRedirect] = useState(false);

  const { addAlert } = React.useContext(alertContext);

  useEffect(() => {
    async function getData() {
      fetchQues({ ...quesState, loading: true });
      const result = await axios.get('http://localhost:8080/qa/' + quesId);
      const result2 = await axios.get('http://localhost:8080/allqa');
      const arr = result2.data.ques;
      setQuesArr(arr);
      const {
        title,
        body,
        tags,
        answers,
        postedBy,
        created,
        satisfied,
      } = result.data;

      fetchQues({
        ...quesState,
        title,
        body,
        tags,
        answers,
        postedBy,
        created,
        satisfied,
        photoURL: 'http://localhost:8080/qa/photo/' + quesId,
        loading: false,
      });
    }
    getData();
  }, []);

  const toggleAnswers = () => {
    fetchQues({ ...quesState, showAnswers: !quesState.showAnswers });
  };
  const showAnswerBox = () => {
    fetchQues({ ...quesState, showAnsBox: true });
  };

  const handleChange = name => e => {
    const value = e.target.value;
    fetchQues({ ...quesState, [name]: value });
  };

  const submitAnswer = async e => {
    e.preventDefault();

    const response = await answer(userId, quesId, { answer: quesState.answer });
    //   console.log("RESPONSE",response);
    if (response.data) {
      addAlert('Your answer is successfully submitted .', 'success');
      fetchQues({ ...quesState, answer: '', answers: response.data.answers });
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const del = async () => {
    if (window.confirm('Are you sure you want to delete?')) {
      const res = await deleteQues(quesId);
      if (res.data) {
        setRedirect(true);
      } else if (res.error) {
        addAlert(res.error.data.error, 'danger');
      }
    }
  };

  const deleteAnswerConfirmed = async answer => {
    const response = await deleteAnswer(userId, quesId, answer);

    if (response.data) {
      addAlert('Your answer is deleted  .', 'success');
      fetchQues({ ...quesState, answer: '', answers: response.data.answers });
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };
  const deleteAns = answer => {
    let decision = window.confirm(
      'Are you sure you want to delete the answer?'
    );
    if (decision) deleteAnswerConfirmed(answer);
  };

  const {
    title,
    tags,
    body,
    answers,
    postedBy,
    created,
    satisfied,
    photoURL,
    showAnswers,
  } = quesState;

  if (redirect) return <Redirect to='/' />;
  return (
    <div className={`${condition ? 'bg-dark' : 'bg-mint-cream'}`}>
      <div className='w-75'>
        <button
          className={`btn btn-raised btn-outline-primary m-1 `}
          onClick={() => history.goBack()}
          style={mode}
        >
          <i className='fas fa-angle-left mr-2' />
          Back
        </button>
      </div>
      <div className=' '>
        <h1 className=' font18 p-2  mx-5 px-5' style={mode}>
          {title}.
        </h1>
        <div className='d-flex'>
          <div className=''>
            <div className=' p-5' style={mode}>
              {postedBy != null ? (
                <NavLink
                  to={`/profile/${postedBy._id}`}
                  className='h6 font-italic'
                >
                  asked by - {postedBy.firstName}{' '}
                </NavLink>
              ) : (
                <div className='h6 font-italic'>asked by - Anonymous </div>
              )}

              <div className='text-muted p-3 h5'>
                {' '}
                {'Tags : '} {tags}
              </div>
              <div className='font12'>{body}</div>
              <a href={photoURL} target='_blank' className='figure text-wrap'>
                <img
                  src={photoURL}
                  className='figure-img rounded'
                  onError={i => (i.target.src = '')}
                  style={{ height: '120px', width: 'auto' }}
                />
                <p className='figure-caption'>Click to open</p>
              </a>

              <hr />

              <p className={` ${satisfied ? 'text-success' : 'text-danger'}`}>
                {satisfied ? (
                  <Fragment>
                    <i className='fa fa-check m-1' aria-hidden='true'></i>Solved
                  </Fragment>
                ) : (
                  <Fragment>
                    <i className='fa fa-times m-1' aria-hidden='true' />
                    Not Solved
                  </Fragment>
                )}
              </p>
              {postedBy != null && userId === postedBy._id && (
                <div className='container m-4'>
                  <NavLink
                    className={`btn  btn-raised ${
                      condition ? 'btn-dark' : 'btn-warning'
                    } mx-2`}
                    to={`/edit-question/${quesId}`}
                  >
                    Edit
                  </NavLink>
                  <button
                    className={`btn btn-raised ${
                      condition ? 'btn-dark' : 'btn-danger'
                    } mx-2`}
                    onClick={del}
                  >
                    Delete Question
                  </button>
                </div>
              )}
              <div>
                <div
                  className={`btn  ${condition ? 'btn-dark' : 'btn-info'}`}
                  onClick={showAnswerBox}
                >
                  Answer this Question
                </div>
              </div>
            </div>

            <div className=' m-3 p-2 container' style={mode}>
              {quesState.showAnsBox && (
                <div className='form'>
                  <textarea
                    type='text'
                    className='form-control'
                    rows='4'
                    style={mode}
                    name='answer'
                    value={quesState.answer}
                    onChange={handleChange('answer')}
                    placeholder='Start writing your answer here'
                  />
                  <button
                    className='btn btn-primary m-2'
                    onClick={submitAnswer}
                  >
                    {' '}
                    Submit Answer!
                  </button>
                  <hr />
                </div>
              )}

              <div className='btn-link text-center' onClick={toggleAnswers}>
                {!quesState.showAnswers ? 'Show' : 'Hide'} All Answers!
              </div>
              {showAnswers &&
                answers.length !== 0 &&
                answers.map((x, i) => (
                  <div key={i} className='p'>
                    <div key={i} className='p-4 d-flex'>
                      <div className='comment-photo rounded-circle'>
                        {x !== null && x !== undefined && x.postedBy != null ? (
                          <NavLink to={`/profile/${x.postedBy._id}`}>
                            <img
                              src={`http://localhost:8080/user/photo/${x.postedBy._id}`}
                              alt='Face'
                              onError={i =>
                                (i.target.src =
                                  'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png')
                              }
                              className='comment-photo rounded-circle'
                            />
                          </NavLink>
                        ) : (
                          <figure>
                            <img
                              src='https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png'
                              className='comment-photo rounded-circle'
                            />
                          </figure>
                        )}
                      </div>
                      <div className='be-comment-content  m-1'>
                        <div className=' mx-1 h6 font11 d-inline-block '>
                          {x != null &&
                          x !== undefined &&
                          x.postedBy != null ? (
                            <NavLink
                              to={`/profile/${x.postedBy._id}`}
                              style={mode}
                            >
                              {x.postedBy.firstName}
                            </NavLink>
                          ) : (
                            <p style={mode}>{'Anonymous'}</p>
                          )}
                        </div>
                        <div className='comment-time font09 mx-5 d-inline-block'>
                          <i className='fa fa-clock-o'></i>
                          {x.created.substring(0, 10)}
                          {' , '}
                          {x.created.substring(11, 19)} {' (GMT)'}
                          {x.postedBy != null && userId === x.postedBy._id && (
                            <div className='d-inline-block'>
                              <i
                                className='font13 fas fa-trash mx-4 pointer'
                                onClick={() => deleteAns(x)}
                              />
                            </div>
                          )}
                        </div>

                        <p className='comment-text ' style={mode}>
                          {x.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {quesState.showAnswers && quesState.answers.length === 0 && (
                <div className='h4 p-3'>
                  {' '}
                  No Answers Yet. Wanna be the first one to answer? Click{' '}
                  <span onClick={showAnswerBox} className='pointer underline '>
                    here
                  </span>{' '}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=' my-5 py-5 font11'>
          <div className=' text-wrap '>
            <div className='text-truncate'>
              <div className='h6 underline'>{'Recent Questions:'}</div>
              {quesArr
                .filter(ques => ques._id !== userId)
                .map((ques, i) => (
                  <div key={i}>
                    <a
                      href={`/question/${ques._id}`}
                      className=' text-truncate'
                    >
                      {' '}
                      {ques.title.substring(0, 30)}
                      {'...'}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleQues;
