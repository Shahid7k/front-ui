// import axiosClient from '../utils/axiosClient';

// export const editUser = async (userId,userData) =>{
//     try{
//         const res= await axiosClient.put(`http://localhost:8080/user/${userId}`,userData)
//         return {data:res.data};
//     }
//     catch(error){
//         const {response:{data,status}} =error
//         return {error:{status, data}}
//     }

// }