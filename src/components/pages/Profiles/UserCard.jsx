import React from 'react';
import { mode, condition } from '../../../utils/theme';

const UserCard = ({ user }) => {
  return (
    <div
      className={`card text-center userCard border-0 ${
        condition ? 'card-dark' : 'bg-white'
      }`}
      style={mode}
    >
      <img
        className='card-img-top container img-thumbnail rounded-circle'
        style={{ height: '5rem', width: 'auto' }}
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3oew7CirJdodwRVmgyXyiwa0mVJYgPI29tQKR2mH1-vc2S7U3&usqp=CAU'
        alt='UserPic'
      />

      <div className='card-body'>
        <h5 className='card-title'>
          {user.firstName} {user.lastName}
        </h5>
        <p className='card-text'>{user.profession}</p>
      </div>
      <small>
        {user.city}
        {', '} {user.country}
      </small>
    </div>
  );
};

export default UserCard;
