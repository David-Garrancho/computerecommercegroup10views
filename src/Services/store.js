import { createStore } from 'vuex';

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
  },
  getters: {
    getUser: (state) => state.user,
    cartItemCount: (state) => state.cart.length,
    cartItems: (state) => state.cart,
  },
});

export default store;
