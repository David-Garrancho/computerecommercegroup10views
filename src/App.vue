<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <template v-if="!user">
        | <router-link to="/login">Login</router-link> 
        | <router-link to="/register">Register</router-link>
      </template>
      <template v-if="user">
        <template v-if="userRoles.includes('CUSTOMER')">
          | <router-link to="/customerdashboard">Customer Dashboard</router-link>
          | <router-link to="/enquiry">Enquiry</router-link>
          | <router-link to="/product">Products</router-link> 
          | <router-link to="/cart">Cart ({{ cartItemCount }})</router-link>
          | <router-link to="/customeraccount">Account</router-link>
          | <router-link to="/purchaseHistory">Purchase History</router-link>
        </template>
        <template v-if="userRoles.includes('EMPLOYEE')">
          | <router-link to="/StockManagement">Stock</router-link>
          | <router-link to="/EnquiriesList">Enquiries</router-link>
          | <router-link to="/OrderList">Orders</router-link>
          | <router-link to="/StoreCreation">Store Details</router-link>
        </template>
        | <button @click="logout">Logout</button>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userRoles() {
      return JSON.parse(localStorage.getItem('userRoles'));
    },
    cartItemCount() {
      return this.$store.state.cart.length;
    },
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/login');
    },
    logout() {
      this.$store.commit('setUser', null);
      this.$store.commit('resetCart');
      localStorage.removeItem('hasLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRoles');
      this.$router.push('/login');
    },
    toggleCart() {

    },
  },
  mutations: {
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
  },
  data() {
    return {
      isCartOpen: false,
    };
  },
  created() {
    this.$store.dispatch('loadCartFromLocalStorage');
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  padding: 5px 10px;
  background-color: #d52121;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  color: rgb(221, 255, 0);
  background-color: #e27f7f;
}
</style>
