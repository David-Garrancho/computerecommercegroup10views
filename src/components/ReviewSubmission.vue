<template>
  <div>
    <h2>Submit a Review</h2>
    <form @submit.prevent="submitReview">
      <label for="rating">Rating (1-5):</label>
      <input type="number" id="rating" v-model="newReview.rating" min="1" max="5" required>
      <label for="reviewText">Review:</label>
      <textarea id="reviewText" v-model="newReview.reviewText" required></textarea>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

export default {
  data() {
    return {
      newReview: {
        rating: 1,
        reviewText: '',
      },
    };
  },
  setup() {
    const newReview = ref({
      rating: 1,
      reviewText: '',
    });
    const customer = ref(null);


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
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
      onMounted(() => {
        fetchUserDetails();
      });

    const submitReview = () => {
      const reviewData = {
        rating: newReview.value.rating,
        reviewText: newReview.value.reviewText,
        customer: {
          customerID: customer.value.customerID,
          firstName: customer.value.firstName,
          lastName: customer.value.lastName,
          email: customer.value.email,
          password: customer.value.password,
        },
      };

      axios
        .post('http://localhost:8080/review/create', reviewData)
        .then((response) => {
          console.log('Review submitted successfully:', response.data);
          newReview.value = {
            rating: 1,
            reviewText: '',
          };
        })
        .catch((error) => {
          console.error('Failed to submit review:', error);
        });
    };

    return {
      newReview,
      customer,
      submitReview,
    };
  },
};
</script>

  
  