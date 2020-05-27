import React, {useEffect,useState} from 'react';
import {useParams ,useHistory, Link, generatePath} from 'react-router-dom';
import axios from 'axios';
import {mode, condition, dark } from '../../../utils/theme';
import {editUser} from '../../../requests/user'
import { authContext } from '../../../context/AuthContext';


const initialUserState={
    userName:"",
    gender:"",
    profession:"",
    about:"",
    city:"",
    country:"",
    phoneNo:"",
    photo:"",
    darkEnabled:false

}
const otherInitialState={
    loading:false
}

const EditProfile =()=>{
    let props=useParams();
    const {userId} = props
    const [userDetails,updateUserDetails]=useState({...initialUserState});
    const { setAuthStatus } = React.useContext(authContext);
    const [otherStates,updateOtherStates]=useState({...otherInitialState}); 
    useEffect(()=>{
        async function getData(){
            updateOtherStates({...otherStates,loading:true})
            const result=await axios.get("http://localhost:8080/user/"+userId)
            // console.log(JSON.stringify(result))
            const {userName,gender,profession,about,city,country,phoneNo,photo,darkEnabled} = result.data
            updateUserDetails({...userDetails,userName:userName,gender:gender,profession:profession,about:about,city:city,country:country,phoneNo:phoneNo,darkEnabled:darkEnabled})
            updateOtherStates({...otherStates,loading:false})
        }
        getData()
    },[])
    const {userData} = userDetails;
    const {loading}=otherStates;
    const handleChange = (e )=>{
        updateUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await editUser({userId , userData });
        console.log(data);
        if (data) {
          setAuthStatus(data);
        } else {
          updateUserDetails({ ...initialUserState });
        }
      };

    const {userName,profession,city,country,email,phoneNo,gender,about} = userDetails;
    if(loading)return <h1>Loading...</h1>
    return (
        <div className="bg-mint-cream container" style={{minHeight:"100vh"}} >
        <div className="fl-l">
            {/* <button className={`btn btn-raised btn-outline-primary m-1 `} 
            // onClick={goBack}
            onClick={() =>history.goBack()}
              style={mode}>Back</button> */}
        </div>
       
        <br/>
        <form className="form">
            <div className={`container ${condition?"bg-dark": "bg-white"} `}   >
                <div className="form-inline">
                    <div className="d-flex flex-wrap">
                        <div className=" p-2 w-25" >
                            <img  src="https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png" alt="profilePic"  style={{height:"25vh",width:"80%"}}/>
                            
                        </div>    

                        <div className=" font11  p-5 w-44 text-center" >
                        <span><i className={`fas p-0 ${gender==="M"?"fa-mars":"fa-venus"}`}> <input className="form-control col-2 m-0"  type="text" placeholder={`${gender=="M"?"Male":"Female"}`}  readOnly />
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-6 m-0" placeholder="UserName" name={userName} value={userName} /> </i></span><br/>
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-6 m-0" placeholder="Profession" name={profession} value={profession} /><br/>
                            <i className="fas fa-map-marker-alt p-2"></i>
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-3 m-0" placeholder="City" name={city} value={city} />
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-3 m-0" placeholder="Country" name={country} value={country} /><br />
                            <i className="far fa-envelope p-2"></i>
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-6 m-0 p-0" placeholder="Email ID" name={email} value={email} /><br />
                            <i className="fas fa-phone"></i>
                            <input onChange={handleChange} type="text" className="form-control mx-sm-3 mb-2 col-6 m-0 p-0" placeholder="Phone Number" name={phoneNo} value={phoneNo} /><br />
                            
                        </div>  
                        
                        {userDetails.photoURL!=="" && <img src= {userDetails.photoURL} alt="ProfilePic" />}
                    </div>   

                </div>
                
                   <hr />
                <div className=" text-center">
                    --ABOUT--
                    <br/>
                    <textarea type="text" onChange={handleChange} className="form-control" name="about"
                    //  onChange={this.handleChange("about")} 
                     value={about} id="validationDefaultUsername" placeholder="About "  rows ="5" aria-describedby="inputGroupPrepend2" required/>
                </div>
                <hr/>
            </div>
            <button onClick={handleSubmit} className="btn btn-raised btn-outline-info" >Save the Changes</button>
        </form>

        

    </div>

    );
}

export default EditProfile;