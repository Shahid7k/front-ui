import React from 'react';

const UserCard= ({user})=>{
    // console.log(user)
    return (
      
        <div className="card text-center userCard"
        //  style={{height:"auto"}}
        >
            <img className="card-img-top container img-thumbnail rounded-circle"  style={{ height:"5rem", width:"auto"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3oew7CirJdodwRVmgyXyiwa0mVJYgPI29tQKR2mH1-vc2S7U3&usqp=CAU" alt="Card image cap"/>
            <div className="card-body">
            <h5 className="card-title">{user.userName.split(" ")[0]} </h5>
            <p className="card-text">{user.profession!==undefined?user.profession:"Standard User"} </p>
            </div>
            <div className="">
            <small className="">{user.city}{", "} {user.country}</small>
            </div>
        </div>
        
    );

}

export default UserCard;