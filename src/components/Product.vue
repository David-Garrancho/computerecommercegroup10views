<template>
      <div v-for="product in products" :key="product.productID" class="product">
          <h2>{{ product.productName }}</h2>
          <p>Type: {{ product.productType }}</p>
          <p>Description: {{ product.productDescription }}</p>
          <p>Price: R {{ product.productPrice }}</p>
          <p>Stock: {{ product.isStock ? 'Available' : 'Unavailable' }}</p>

          <button @click="addToCart(product)">Add to Cart</button>
    </div>
</template>

<script>
import ProductService from '../Services/ProductService.js';

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
</style>
