import axiosClient, {tokenizedAxiosClient} from '../utils/axiosClient';

export const getUserById = async userId => {
  console.log('get (getUserById) action called');
  try {
    const res = await axiosClient.get(`http://localhost:8080/user/${userId}`);
    // console.log(res.data);
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
};

export const editUser = async (userId, userData) => {
  console.log('put (editUser) action called');
  console.log(userData);
  try {
    const res = await tokenizedAxiosClient.put(
      `http://localhost:8080/user/${userId}`,
      userData
    );
    console.log(res);
    return { data: res.data };
  } catch (error) {
    const {
      response: { data, status },
    } = error;
    return { error: { status, data } };
  }
};
