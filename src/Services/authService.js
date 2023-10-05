import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/authenticate`, { email, password });
  
      console.log('API Response:', response); // Log the entire response object
  
      if (response.status === 200 && response.data && response.data.jwt) {
        const token = response.data.jwt;
        localStorage.setItem('jwt', token);
  
        return { user: response.data, accessToken: token };
      } else {
        throw new Error('Invalid response from the server');
      }
    } catch (error) {
      // Handle errors here, e.g., log them or display a user-friendly error message
      console.error('Login error:', error);
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
    localStorage.removeItem('jwt');
  },

  getCurrentUserJwt: () => {
    const jwt = localStorage.getItem('jwt');
    return jwt || null;
  },

  setAuthInterceptor() {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('jwt'); // Retrieve the token from storage
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