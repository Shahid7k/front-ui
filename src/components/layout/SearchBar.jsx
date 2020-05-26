import React from 'react';

const SearchBar = ({search}) =>{


    return (
        <div className=" ">
            <input type="text" onChange={search} placeholder="&#xF002; Search" style={{fontFamily:"Arial, FontAwesome"}} />
        </div>
    );
}

export default SearchBar;