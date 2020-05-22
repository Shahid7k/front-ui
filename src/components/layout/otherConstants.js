import React from 'react';

export const NOTFOUND = () =>{
    return (
        <div>
            
            <img src="https://cdn4.iconfinder.com/data/icons/pretticons-1/64/not-found-512.png"
            className=" homeIcons d-inline-block "    
                
            />
            <h2 className="d-inline-block">No Results found</h2>
        </div>
    );
}

export const LOADING = () =>{
    return (
        <div className="container">
            <h1 className="d-inline-block">{"Loading . . .  "} </h1>
            <img className="fl-l rotateZ d-inline-block" src="https://www.freeiconspng.com/uploads/load-icon-png-27.png"/>
        </div>  
           
    );
}