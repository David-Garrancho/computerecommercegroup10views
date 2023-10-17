<template>
  <div>
    <h1 v-if="userDetails">
      Welcome, {{ userDetails.firstName }} {{ userDetails.lastName }}!
    </h1>
    <h1 v-else>Welcome</h1>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import authService from '../Services/authService.js';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CustomerDashboard',
  created() {
    const hasLoggedIn = localStorage.getItem('hasLoggedIn');
    
    if (!hasLoggedIn) {
      localStorage.setItem('hasLoggedIn', 'true');
      location.reload();
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let hasReloaded = false;

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

    const userDetails = ref(null);

    const fetchUserDetails = async () => {
      try {
        console.log('user email:', user.value);
        const response = await axios.get(`http://localhost:8080/user/${user.value}`);
        userDetails.value = response.data;
        console.log('user:', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    onMounted(() => {
      fetchUserDetails();

      if (hasReloaded && user.value) {
      hasReloaded = true; 
      location.reload();
    }
    });

    const logout = () => {
      authService.logout()
        .then(() => {
          store.commit('setUser', null);
          store.commit('setAuthState', false);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('hasLoggedIn');
          router.push('/login');
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
    };

    return { user, logout, userDetails };
  },
};
</script>
