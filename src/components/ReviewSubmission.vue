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
  
  export default {
    data() {
      return {
        newReview: {
          rating: 1,
          reviewText: '',
        },
      };
    },
    methods: {
      submitReview() {
        axios.post('http://localhost:8080/review/create', this.newReview)
          .then((response) => {
            console.log('Review submitted successfully:', response.data);
            this.newReview = {
              rating: 1,
              reviewText: '',
            };
          })
          .catch((error) => {
            console.error('Failed to submit review:', error);
          });
      },
    },
  };
  </script>
  
  