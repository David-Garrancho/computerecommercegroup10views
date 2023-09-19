<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <!-- Conditionally show login and register links based on user login status -->
      <template v-if="!user">
        | <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
      <!-- Conditionally show Customer Dashboard and Logout when the user is logged in -->
      <template v-if="user">
        | <router-link to="/customerdashboard">Customer Dashboard</router-link>
        | <router-link to="/product">Products</router-link> 
        | <router-link to="/cart">Cart ({{ cartItemCount }})</router-link> <!-- Display cart item count -->
        | <router-link to="/customeraccount">Account</router-link>
        | <router-link to="/purchaseHistory">Purchase History</router-link>
        | <button @click="logout">Logout</button>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Cart from './components/Cart.vue'; // Import the Cart component

export default {
  name: 'App',
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    cartItemCount() {
      // Compute the cart item count based on the length of the cart array
      return this.$store.state.cart.length;
    },
  },
  methods: {
    logout() {
      this.$store.commit('setUser', null);
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
    toggleCart() {
      // Implement a method to open/close the cart overlay
      // You can use Vuex to manage the cart state
    },
  },
  components: {
    Cart, // Register the Cart component for use in this template
  },
  data() {
    return {
      isCartOpen: false, // Initialize the cart state as closed
    };
  },
  created() {
    // Dispatch the action to load cart data from local storage
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
