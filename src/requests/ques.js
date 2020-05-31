import axiosClient from '../utils/axiosClient';

export const askQuestion = async( userId, quesData ) => {
    console.log('post action called', quesData);
    try {
      const res = await axiosClient.post(
        `http://localhost:8080/qa/new/${userId}`,
        quesData
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
    const URL="http://localhost:8080/qa/answer";
        
    try{
        const res= await axiosClient.put(
            `http://localhost:8080/qa/answer`,
            { userId, quesId, answer }
        );
        console.log("ANSWER : ",res.data);
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