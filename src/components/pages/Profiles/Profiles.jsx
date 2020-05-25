import React, {useState,useEffect} from 'react';
import './profile.css';
import SearchBar from '../../layout/SearchBar';
import { mode } from '../../../utils/theme';
import axios from 'axios';
import {NOTFOUND, LOADING} from '../../layout/otherConstants';
import UserCard from './UserCard';


const initialState={
  usersList:[],
  sfield:"",
  displayUnsolved:false,
  loading:true
}




const Profiles = () => {
  const [state,updateState]=useState({...initialState});
    useEffect(()=>{
        async function getData(){
            updateState({...state,loading:true})
            const result=await axios.get("http://localhost:8080/allusers")
            // console.log(JSON.stringify(result))
            updateState({...state,usersList:result.data.users,loading:false})
        }
        getData()
    },[])
    const onSearch = (e)=>{
      updateState({...state,sfield:e.target.value});
    }
  
    const filterSearch= state.usersList.filter(friend=>{

      if(friend.country===undefined && friend.profession===undefined) return (friend.userName.toLowerCase().includes(state.sfield.toLowerCase()));
          else if(friend.profession===undefined ) return (friend.country.toLowerCase().includes(state.sfield.toLowerCase())||friend.userName.toLowerCase().includes(state.sfield.toLowerCase()));
          else return (friend.country.toLowerCase().includes(state.sfield.toLowerCase())||friend.profession.toLowerCase().includes(state.sfield.toLowerCase())||friend.userName.toLowerCase().includes(state.sfield.toLowerCase()));
          
      });
    // let filterSearch= state.usersList
    // .filter((user) => (user.userName.toLowerCase().includes(state.sfield.toLowerCase())
    //                   ||user.country.toLowerCase().includes(state.sfield.toLowerCase())
    //                   ||user.profession.toLowerCase().includes(state.sfield.toLowerCase()))  );
    

    return (
      <div className="profileBG">
      
        <img src="https://marketplace.canva.com/EADan4b2aiE/1/0/800w/canva-photo-of-triangle-shape-digital-wallpaper-KOZl2W4wCi8.jpg"
        className="bg-still"
        />   
        
        <div className="container text-c"  >
            <SearchBar search={onSearch} /> 
            
        </div>

        


        <div className="container d-flex-wrap">
            {state.loading?
                LOADING()    
            :""}
            {filterSearch.length==0 && !state.loading?NOTFOUND():filterSearch.map((user,i)=><div key={i} className="p-4"><UserCard user={user} /> </div>)}
        </div>

      </div>


    );
};

export default Profiles;