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

      <button @click="saveChanges">Save Changes</button>

      <button @click="deleteAccount">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'AccountPage',
  setup() {
    const store = useStore();
    const customer = ref(null);
    const editedUser = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

    const getTokenData = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const tokenParts = accessToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('Token payload:', payload);
          return payload.sub;
        }
      }
      return null;
    };

    const user = computed(() => {
      const tokenData = getTokenData();
      return tokenData ? tokenData : null;
    });

    const fetchUserDetails = async () => {
      try {
        console.log('user email:', user.value);
        const response = await axios.get(`http://localhost:8080/user/${user.value}`);
        customer.value = response.data;
        console.log('user:', customer.value);

        editedUser.value = { ...customer.value };
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    onMounted(() => {
      fetchUserDetails();
    });

    const saveChanges = () => {
      axios
        .put(`http://localhost:8080/user/update`, editedUser.value)
        .then((response) => {
          if (response.status === 200) {
            store.commit('setUser', { ...editedUser.value });
            localStorage.setItem('user', JSON.stringify(editedUser.value));
            console.log('Changes saved successfully!');
          } else {
            console.error('Failed to update user information:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Failed to save changes:', error);
        });
    };

    const logout = () => {
    this.$store.commit('resetCart');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    this.$router.push('/login');
  };


    const deleteAccount = () => {
    const userId = customer.value.customerID;
    console.log("user Id: ", userId);

    axios
      .delete(`http://localhost:8080/user/delete/${userId}`)
      .then(() => {
        console.log('User deleted successfully');
        logout();
      })
      .catch((error) => {
        console.error('Failed to delete account:', error);
      });
  };




    return { editedUser, saveChanges, deleteAccount };
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
  