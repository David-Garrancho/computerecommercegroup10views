<template>
  <div>
    <h1>Products</h1>
    <h2>All prices exclude 15% VAT</h2>
    <div v-for="product in products" :key="product.productID" class="product">
      <h2>{{ product.productName }}</h2>
      <p>Type: {{ product.productType }}</p>
      <p>Description: {{ product.productDescription }}</p>
      <p>Price: R{{ product.productPrice }}</p>
      <p :style="{ color: product.isStock ? 'green' : 'red' }">Stock: {{ product.isStock ? 'Available' : 'Unavailable' }}</p>
      <button @click="addToCart(product)" :style="{ backgroundColor: product.isStock ? 'green' : 'gray' }" :disabled="!product.isStock">Add to Cart</button>
      <router-link :to="`/product/reviews/${product.productID}`" class="reviews-button">See Reviews</router-link>
    </div>
  </div>
</template>




<script>
import ProductService from '../Services/ProductService.js';
import axios from 'axios';

export default {
  name: 'ProductsView',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
  },
  methods: {
    getProducts() {
      ProductService.getProducts()
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch product data:', error);
        });
    },
    addToCart(product) {
      this.$store.dispatch('addProductToCart', product);
    },
    removeFromCart(index) {
      this.$store.dispatch('removeProductFromCart', index);
    },
  },
};
</script>

<style scoped>
.product {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

.cart-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

.reviews-button {
  color: #007BFF; 
  text-decoration: none; 
  background-color: #f0f0f0; /* Add a background color to make it look like a button */
  padding: 5px 10px; /* Add padding for spacing */
  border: 1px solid #007BFF; /* Add a border to make it look like a button */
  cursor: pointer;
  margin-left: 10px; /* Add some spacing between buttons */
}
</style>
