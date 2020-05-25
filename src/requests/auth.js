import axios from 'axios';

export const signUpUser = async data => {
  console.log('action called', data);
  try {
    const res = await axios.post('http://localhost:8080/signup', data);
    return { data: res.data };
  } catch (error) {
    const {
      response: { status, data },
    } = error;
    return {
      error: {
        status,
        data,
      },
    };
  }
};

export const signInUser = async data => {
  console.log('action called', data);
  try {
    const res = await axios.post('http://localhost:8080/signin', data);
    return res.data;
  } catch (error) {
    const {
      response: { status, data },
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

export const logout = () => {
  delete axios.defaults.headers.common['Authorization'];
};
