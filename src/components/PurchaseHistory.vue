<template>
    <div class="container">
      <h1 class="title">Purchase History</h1>
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
        <p class="no-history">No purchase history available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex'; // Import Vuex store
  import axios from 'axios'; // Import Axios here
  
  export default {
    name: 'PurchaseHistory',
    setup() {
      const invoices = ref([]);
      const store = useStore(); // Access the Vuex store

      
        console.log('User:', store.state.user);
        console.log('ID:', store.state.user.customerID);
  
      // Fetch user's invoices from the store
      const fetchInvoices = async () => {
        try {
            // Replace with your API endpoint to fetch user's invoices
            const response = await axios.get('http://localhost:8080/invoice/getAll');
            const allInvoices = response.data || []; // Provide a default empty array if data is undefined

            // Check if the user data is available
            const currentUserId = store.state.user.customerID;

            if (currentUserId !== undefined) {
            // Filter invoices by the current user's ID
            invoices.value = allInvoices.filter(
                (invoice) => invoice.sales.customer.customerID === currentUserId
            );
            } else {
            console.error('User data is not available in the store.');
            }
        } catch (error) {
            console.error('Error fetching user invoices:', error);
        }
};
  
      onMounted(() => {
        fetchInvoices();
      });
  
      return {
        invoices,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
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
  