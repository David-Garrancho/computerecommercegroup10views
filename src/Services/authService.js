import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';

const authService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/authenticate`, loginData);

      if (response && response.data) {
        console.log(response.data);
        const newToken = response.data;
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('user', JSON.stringify(newToken));
        return response.data.user;
      } else {
        throw new Error('Invalid response from the server');
      }
    } catch (error) {
      throw error;
    }
  },
  
  getAuthorizationHeader() {
    const token = this.getCurrentUserJwt();
    return token ? `Bearer ${token}` : '';
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
  },

  getCurrentUserJwt: () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken || null;
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  setAuthInterceptor() {
    axios.interceptors.request.use((config) => {
      const token = authService.getCurrentUserJwt();
      const token = authService.getCurrentUserJwt();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

};

export default authService;



