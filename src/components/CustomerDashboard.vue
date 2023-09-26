<template>
  <div>
    <h1 v-if="user">{{ `Welcome, ${user.firstName} ${user.lastName}!` }}</h1>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import authService from '../Services/authService.js';
import { useRouter } from 'vue-router';

export default {
  name: 'CustomerDashboard',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const router = useRouter(); 

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

    return { user, logout };
  },
};
</script>

