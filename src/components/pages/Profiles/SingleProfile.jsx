import React, {useEffect,useState} from 'react';
import {useParams ,useHistory} from 'react-router-dom';
import axios from 'axios';
import {mode, condition } from '../../../utils/theme';


const initialState={
    showPosts:false,
    userData:"",
    postsList:["ALL", "THE", "POSTS", "HERE!"],
    loading:false,
    photoURL:""

}

const SingleProfile =()=>{
    let props=useParams();
    const {userId} = props
    let history = useHistory();
    const [state,updateState]=useState({...initialState});
    
    //Logic to retrieve User Data from the _id from URL LINK
    // useEffect(()=>{
    //     async function getData(){
    //         updateState({...state,loading:true})
    //         const photo=await axios.get("http://localhost:8080/user/photo/"+userId)
    //         // console.log("photo=",JSON.stringify(photo))
    //         const result2=await axios.get("http://localhost:8080/user/"+userId)
    //         // console.log("result=2",JSON.stringify(result2))
    //         updateState({...state,photoURL:photo,userData:result2.data,loading:false})

    //     }
    //     getData()
    // },[])
    // console.log("C - ",Context)
    useEffect(()=>{
        async function getData(){
            updateState({...state,loading:true})
            const result=await axios.get("http://localhost:8080/user/"+userId)
            // console.log(JSON.stringify(result))
            updateState({...state,userData:result.data,loading:false})
        }
        getData()
    },[])

   
    //Logic to retrieve blogs when showPosts is true

    const toggle = (e)=>{
        e.preventDefault();
        updateState({...state,showPosts:!state.showPosts});
        
    }

    // console.log("-->",JSON.stringify(userId))
    const {userName,profession,city,country,emailId,phoneNo,gender,about} = state.userData;
    return (
        <div className="bg-mint-cream container" style={{minHeight:"100vh"}} >
            <div className="fl-l">
                <button className={`btn btn-raised btn-outline-primary m-1 `} 
                // onClick={goBack}
                onClick={() =>history.goBack()}
                  style={mode}>Back</button>
            </div>
            <div className=" text-right " >
                <button className="btn btn-info w-10 m-2">Edit Profile</button>
                <button className="btn btn-danger w-10 m-2">Delete Profile</button>
            </div> 
            <br/>
            <div className="">
                <div className={`container ${condition?"bg-dark": "bg-white"} `}   >
                    <div className="d-flex flex-wrap">
                        <div className=" p-2 w-25" >
                            <img  src="https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png" alt="profilePic"  style={{height:"25vh",width:"80%"}}/>
                            
                        </div>    

                        <div className=" font11 p-5 w-50 text-center" >
                           <span><i className={`fas p-2 ${gender==="M"?"fa-mars":"fa-venus"}`}></i> 
                            {userName} </span><br/>
                            {profession}<br/>
                            <i className="fas fa-map-marker-alt p-2"></i>
                            { city , country}<br />
                            <i className="far fa-envelope p-2"></i>
                            {emailId}<br />
                            <i className="fas fa-phone"></i>
                            {phoneNo} <br />
                            
                        </div>  
                        
                        {state.photoURL!=="" && <img src= {state.photoURL} alt="ProfilePic" />}
                    </div>      <hr />
                    <div className=" text-center">
                        --ABOUT--
                        <br/>
                       {about}
                    </div>
                    <hr/>
                    <ul className="d-flex flex-wrap justify-content-around text-center">
                        <li>
                            <i className="far fa-circle"></i>
                            <br />
                            {"~ ~ ~ ~"}    
                        </li>
                        <li>
                            <i className="far fa-circle"></i>
                            <br />
                            {"35 BLOGS"}    
                        </li>
                        <li>
                            <i className="far fa-circle"></i>
                            <br />
                            {"~ ~ ~ ~"}    
                        </li>
                        
                    </ul>
                    <hr/>
                    <button className="btn btn-link btn-raised w-100 p-2 m-2" style={mode} onClick={toggle}>{state.showPosts?"Hide":"Show"} All Blogs</button>
                    {state.showPosts && <div> {state.postsList.map((post,i)=><div key={i} className="text-truncate"> {"->"} {post}</div>)} </div>}

                </div>
            </div>

            

        </div>

    );
}

export default SingleProfile;