<template>
  <form @submit.prevent="login">
    <h1>Login</h1>
    <input type="text" placeholder="Email" v-model="email" autofocus>
    <input type="password" placeholder="Password" v-model="password" autocomplete="current-password">
    <button type="submit">Login</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </form>
</template>

<script>
import authService from '../Services/authService.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
  try {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    const response = await authService.login(loginData);

    console.log('Response from server:', response);

    this.$router.push('/customerdashboard');
    
  } catch (error) {
    this.errorMessage = 'Login failed. Please check your credentials.';
    console.error('An error occurred:', error);
  }
},

  },
};
</script>




<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #544db0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #8780e8;
}

form {
  max-width: 300px;
  margin: 0 auto;
}

.login {
  margin-top: 20px;
}

input::placeholder {
  color: #aaa;
}
</style>
