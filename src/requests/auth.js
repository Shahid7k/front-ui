import axios from 'axios';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const signInUser = async data => {
  console.log('action called', data);
  try {
    const res = await axios.post('http://localhost:8080/signin', data, {
      headers,
    });
    return res.data;
  } catch (error) {
    // const {
    //   response: { status, data },
    // } = error;
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
  delete axios.defaults.headers.common['x-auth-token'];
};
