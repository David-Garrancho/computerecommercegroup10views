<template>
    <div>
      <h1>Stock Management</h1>
      <div v-for="product in products" :key="product.productID" class="product">
        <h2>{{ product.productName }}</h2>
        <p>Type: {{ product.productType }}</p>
        <p>Description: {{ product.productDescription }}</p>
        <p>Price: R {{ product.productPrice }}</p>
        <p>Stock: {{ product.isStock ? 'Available' : 'Unavailable' }}</p>
        <label for="inStock">In Stock:</label>
        <select v-model="product.editedProduct.isStock">
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <button @click="editProduct(product)">Edit</button>
        <button @click="saveChanges(product)">Save Changes</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'StockManagement',
    data() {
      return {
        products: [],
      };
    },
    mounted() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        axios
          .get('http://localhost:8080/product/getAll')
          .then((response) => {
            this.products = response.data.map((product) => ({
              ...product,
              editedProduct: {
                ...product,
              },
            }));
          })
          .catch((error) => {
            console.error('Failed to fetch products:', error);
          });
      },
      editProduct(product) {
        axios
          .get(`http://localhost:8080/product/read/${product.productID}`)
          .then((response) => {
            product.editedProduct = {
              ...response.data,
            };
  
            console.log('Edited product:', product.editedProduct);
          })
          .catch((error) => {
            console.error('Failed to fetch product details:', error);
          });
      },
      saveChanges(product) {
        console.log('Edited product:', product.editedProduct);
        axios
            .put('http://localhost:8080/product/update', product.editedProduct)
            .then((response) => {
            if (response.status === 200) {
                console.log('Product changes saved successfully!');
                window.location.reload();
            } else {
                console.error('Failed to update product information:', response.status, response.statusText);
            }
            })
            .catch((error) => {
            console.error('Failed to save product changes:', error);
            });
        },
    },
  };
  </script>
  