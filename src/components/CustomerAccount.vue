<template>
    <div class="container">
      <div>
        <h1>Account Information</h1>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="editedUser.firstName" class="form-input" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="editedUser.lastName" class="form-input" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editedUser.email" class="form-input" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="editedUser.password" class="form-input" />
        </div>
  
        <button @click="saveChanges">Save Changes</button>
  
        <button @click="deleteAccount">Delete</button>
      </div>
    </div>
  </template>
  
  
  <script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import authService from '../Services/authService.js';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CustomerAccount',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const router = useRouter();

    const editedUser = computed(() => ({ ...user.value }));

    if (!user.value) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        store.commit('setUser', userData);
      }
    }

    const logout = () => {
      authService.logout()
        .then(() => {
          store.commit('setUser', null);
          store.commit('setAuthState', false);
          localStorage.removeItem('user');
          router.push('/login');
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
    };

    const saveChanges = () => {
      axios.put(`http://localhost:8080/customer/update`, editedUser.value)
        .then(response => {
          if (response.status === 200) {
            store.commit('setUser', { ...editedUser.value });
            localStorage.setItem('user', JSON.stringify(editedUser.value));
            console.log('Changes saved successfully!');
          } else {
            console.error('Failed to update user information:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Failed to save changes:', error);
        });
    };

    const deleteAccount = () => {
      console.log('Delete button clicked');
      console.log('user.value:', user.value);

      const userId = user.value.customerID; 

      console.log('user.id:', userId);

      axios
        .delete(`http://localhost:8080/customer/delete/${userId}`)
        .then(() => {
          logout();
          console.log("User deleted successfully");
        })
        .catch((error) => {
          console.error('Failed to delete account:', error);
        });
    };

    return { user, editedUser, logout, saveChanges, deleteAccount };
  },
};
</script>
  
  <style scoped>
  
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
  }
  
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
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  label {
    flex: 1;
    text-align: right;
    margin-right: 10px;
  }
  
  .form-input {
    flex: 2;
    max-width: 200px;
    width: 100%;
    padding: 10px;
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
    margin: 5px;
  }
  
  button:hover {
    background-color: #8780e8;
  }
  
  .login {
    margin-top: 20px;
  }
  
  input::placeholder {
    color: #aaa;
  }
  </style>
  