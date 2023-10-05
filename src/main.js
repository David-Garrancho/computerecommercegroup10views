import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './Services/store.js';
import authService from './Services/authService.js';
import axios from 'axios';

// Set up Axios interceptor to add Authorization header
axios.interceptors.request.use(config => {
  const user = authService.getCurrentUserJwt();
  if (user && user.jwt) {
    const token = `Bearer ${user.jwt}`;
    config.headers.Authorization = token;
  }
  return config;
});

// Call setAuthInterceptor to add the interceptor
authService.setAuthInterceptor();

// Initialize your Vue app
const app = createApp(App);

// Load the token from localStorage (if available) and set it in the default Axios headers
const token = authService.getCurrentUserJwt();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Dispatch the loadCartFromLocalStorage action and then mount the app
store.dispatch('loadCartFromLocalStorage').then(() => {
  app.use(router);
  app.use(store);
  app.mount('#app');
});
