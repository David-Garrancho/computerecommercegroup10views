import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router configuration
import store from './Services/store.js'; // Import the Vuex store

const app = createApp(App);

// Check if the user is already logged in
const user = store.getters.getUser;
if (user) {
  store.commit('setAuthState', true); // Set the authentication state to true
}

// Dispatch the action to load cart data from local storage
store.dispatch('loadCartFromLocalStorage').then(() => {
  app.use(router);
  app.use(store);
  app.mount('#app');
});
