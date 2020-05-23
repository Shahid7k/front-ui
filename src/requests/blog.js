import axiosClient from '../utils/axiosClient';

export const postBlog = async (userId, blogData) => {
  console.log('post action called', blogData);
  try {
    const res = await axiosClient.post(
      `http://localhost:8080//post/new/${userId}`,
      blogData
    );
    return res.data;
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    // return {
    //   error: {
    //     status,
    //     data,
    //   },
    // };
    console.log(error);
  }
};
