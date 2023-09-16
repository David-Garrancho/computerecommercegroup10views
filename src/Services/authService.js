// authService.js

import axios from 'axios';
import store from './store';

const BASE_URL = 'http://localhost:8080/customer';

const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      const user = response.data;
  
      localStorage.setItem('user', JSON.stringify(user));
  
      store.commit('setUser', user);
  
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  async logout() {
    try {
      localStorage.removeItem('access_token');

      return Promise.resolve(); 
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
};

export default authService;
