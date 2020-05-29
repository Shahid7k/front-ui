import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link, generatePath } from 'react-router-dom';
import { mode, condition, dark } from '../../../utils/theme';
import { editUser, getUserById } from '../../../requests/user';
import { authContext } from '../../../context/AuthContext';
import { BarLoader } from 'react-spinners';

const initialUserState = {
  firstName: '',
  lastName: '',
  gender: '',
  profession: '',
  about: '',
  email:'',
  city: '',
  country: '',
  phoneNo: '',
  photo: '',
  darkEnabled: false,
};

const EditProfile = () => {
  let props = useParams();
  const { userId } = props;
  
  const [user, setUser] = useState({ ...initialUserState });

  const { userAuth, setAuthStatus } = useContext(authContext);

  const [showLoader, setShowLoader] = useState(true);

  const userDetails= new FormData()

  useEffect(() => {
    (async function () {
      const res = await getUserById(userId);
      console.log(JSON.stringify(res));
      if (res.data) {
        setUser(res.data);
      }
      setShowLoader(false);

      const {
        firstName,
        lastName,
        gender,
        profession,
        about,
        city,
        country,
        phoneNo,
        photo,
        email,
        darkEnabled,
      } = res.data;

      setUser({
        ...user,
        firstName,
        lastName,
        gender,
        profession,
        about,
        city,
        country,
        phoneNo,
        email,
        darkEnabled,
      });
    })();
  }, []);

  const {
    firstName,
    lastName,
    profession,
    city,
    country,
    email,
    phoneNo,
    gender,
    about,
  } = user;


      let gen="GENIOUS";
      console.log(gen);

  const handleChange = e => {
    const name=e.target.name;
    const value=e.target.value;
    setUser({ ...user, [e.target.name]: e.target.value });
    userDetails.set(name,value)
  };

//   submit = event =>{
//     event.preventDefault()
//     if(this.isValid()){
//         this.setState({loading:true})
        
//         console.log("UserData : ",this.userData)
//         this.updateUser(this.userData)
//         .then(data=>{
//             if(data.error) {
//                 console.log("Error occurred",this.state.error)
//                 this.setState({error:data.error})
//             }
//             else {

//                 console.log("UPDATED USERRRR!!!!!!",false)
//                 updateUser(data,()=>this.setState({ error:"Updated!" })
//                 )
//                 console.log("UPDATED USERRRR!!!!!!",true)
//             }
//         })
//         .catch(err=>{
//             console.log("caught",err);
//         })
//         console.log("reached here   ")
//     }
     
// };
const userToken=JSON.parse(localStorage.getItem("userInfo")).token

  const updateUser= (userId, user) =>{
    // const userId=this.props.match.params.userId
    let URL="http://localhost:8080/user/"+userId;
    console.log("USER DATA UPDATE -",user)
    return(
    fetch(URL,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:"Bearer "+userToken
        },
        body:user
    })
    .then(response=> response.json())
    .catch(err=>console.log("Problem ",err))
    )
}


  const handleSubmit =  e => {
    e.preventDefault();

     updateUser(userId, userDetails)
    .then(data=>{
      console.log(data);
      if(data.error) {
        console.log("Error occurred",data.error)
          // this.setState({error:data.error})
      }
      else {
        if(typeof window!=='undefined'){
          if(localStorage.getItem("userInfo")){
              let auth={
                token:userToken,
                user:{
                  _id:userId,
                  firstName
                }
              }
              localStorage.setItem("userInfo",JSON.stringify(auth))
          }
        }  
        console.log("UPDATED USERRRR!!!!!!",true)
      }
    })
    .catch(err=>{
        console.log("caught",err);
    })
    console.log("reached here   ")
   };

  
  console.log(email);

  return (
    <Fragment>
      <BarLoader
        loading={showLoader}
        color={`${condition ? '#fff' : '#b02'}`}
        width={'100%'}
      />

      {!showLoader && (
        <div className='bg-mint-cream container' style={{ minHeight: '100vh' }}>
          <div className='fl-l'>
            {/* <button className={`btn btn-raised btn-outline-primary m-1 `} 
            // onClick={goBack}
            onClick={() =>history.goBack()}
              style={mode}>Back</button> */}
          </div>

          <br />
          <form className='form'  >
            <div className={`container ${condition ? 'bg-dark' : 'bg-white'} `}>
              <div className='form-inline'>
                <div className='d-flex flex-wrap'>
                  <div className=' p-2 w-25'>
                    <img
                      src='https://2.bp.blogspot.com/-3V7O72C-y6Q/WtgKBJ8xMvI/AAAAAAAAF9g/3uqiHiABmswMsJKKGkbcIitnYS2GSfkZACEwYBhgL/s1600/cool%2Bpictures%2Bfor%2Bprofile.png'
                      alt='profilePic'
                      style={{ height: '25vh', width: '80%' }}
                    />
                  </div>

                  <div className=' font11  p-5 w-44 text-center'>
                    <span>
                      <i
                        className={`fas p-0 ${
                          gender === 'M' ? 'fa-mars' : 'fa-venus'
                        }`}
                      />{' '}
                      <input
                        className='form-control col-2 m-0 my-1'
                        type='text'
                        placeholder={`${gender == 'male' ? 'Male' : 'Female'}`}
                        value={`${gender == 'male' ? 'Male' : 'Female'}`}
                        readOnly
                        style={mode}
                      />
                    </span>
                    <br />
                    <input
                      type='text'
                      className='form-control  mb-2 col-6 m-0'
                      placeholder='firstName'
                      name='firstName'
                      value={firstName}
                      onChange={handleChange}
                      style={mode}
                    />
                    <input
                      type='text'
                      className='form-control  mb-2 col-6 m-0'
                      placeholder='lastName'
                      name='lastName'
                      value={lastName}
                      onChange={handleChange}
                      style={mode}
                    />
                    <br />
                    <input
                      type='text'
                      className='form-control mx-sm-3 mb-2 col-6 m-0'
                      placeholder='Profession'
                      name='profession'
                      value={profession}
                      onChange={handleChange}
                      style={mode}
                    />
                    <br />
                    <i className='fas fa-map-marker-alt p-2'></i>
                    <input
                      type='text'
                      className='form-control mx-sm-3 mb-2 col-3 m-0'
                      placeholder='City'
                      name='city'
                      value={city}
                      onChange={handleChange}
                      style={mode}
                    />
                    <input
                      type='text'
                      className='form-control mx-sm-3 mb-2 col-3 m-0'
                      placeholder='Country'
                      name='country'
                      value={country}
                      onChange={handleChange}
                      style={mode}
                    />
                    <br />
                    <i className='far fa-envelope p-2'></i>
                    <input
                      type='email'
                      className='form-control mx-sm-3 mb-2 col-6 m-0 p-0'
                      placeholder='Email'
                      name='email'
                      value={email || ''}
                      style={mode}
                      readOnly
                    />
                    <br />
                    <i className='fas fa-phone'></i>
                    <input
                      type='tel'
                      className='form-control mx-sm-3 mb-2 col-6 m-0 p-0'
                      placeholder='Phone Number'
                      name='phoneNo'
                      value={phoneNo || ''}
                      style={mode}
                      onChange={handleChange}
                    />
                    <br />
                  </div>

                  {user.photoURL !== '' && (
                    <img src={user.photoURL} alt='ProfilePic' />
                  )}
                </div>
              </div>

              <hr />
              <div className=' text-center'>
                --ABOUT--
                <br />
                <textarea
                  type='text'
                  onChange={handleChange}
                  className='form-control'
                  name='about'
                  //  onChange={this.handleChange("about")}
                  value={about}
                  id='validationDefaultUsername'
                  placeholder='About '
                  rows='5'
                  aria-describedby='inputGroupPrepend2'
                  required
                  style={mode}  
                />
              </div>
              <hr />
            </div>
            <button
              onClick={handleSubmit}
              className='btn btn-raised btn-outline-info'
              style={mode}
            >
              Save the Changes
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default EditProfile;
