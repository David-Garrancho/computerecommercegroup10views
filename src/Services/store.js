import { createStore } from 'vuex';
import authService from './authService'; // Import your authentication service

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: false,
    cart: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user; // Update isAuthenticated based on user presence
    },
    setAuthState(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    addToCart(state, product) {
      state.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    resetCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('addToCart', product);
    },
    removeProductFromCart({ commit }, index) {
      commit('removeFromCart', index);
    },
    loadCartFromLocalStorage({ commit }) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        commit('setCart', cart);
      }
    },
    initializeCartFromLocalStorage({ commit }) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const cart = JSON.parse(cartData);
        commit('setCart', cart);
      }
    },
    resetCart({ commit }) {
      commit('resetCart');
    },
    // New action to handle user login
    async login({ commit }, { email, password }) {
      try {
        const accessToken = await authService.login(email, password); // Call your authentication service
        const user = await authService.getUserInfo(); // Call your authentication service to get user info

        // Commit mutations to update user and authentication state
        commit('setUser', user);
        commit('setAuthState', true);

        // Store the access token
        localStorage.setItem('accessToken', accessToken);

        // Return user for further use if needed
        return user;
      } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
        throw error;
      }
    },

    // New action to handle user logout
    async logout({ commit }) {
      try {
        await authService.logout(); // Call your authentication service to logout

        // Commit mutations to reset user and authentication state
        commit('setUser', null);
        commit('setAuthState', false);

        // Clear the access token
        localStorage.removeItem('accessToken');
      } catch (error) {
        // Handle logout error
        console.error('Logout failed:', error);
        throw error;
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated, // New getter to check if the user is authenticated
    cartItemCount: (state) => state.cart.length,
    cartItems: (state) => state.cart,
  },
});

export default store;
