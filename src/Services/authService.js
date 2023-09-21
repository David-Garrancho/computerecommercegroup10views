import axios from 'axios';
import store from './store';

const BASE_URL = 'http://localhost:8080';

const authService = {
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token;
  },

  async login(email, password, userType) {
    try {
      const response = await axios.post(`${BASE_URL}/${userType}/login`, { email, password });
      const user = response.data;
  
      user.role = userType;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', userType); // Store the user type

      store.commit('setUser', user);
  
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  async logout() {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userType'); // Remove the stored user type

      return Promise.resolve(); 
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
};

export default authService;
