import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { answer, deleteAnswer, deleteQues } from '../../../requests/ques';
import { BarLoader } from 'react-spinners';
import { mode, condition } from '../../../utils/theme';

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

  const userId = React.useContext(authContext).userAuth.user._id;

  const [quesArr, setQuesArr] = useState([]);

  const { quesId } = useParams();

  const [quesState, fetchQues] = useState({ ...initialQuesState });

  const [redirect, setRedirect] = useState(false);

  const { addAlert } = React.useContext(alertContext);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    (async function () {
      fetchQues({ ...quesState });
      setShowLoader(true);

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
      });

      setShowLoader(false);
    })();
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

    if (response.data) {
      addAlert('Your answer is successfully submitted.', 'success');
      fetchQues({ ...quesState, answer: '', answers: response.data.answers });
    } else if (response.error) {
      addAlert(response.error.data.error, 'danger');
    }
  };

  const del = async () => {
    if (window.confirm('Are you sure you want to delete?')) {
      const res = await deleteQues(quesId);

      if (res.data) {
        addAlert('Your question is deleted.', 'success');
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
    satisfied,
    photoURL,
    showAnswers,
  } = quesState;

  if (redirect) return <Redirect to='/dashboard' />;
  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />

      {!showLoader && (
        <div
          className={`container ${condition ? 'bg-ondark' : 'bg-mint-cream'}`}
        >
          <button
            className={`btn btn-raised m-2 ${
              condition ? 'btn-white' : 'btn-outline-primary'
            }`}
            onClick={() => history.goBack()}
            style={mode}
          >
            <i className='fas fa-angle-left mr-2' />
            Back
          </button>

          <div className={`container mt-3 ${condition ? 'bg-themedark' : ''}`}>
            <h1 className='font18 p-2 px-5'>{title}.</h1>

            <div className='d-flex'>
              <div className='w-75'>
                <div className='px-5 pb-5'>
                  {postedBy != null ? (
                    <NavLink
                      to={`/profile/${postedBy._id}`}
                      className={`h6 font-italic ${
                        condition ? 'text-white' : ''
                      }`}
                    >
                      asked by - {postedBy.firstName}
                    </NavLink>
                  ) : (
                    <div className='h6 font-italic'>asked by - Anonymous </div>
                  )}

                  <div className='text-muted p-3 h5'>Tags : {tags}</div>

                  <div className='font12 mb-4'>{body}</div>

                  <a
                    href={photoURL}
                    target='_blank'
                    className='figure text-wrap'
                  >
                    <img
                      src={photoURL}
                      className='figure-img rounded'
                      onError={i => (i.target.src = '')}
                      style={{ height: '120px', width: 'auto' }}
                    />
                    <p className='figure-caption'>Click to open</p>
                  </a>

                  <hr />

                  <p
                    className={`${satisfied ? 'text-success' : 'text-danger'}`}
                  >
                    {satisfied ? (
                      <Fragment>
                        <i className='fa fa-check m-1' aria-hidden='true'></i>
                        Solved
                      </Fragment>
                    ) : (
                      <Fragment>
                        <i className='fa fa-times m-1' aria-hidden='true' />
                        Not Solved
                      </Fragment>
                    )}
                  </p>

                  {postedBy != null && userId === postedBy._id && (
                    <div className='container mb-4 p-0'>
                      <NavLink
                        className='btn btn-raised btn-warning mr-2'
                        to={`/edit-question/${quesId}`}
                      >
                        Edit
                      </NavLink>
                      <button
                        className='btn btn-raised btn-danger'
                        onClick={del}
                      >
                        Delete Question
                      </button>
                    </div>
                  )}

                  <div className='btn btn-info' onClick={showAnswerBox}>
                    Answer this Question
                  </div>
                </div>
              </div>

              <div className={`mt-5 mx-3 py-3 font11`}>
                <div className='text-truncate text-wrap'>
                  <div className='h4 underline'>Recent Questions:</div>
                  {quesArr
                    .filter(ques => ques._id !== userId)
                    .map((ques, i) => (
                      <div className='h5' key={i}>
                        <a
                          href={`/question/${ques._id}`}
                          className={`${
                            condition ? 'text-white' : ''
                          } text-truncate`}
                        >
                          {ques.title.substring(0, 30)}
                          {'...'}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {quesState.showAnsBox && (
              <div className='m-3 p-2 container'>
                <div className='form'>
                  <textarea
                    type='text'
                    className='form-control'
                    rows='5'
                    name='answer'
                    value={quesState.answer}
                    onChange={handleChange('answer')}
                    placeholder='Start writing your answer here'
                    style={{ width: '100%' }}
                  />

                  <button
                    className='btn btn-primary m-2'
                    onClick={submitAnswer}
                  >
                    {' '}
                    Submit Answer!
                  </button>
                </div>
              </div>
            )}

            <hr />

            <div>
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
                        <div className='mx-1 h6 font11 d-inline-block'>
                          {x != null &&
                          x !== undefined &&
                          x.postedBy != null ? (
                            <NavLink to={`/profile/${x.postedBy._id}`}>
                              <h6
                                className={`${condition ? 'text-white' : ''}`}
                              >
                                {x.postedBy.firstName}
                              </h6>
                            </NavLink>
                          ) : (
                            <p>{'Anonymous'}</p>
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
                        <p className='comment-text'>{x.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {quesState.showAnswers && quesState.answers.length === 0 && (
                <div className='h4 p-3'>
                  No Answers Yet. Wanna be the first one to answer? Click&nbsp;
                  <span onClick={showAnswerBox} className='pointer underline '>
                    here
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default SingleQues;
