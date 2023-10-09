<template>
    <div class="product-reviews">
      <h1 class="page-title">Product Reviews</h1>
      <h2 class="product-title">Product: {{ productName }}</h2>
  
      <form @submit.prevent="submitReview" class="review-form">
        <h3 class="form-title">Write a Review</h3>
        <div class="form-group">
          <label for="rating" class="form-label">Rating:</label>
          <input type="number" id="rating" v-model="newReview.rating" min="1" max="5" required class="form-input">
          <label>/5</label>
        </div>
        <button type="submit" class="form-button">Submit Review</button>
      </form>
  
      <div v-if="reviews.length > 0" class="reviews-container">
        <div v-for="review in reviews" :key="review.reviewID" class="review-item">
          <p class="customer-info">{{ getCustomerInfo(review.customer) }} gave this product:</p>
          <p class="rating">{{ review.rating }}/5 Stars</p>
        </div>
      </div>
      <div v-else>
        <p class="no-reviews">No reviews available for this product.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { computed, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const route = useRoute();
  
      const reviews = ref([]);
      const productId = ref(null);
      const productName = ref('');
      const newReview = ref({
        rating: 1,
        reviewText: '',
      });
  

      const productObject = ref(null);
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
  
      const getReviews = () => {
        console.log('Fetching reviews for product ID:', productId.value);
  
        axios
          .get(`http://localhost:8080/review/getAll`)
          .then((response) => {
            reviews.value = response.data.filter(
              (review) => review.product.productID === Number(productId.value)
            );
            console.log('Received filtered reviews data:', reviews.value);
          })
          .catch((error) => {
            console.error('Failed to fetch reviews:', error);
          });
      };
  
      const getProductName = () => {
        axios
          .get(`http://localhost:8080/product/read/${productId.value}`)
          .then((response) => {
            productName.value = response.data.productName;
            console.log('Received product name:', productName.value);
          })
          .catch((error) => {
            console.error('Failed to fetch product name:', error);
          });
      };
  
      const getCustomerInfo = (customer) => {
        if (customer && customer.firstName && customer.lastName) {
          return `${customer.firstName} ${customer.lastName}`;
        }
        return 'Anonymous Customer';
      };
  
      const fetchProductObject = () => {
        axios
          .get(`http://localhost:8080/product/read/${productId.value}`)
          .then((response) => {
            productObject.value = response.data;
            console.log('Received product object:', productObject.value);
          })
          .catch((error) => {
            console.error('Failed to fetch product object:', error);
          });
      };
  
      const submitReview = () => {
        if (productId.value && productObject.value) {
          console.log('Submitting review for product ID:', productId.value);
          console.log('Review data:', {
            product: productObject.value,
            rating: newReview.value.rating,
            customer: customer.value,
          });
  
          axios
            .post('http://localhost:8080/review/create', {
              product: productObject.value,
              rating: newReview.value.rating,
              customer: customer.value,
            })
            .then((response) => {
              newReview.value.rating = 1;
              getReviews();
              console.log('Review submitted successfully:', response.data);
            })
            .catch((error) => {
              console.error('Failed to submit review:', error);
            });
        } else {
          console.error('productId is null or undefined');
        }
      };
  
      onMounted(() => {
        productId.value = route.params.productId;
        console.log('productId:', productId.value);
        getProductName();
        getReviews();
        fetchProductObject();
        fetchUserDetails(); // Fetch user details on component mount
      });
  
      return {
        reviews,
        productId,
        productName,
        newReview,
        submitReview,
        getCustomerInfo,
        productObject,
      };
    },
  };
  </script>
  
  
  
  <style scoped>
  .product-reviews {
    padding: 20px;
    text-align: center;
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .product-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .review-form {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    text-align: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    margin: 20px auto;
  }
  
  .form-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .form-label {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    margin-left: 5px;
    max-width: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .form-button:hover {
    background-color: #0056b3;
  }
  
  .reviews-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .review-item {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 400px;
  text-align: left;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
}

.rating {
  font-size: 18px;
  font-weight: bold;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

  
  .customer-info {
    margin-top: 10px;
    font-style: italic;
  }
  
  .no-reviews {
    font-style: italic;
  }
  </style>