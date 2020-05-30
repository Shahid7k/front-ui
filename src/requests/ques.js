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
