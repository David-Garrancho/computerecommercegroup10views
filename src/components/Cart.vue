<template>
  <div class="cart">
    <h1>Cart</h1>
    <p><b>Total Items in Cart: {{ cartItemCount }}</b></p>
    <p><b>Total Cost: R {{ cartTotal }}</b></p>
    <button @click="proceedToCheckout">Proceed to Checkout</button>
    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
      <h2>{{ item.productName }}</h2>
      <p>Type: {{ item.productType }}</p>
      <p>Description: {{ item.productDescription }}</p>
      <p>Price: R {{ item.productPrice }}</p>
      <button @click="removeFromCart(index)">Remove from Cart</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
    cartTotal() {
      const cartItems = this.cartItems;
      return cartItems.reduce((total, item) => total + item.productPrice, 0);
    },
  },
  methods: {
    removeFromCart(index) {
      this.$store.dispatch('removeProductFromCart', index);
    },
    proceedToCheckout() {
      console.log('Cart Items:', this.cartItems);
      this.$router.push({ name: 'Checkout', query: { cartItems: JSON.stringify(this.cartItems) } });
    },
  },
  created() {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      try {
        const cartItems = JSON.parse(cartItemsString);
        this.$store.dispatch('setCartItems', cartItems);
      } catch (error) {
        console.error('Error parsing cartItems:', error);
      }
    }
  },
};
</script>
