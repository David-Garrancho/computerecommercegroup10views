import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/authenticate`, { email, password });
  
      console.log('Response from server:', response);
  
      if (response && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
  
        return { accessToken: response.data.accessToken };
      } else {
        throw new Error('Invalid response from the server');
      }
    } catch (error) {
      throw error;
    }
  },
  

  signUp: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
  },

  getCurrentUserJwt: () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('Retrieved token from local storage:', accessToken);
    return accessToken || null;
  },

  setAuthInterceptor() {
    axios.interceptors.request.use((config) => {
      const token = authService.getCurrentUserJwt();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  },
};

export default authService;

























/*const authService = {
  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  },

  async login(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/authenticate`, { email, password });
      const accessToken = response.data.accessToken;

      // Store the access token securely in localStorage
      localStorage.setItem('accessToken', accessToken);

      return accessToken;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  async logout() {
    try {
      localStorage.removeItem('accessToken');
      return Promise.resolve(); 
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
};*/