import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { HOME_ROUTE } from '../../../constants/routesNomenclature';
import SearchBar from '../../layout/SearchBar';
import QuesCard from './QuesCard';
import { NOTFOUND } from '../../layout/otherConstants';
import { BarLoader } from 'react-spinners';
import { condition } from '../../../utils/theme';
import './../LandingPage/landingPage.css';

const initialState = {
  list: [],
  sfield: '',
  displayUnsolved: false,
};

const AllQAs = () => {
  const [state, updateState] = useState({ ...initialState });

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    (async function () {
      updateState({ ...state });
      setShowLoader(true);
      const result = await axios.get('http://localhost:8080/allqa');
      updateState({ ...state, list: result.data.ques });
      setShowLoader(false);
    })();
  }, []);

  const onSearch = e => {
    updateState({ ...state, sfield: e.target.value });
  };

  const toggleQues = e => {
    updateState({ ...state, displayUnsolved: !state.displayUnsolved });
  };

  let filterSearch = state.list.filter(ques =>
    ques.tags.toLowerCase().includes(state.sfield.toLowerCase())
  );

  if (state.displayUnsolved)
    filterSearch = filterSearch.filter(ques => !ques.satisfied);

  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />
      {!showLoader && (
        <div className='mt-5'>
          <img
            // src='https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-021.jpg'
            src='https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            alt='bgForQA'
            className='bg-still'
          />

          <div className='container'>
            <NavLink
              to={HOME_ROUTE}
              className={`btn mx-2 ${condition ? 'btn-cyan' : 'btn-dark'}`}
            >
              <i className='fas fa-angle-left mr-2' />
              Home
            </NavLink>
          </div>

          <div className='container text-c mb-4'>
            <SearchBar search={onSearch} />
            <input
              className='form-check-input'
              onChange={toggleQues}
              type='checkbox'
              value={state.sfield}
              id='defaultCheck1'
            />
            <label className='form-check-label' htmlFor='defaultCheck1'>
              Show only Unsolved
            </label>
          </div>

          <div className='container'>
            {filterSearch.length === 0 && !showLoader
              ? NOTFOUND()
              : filterSearch.map((ques, i) => (
                  <div key={i}>
                    <QuesCard ques={ques} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AllQAs;
