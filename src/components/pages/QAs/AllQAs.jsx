import React, { useState, useEffect } from 'react';
import SearchBar from '../../layout/SearchBar';
import QuesCard from './QuesCard';
import { NOTFOUND, LOADING } from '../../layout/otherConstants';
// import {listApi} from  './api';
import axios from 'axios';
import './../LandingPage/landingPage.css';

const initialState = {
  list: [],
  sfield: '',
  displayUnsolved: false,
  loading: true,
};

const AllQAs = () => {
  const [state, updateState] = useState({ ...initialState });
  useEffect(() => {
    async function getData() {
      updateState({ ...state, loading: true });
      const result = await axios.get('http://localhost:8080/allqa');
      // console.log(JSON.stringify(result))
      updateState({ ...state, list: result.data.ques, loading: false });
    }
    getData();
  }, []);
  // console.log(state.list)
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
    <div>
      <img
        src='https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-021.jpg'
        alt='bgForQA'
        className='bg-still'
      />
      <div className='container text-c'>
        <SearchBar search={onSearch} />
        <div>
          <input
            className='form-check-input'
            onChange={toggleQues}
            type='checkbox'
            value=''
            id='defaultCheck1'
          />
          <label className='form-check-label' htmlFor='defaultCheck1'>
            Show only Unsolved
          </label>
        </div>
      </div>
      <div className='container'>
        {state.loading ? LOADING() : ''}
        {filterSearch.length === 0 && !state.loading
          ? NOTFOUND()
          : filterSearch.map((ques, i) => (
              <div key={i}>
                <QuesCard  ques={ques} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllQAs;
