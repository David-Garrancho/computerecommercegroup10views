<template>
    <div>
      <h1>Registration</h1>
      <form @submit.prevent="registerUser">
        <input v-model="firstName" type="text" placeholder="First Name" required>
        <input v-model="lastName" type="text" placeholder="Last Name" required>
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="password" type="password" placeholder="Password" required autocomplete="current-password">
        <button type="submit">Register</button>
       </form>

      <p v-if="registrationError">{{ registrationError }}</p>
      <p v-if="registrationSuccess">{{ registrationSuccess }}</p>
    </div>
  </template>
  
  <script>
  import CustomerService from '../Services/CustomerService';
  
  export default {
    name: 'register',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        registrationError: '',
        registrationSuccess: '',
      };
    },
    methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validatePassword(password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      return passwordRegex.test(password);
    },
    async registerUser() {
      try {
        if (!this.validateEmail(this.email)) {
          this.registrationError = 'Please enter a valid email address.';
          return;
        }
        if (!this.validatePassword(this.password)) {
          this.registrationError = 'Password must be at least 8 characters long and include at least 1 symbol and 1 capital letter.';
          return;
        }

        const userData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };
        const response = await CustomerService.registerCustomer(userData);

        this.registrationSuccess = 'Registration successful!';
        this.registrationError = '';
        this.$router.push('/login');
      } catch (error) {
        this.registrationError = 'Registration failed. Please try again.';
        this.registrationSuccess = '';
        console.log(error);
      }
    },
  },
};
</script>
  
  
  <style scoped>
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
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #33804a;
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
  