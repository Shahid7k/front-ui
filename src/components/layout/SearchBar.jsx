import React from 'react';

const SearchBar = ({ search }) => {
  return (
    <div>
      <input
        type='text'
        onChange={search}
        placeholder='&#xF002; Search'
        className='rounded'
        style={{ fontFamily: 'Arial, FontAwesome' }}
      />
    </div>
  );
};

export default SearchBar;
