import axiosClient from '../utils/axiosClient';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import axios from 'axios';

export const askQuestion = async( userId, quesData ) => {
  //   console.log('post action called', quesData);
  //   for(var pair of quesData.entries()) {
  //     console.log(pair[0]+ ' --  and -- '+ pair[1]); 
  //  }
    try {
      const res = await axiosClient.post(
        `http://localhost:8080/qa/new/${userId}`,
        quesData,

      );
      console.log("RESULT DATA - ",res.data)
      return { data: res.data };
    } catch (error) {
      const {
        response: { data, status },
      } = error;
      return {
        error: {
          status,
          data,
        },
      };
      // console.log(error);
    }
} 

export const answer = async (userId, quesId ,answer)=>{
    try{
        const res= await axiosClient.put(
            `http://localhost:8080/qa/answer`,
            { userId, quesId, answer }
        );
        // console.log("ANSWER : ",res.data);
        return {data:res.data};
    }
    catch(error){
        const {
            res: { data, status },
          } = error;
          return {
            error: {
              status,
              data,
            },
          };
    }
    
}




export const deleteAnswer = async(userId, quesId, answer) => {
  try{
    const URL="http://localhost:8080/qa/delAns";
    const response= await axiosClient.put(
      URL,
      JSON.stringify({ userId, quesId, answer })
    )
    return {data:response.data};

  }
  catch(error){
    const {
      res: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
  }
};

export const getQuesClient = async (quesId) =>{
  try{
    const response=await axiosClient.get("http://localhost:8080/qa/"+quesId)
    return {data:response.data}
  }
  catch(error){
    const {response:{data,status}} = error;
    return {error:{status,data}}
  }
}


// const token="Bearer "+JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_AUTH)).token;
// // console.log("TOKEN : ",token)
// const tokenHead={
//   Accept:'application/json',
//   Authorization: token
// }



export const editQuestion = async (quesId,quesData) =>{
//   const it=quesData.entries()
//   console.log("DATA ITERATOR : ",it)
//   for(var pair of quesData.entries()) {
//     console.log(pair[0]+ ', '+ pair[1]); 
//  }
//  while(true){
//     const item=it.next();
//     if(item===undefined) break;
//    console.log('put action called',item );
//  } 
  try {
    const res = await axiosClient.put(
      `http://localhost:8080/qa/${quesId}`,
      quesData,
    );
    console.log("RESULT DATA - ",res.data)
    return { data: res.data };
  } catch (error) {
    const {
      res: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
} 



export const deleteQues = async(quesId) =>{
  try {
    const res = await axiosClient.delete(
      `http://localhost:8080/qa/${quesId}`,
    );
    console.log("RESULT DATA - ",res.data)
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
    // console.log(error);
  }
}