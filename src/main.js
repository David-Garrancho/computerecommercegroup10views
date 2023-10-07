import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './Services/store.js';
import authService from './Services/authService.js';
import axios from 'axios';

axios.interceptors.request.use(config => {
  const token = authService.getCurrentUserJwt();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Authorization Token in Request:', config.headers.Authorization);
  return config;
});

authService.setAuthInterceptor();

const app = createApp(App);

const token = authService.getCurrentUserJwt();
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

store.dispatch('loadCartFromLocalStorage').then(() => {
  app.use(router);
  app.use(store);
  app.mount('#app');
});
