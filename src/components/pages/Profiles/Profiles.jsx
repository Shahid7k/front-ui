import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../layout/SearchBar';
import axios from 'axios';
import { NOTFOUND } from '../../layout/otherConstants';
import UserCard from './UserCard';
import { BarLoader } from 'react-spinners';
import { condition } from '../../../utils/theme';

const initialState = {
  usersList: [],
  sfield: '',
};

const Profiles = () => {
  const [state, updateState] = useState({ ...initialState });

  const [showLoader, setShowLoader] = useState(true);

  const history = useHistory();

  useEffect(() => {
    (async function () {
      updateState({ ...state });
      setShowLoader(true);
      const result = await axios.get('http://localhost:8080/allusers');
      updateState({ ...state, usersList: result.data.users });
      setShowLoader(false);
    })();
  }, []);

  const onSearch = e => {
    updateState({ ...state, sfield: e.target.value });
  };

  const filterSearch = state.usersList.filter(friend => {
    if (friend.country === undefined && friend.profession === undefined)
      return friend.firstName
        .toLowerCase()
        .includes(state.sfield.toLowerCase());
    else if (friend.profession === undefined)
      return (
        friend.country.toLowerCase().includes(state.sfield.toLowerCase()) ||
        friend.firstName.toLowerCase().includes(state.sfield.toLowerCase())
      );
    else
      return (
        friend.country.toLowerCase().includes(state.sfield.toLowerCase()) ||
        friend.profession.toLowerCase().includes(state.sfield.toLowerCase()) ||
        friend.firstName.toLowerCase().includes(state.sfield.toLowerCase())
      );
  });

  // let filterSearch= state.usersList
  // .filter((user) => (user.firstName.toLowerCase().includes(state.sfield.toLowerCase())
  //                   ||user.country.toLowerCase().includes(state.sfield.toLowerCase())
  //                   ||user.profession.toLowerCase().includes(state.sfield.toLowerCase()))  );

  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />

      {!showLoader && (
        <div className='profileBG container my-5'>
          <img
            // src='https://marketplace.canva.com/EADan4b2aiE/1/0/800w/canva-photo-of-triangle-shape-digital-wallpaper-KOZl2W4wCi8.jpg'
            src='https://images.unsplash.com/photo-1520698857293-5d763dde010f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            className='bg-still'
            alt='BackGroundPic'
          />

          <h1 className='text-white'>Our proud users..</h1>

          <div className='clearfix'>
            <div className='w-25 fl-r '>
              <SearchBar search={onSearch} />
            </div>
          </div>

          <div className='row'>
            {filterSearch.length === 0 && !showLoader
              ? NOTFOUND()
              : filterSearch.map((user, i) => (
                  <div
                    onClick={() => history.push(`/profile/${user._id}`)}
                    key={i}
                    className='col-md-3 col-md-offset-3'
                  >
                    <UserCard user={user} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profiles;
