//VuexStore.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userRoles: [],
  },
  mutations: {
    setUser(state, user) {
        state.user = user;
        if (user && user.roleNames) {
          state.userRoles = user.roleNames;
        } else {
          state.userRoles = [];
        }
    },
    setUserRoles(state, roles) {
      state.userRoles = roles;
    },
  },
  actions: {
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getUserRoles(state) {
      return state.userRoles;
    },
  },
});