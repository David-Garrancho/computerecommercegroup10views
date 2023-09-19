<template>
  <div>
    <h1>{{ user.firstName }}'s Checkout</h1>
    <h2>!All prices are excluding VAT!</h2>

    <div class="checkout-content">
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

        <div class="store-selection">
          <label for="store">Select a Store:</label>
          <select v-model="selectedStore" id="store">
            <option value="" disabled>Please select a store</option>
            <option v-for="store in storeDetails" :key="store.storeID" :value="store">
              {{ store.storeName }}
            </option>
          </select>
        </div>

        <button @click="proceedToPayment">Pay Now</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { createSalesRecord } from '../Services/SalesService';
import { createSalesItem } from '../Services/SalesItemService';
import { createInvoice } from '../Services/InvoiceService';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

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
      invoiceId: this.$route.params.invoiceId,
      invoiceData: {},
    };
  },


  setup(props) {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.getters.getUser);
    const storeDetails = ref([]);
    const selectedStore = ref(null); // Define selectedStore here

    const parsedCartItems = computed(() => {
      try {
        return JSON.parse(props.cartItems);
      } catch (error) {
        console.error('Error parsing cartItems:', error);
        return [];
      }
    });

    const subtotal = computed(() => {
      return parsedCartItems.value.reduce((total, item) => total + item.productPrice, 0);
    });

    const vat = computed(() => {
      return subtotal.value * 0.15;
    });

    const total = computed(() => {
      return subtotal.value + vat.value;
    });

    const fetchProduct = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:8080/product/read/${productId}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return null;
      }
    };

    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/storeDetails/getAll');
        storeDetails.value = response.data;
        console.log('Fetched store details:', storeDetails.value);
      } catch (error) {
        console.error('Error fetching store details:', error);
      }
    };

    onMounted(async () => {
      await fetchStoreDetails();
    });

    const proceedToPayment = async () => {
      try {
        const userData = user.value;

        if (!storeDetails.value) {
          console.error('Store details are empty. Please check the fetchStoreDetails function.');
          return;
        }

        if (!selectedStore.value) {
          console.error('Please select a store before proceeding with payment.');
          return;
        }
        if (!userData) {
          console.error('User data not found.');
          return;
        }

        const products = [];

        for (const cartItem of parsedCartItems.value) {
          if (!cartItem.productID) {
            console.warn('Skipping cart item with missing productID:', cartItem);
            continue;
          }

          const existingProduct = await fetchProduct(cartItem.productID);

          if (existingProduct) {
            products.push(existingProduct);
          } else {
            console.error(`Product not found for cart item with ID ${cartItem.productID}`);
          }
        }

        const subtotalValue = products.reduce((total, product) => total + product.productPrice, 0);
        const vatValue = subtotalValue * 0.15;
        const totalAmount = subtotalValue + vatValue;

        const salesData = {
          saleDate: new Date().toISOString(),
          customer: userData,
          totalAmount,
        };

        const createdSales = await createSalesRecord(salesData);

        console.log('Sales record created:', createdSales);

        const salesId = createdSales.saleID;

        console.log('Parsed cart items:', parsedCartItems.value);

        const salesItemData = {
          sales: createdSales,
          products: parsedCartItems.value,
          quantity: 2,
        };
        
        const salesItemResponse = await createSalesItem(salesItemData);

        console.log('SalesItem record created:', salesItemResponse);

        const invoiceData = {
          storeDetails: selectedStore.value, // Use the selected store
          sales: createdSales,
        };

        const createdInvoice = await createInvoice(invoiceData);

        console.log('Invoice record created:', createdInvoice);
        
        store.dispatch('resetCart');

        router.push(`/invoice-view/${createdInvoice.invoiceNumber}`);
  
    } catch (error) {
        console.error('Error in proceedToPayment:', error);
      }
    };

    return {
      user,
      parsedCartItems,
      subtotal,
      vat,
      total,
      proceedToPayment,
      storeDetails,
      selectedStore,
    };
  },
  computed: {
    ItemCount() {
      return this.$store.getters.ItemCount;
    },
  },
};
</script>

<style scoped>
.checkout-content {
  display: flex;
  justify-content: space-between;
}

.cart-items {
  width: 65%; /* Adjust the width as needed */
}

.checkout-summary {
  width: 30%; /* Adjust the width as needed */
  padding: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.store-selection {
  margin-top: 10px;
  text-align: center;
}

label {
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>