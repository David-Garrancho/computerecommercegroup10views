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
import { ref } from 'vue';
import authService from '../Services/authService.js';
import axios from 'axios';
import router from '../router';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        const loginData = {
          email: email.value,
          password: password.value,
        };

        const user = await authService.login(loginData);
        console.log('User logged in:', user);


        const tokenData = await fetchUserDetails();

        if (tokenData && tokenData.roleNames) {
        if (tokenData.roleNames.includes('CUSTOMER')) {
          router.push('/customerdashboard');
        } else if (tokenData.roleNames.includes('EMPLOYEE')) {
          router.push('/StockManagement');
            }
          }
      } catch (error) {
        console.error('An error occurred:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${email.value}`);
        const userTokenData = response.data;
        console.log('User details:', userTokenData);
        console.log('User role:', userTokenData.roleNames);
        localStorage.setItem('userRoles', JSON.stringify(userTokenData.roleNames));
        
        return userTokenData;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
      }
    };


    return { email, password, errorMessage, login };
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
