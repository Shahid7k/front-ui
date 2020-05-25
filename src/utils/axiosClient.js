import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosClient = axios.create({
  headers,
});

export default axiosClient;
