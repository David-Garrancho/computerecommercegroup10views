<template>
    <div class="container">
      <h1 class="title">Orders</h1>
      <div v-if="invoices.length > 0">
        <ul class="invoice-list">
          <li v-for="invoice in invoices" :key="invoice.invoiceNumber" class="invoice-item">
            <router-link :to="`/invoice-view/${invoice.invoiceNumber}`" class="invoice-link">
              <div class="invoice-details">
                <h2 class="invoice-number">Invoice Number: {{ invoice.invoiceNumber }}</h2>
                <p class="invoice-amount">Total Amount: R {{ invoice.sales.totalAmount.toFixed(2) }}</p>
                <p class="customer-info">Customer: {{ invoice.sales.customer.firstName }} {{ invoice.sales.customer.lastName }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-history">No orders are available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'Order',
    setup() {
      const invoices = ref([]);
      const store = useStore();
      const customer = ref({
        customerID: null,
        firstName: '',
        lastName: '',
        email: '',
      });


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

  
const fetchInvoices = async () => {
  try {
    const response = await axios.get('http://localhost:8080/invoice/getAll');
    const allInvoices = response.data || [];

    console.log('Received allInvoices data:', allInvoices);
    invoices.value = allInvoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
};
  
    onMounted(async () => {
  await fetchUserDetails();
   fetchInvoices();
});
  
  return {
    invoices,
    customer,
    };
  },
};
  </script>
  
  <style scoped>
  .container {
  max-width: 450px; 
  margin: 0 auto;
  padding: 20px;
}

  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .invoice-list {
    list-style-type: none;
    padding: 0;
  }
  
  .invoice-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .invoice-link {
    text-decoration: none;
    color: #333;
  }
  
  .invoice-details {
    margin-left: 20px;
  }
  
  .invoice-number {
    font-size: 18px;
  }
  
  .invoice-date {
    font-style: italic;
  }
  
  .invoice-amount {
    font-weight: bold;
  }
  
  .customer-info {
    margin-top: 10px;
  }
  
  .no-history {
    font-style: italic;
  }
  </style>
  