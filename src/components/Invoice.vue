<template>
  <div>
    <h1>Invoice Details</h1>
    <div v-if="Object.keys(invoiceData).length > 0">
      <p>Invoice Number: {{ invoiceData.invoiceNumber }}</p>
      <p>Sales Number: {{ invoiceData.sales.saleID }}</p>
      <p>Date of Sale: {{ invoiceData.sales.saleDate }}</p>
      <p>VAT: <b>R {{ (invoiceData.sales.totalAmount - invoiceData.sales.totalAmountExclVat).toFixed(2) }}</b></p>
      <p>Total Amount (excl. Vat): <b>R {{ calculateTotalAmountExclVat() }}</b></p>
      <p>Total Amount (incl. Vat): <b>R {{ invoiceData.sales.totalAmount }}</b></p>
      <p>Store: {{ invoiceData.storeDetails.storeName }}</p>
      <p>Store Address: {{ invoiceData.storeDetails.address.streetAddress }}</p>
      <br>

      <h2>Products:</h2>
      <div class="invoice-list-container">
        <ul class="invoice-list">
          <li v-for="(salesItem, index) in invoiceData.salesItems" :key="index">
            <p v-for="(product, productIndex) in salesItem.products" :key="productIndex">
              <span class="product-name">Product: {{ product.productName }}</span>
              <span class="product-price">Price: R{{ product.productPrice }}</span>
              <span class="product-vat">VAT: R{{ (product.productPrice * 0.15).toFixed(2) }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Loading invoice details...</p>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'InvoiceView',
  data() {
    return {
      invoiceId: this.$route.params.invoiceId,
      invoiceData: {},
    };
  },
  created() {
    this.fetchInvoiceDetails();
  },
  methods: {
  async fetchInvoiceDetails() {
      try {
        const responseInvoice = await axios.get(`http://localhost:8080/invoice/read/${this.invoiceId}`);
        this.invoiceData = responseInvoice.data;

        const salesId = this.invoiceData.sales.saleID;
        const responseSalesItems = await axios.get(`http://localhost:8080/salesItem/findBySalesId/${salesId}`);
        this.invoiceData.salesItems = responseSalesItems.data;

        this.invoiceData.sales.totalAmountExclVat = this.calculateTotalAmountExclVat();

        const saleDate = new Date(this.invoiceData.sales.saleDate);
        const formattedDate = `${saleDate.getDate()} ${saleDate.toLocaleString('default', { month: 'short' })} ${saleDate.getFullYear()}`;
        this.invoiceData.sales.saleDate = formattedDate;
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      }
    },
    calculateTotalAmountExclVat() {
      let totalExclVat = 0;
      if (this.invoiceData.salesItems) {
        for (const salesItem of this.invoiceData.salesItems) {
          for (const product of salesItem.products) {
            totalExclVat += product.productPrice;
          }
        }
      }
      return totalExclVat.toFixed(2); // Format the result to two decimal places
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
  text-align: center;
}

.invoice-list-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Adjust alignment as needed */
  padding: 20px; /* Add padding for spacing */
}

.invoice-list {
  list-style-type: none;
  padding: 0;
  max-width: 400px; /* Adjust the maximum width as needed */
  width: 100%;
}

.invoice-list li {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #9e9e9e;
}

.invoice-list p {
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.product-name {
  font-weight: bold;
  color: rgb(237, 205, 42);
}

.product-price {
  font-weight: bold;
  color: rgb(32, 107, 212);
}

.product-vat {
  font-weight: bold;
  color: rgb(40, 255, 65);
}
</style>