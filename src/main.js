import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './Services/store.js';

const app = createApp(App);

const user = store.getters.getUser;
if (user) {
  store.commit('setAuthState', true);
}

store.dispatch('loadCartFromLocalStorage').then(() => {
  app.use(router);
  app.use(store);
  app.mount('#app');
});
