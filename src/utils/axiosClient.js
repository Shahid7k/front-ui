import axios from 'axios';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  headers,
});


const token="Bearer "+JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_AUTH)).token;
// console.log("TOKEN : ",token)
const tokenHead={
  Accept:'application/json',
  'Content-Type':'application/json',
  Authorization: token
}

export const tokenizedAxiosClient = axios.create({
  tokenHead,
});


export default axiosClient;
