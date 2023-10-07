import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error);
    // Handle the error, e.g., display a user-friendly error message
    return Promise.reject(error);
  }
);

export default instance;