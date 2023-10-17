import { createStore } from 'vuex';
import authService from './authService';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: false,
    cart: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
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

    logout({ commit }) {
      try {
        // Call the logout method from authService to clear the token
        authService.logout();
  
        // Clear the user data and authentication state
        commit('setUser', null);
        commit('setAuthState', false);
  
        // Remove the Authorization header from Axios
        delete axios.defaults.headers.common['Authorization'];
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    cartItemCount: (state) => state.cart.length,
    cartItems: (state) => state.cart,
  },
});

export default store;
