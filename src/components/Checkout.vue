<template>
  <div>
    <h1>Checkout</h1>
    <div class="cart-items">
      <div v-for="(item, index) in parsedCartItems" :key="index" class="cart-item">
        <h2>{{ item.productName }}</h2>
        <p>Type: {{ item.productType }}</p>
        <p>Description: {{ item.productDescription }}</p>
        <p>Price: R {{ item.productPrice }}</p>
      </div>
    </div>
    <div class="checkout-summary">
      <h2>Order Summary</h2>
      <div class="summary-item">
        <p>Subtotal:</p>
        <p>R {{ subtotal }}</p>
      </div>
      <div class="summary-item">
        <p>VAT (15%):</p>
        <p>R {{ vat }}</p>
      </div>
      <div class="summary-item">
        <p>Total:</p>
        <p>R {{ total }}</p>
      </div>
      <button @click="proceedToPayment">Pay Now</button>
    </div>
    <div class="store-details">
    <h2>Store Details</h2>
    <p>Store Name: {{ storeDetails.storeName }}</p>
    <p>Address: {{ storeDetails.address }}</p>
</div>
  </div>
</template>

<script>
import { createSalesRecord } from '../Services/SalesService';

export default {
  name: 'Checkout',
  props: {
    cartItems: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      subtotal: 0,
      vat: 0,
      total: 0,
    };
  },
  computed: {
    parsedCartItems() {
      try {
        return JSON.parse(this.cartItems);
      } catch (error) {
        console.error('Error parsing cartItems:', error);
        return [];
      }
    },
    ItemCount() {
      return this.$store.getters.ItemCount;
    },
  },
  created() {
    this.calculateSummary();
  },
  methods: {
    calculateSummary() {
      const subtotal = this.parsedCartItems.reduce((total, item) => total + item.productPrice, 0);
      const vat = subtotal * 0.15;
      this.vat = vat;
      this.subtotal = subtotal - this.vat;
      this.total = this.subtotal + this.vat;
    },
    async proceedToPayment() {
      try {
        // Prepare sales data
        const salesData = {
          saleDate: new Date().toISOString(),
          totalAmount: this.total,
          // Assuming you have the customer ID stored somewhere, replace 'CUSTOMER_ID' with the actual customer ID
          customerID: 'CUSTOMER_ID',
        };

        // Create the sales record
        const createdSales = await createSalesRecord(salesData);

        console.log('Sales record created:', createdSales);
      } catch (error) {
        console.error('Error creating sales record:', error);
      }
    },
  },
};
</script>

<style scoped>
.cart-items {
  float: left;
  width: 70%; 
}

.checkout-summary {
  float: right;
  width: 30%; 
  padding: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.summary-item {
  display: flex;
  justify-content: space-between;
}
</style>
