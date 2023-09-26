<template>
  <div>
    <h1>Stock Management</h1>

    <form @submit.prevent="addProduct" class="product-form">
      <label for="productName">Product Name:</label>
      <input v-model="newProduct.productName" type="text" id="productName" required>

      <label for="productType">Product Type:</label>
      <input v-model="newProduct.productType" type="text" id="productType" required>

      <label for="productDescription">Product Description:</label>
      <textarea v-model="newProduct.productDescription" id="productDescription" rows="4" required></textarea>

      <label for="productCostPrice">Product Cost Price:</label>
      <input v-model="newProduct.productCostPrice" type="number" id="productCostPrice" required>

      <label for="productPrice">Product Price:</label>
      <input v-model="newProduct.productPrice" type="number" id="productPrice" required>

      <label for="isStock">In Stock:</label>
      <select v-model="newProduct.isStock" id="isStock">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <button type="submit">Add Product</button>
    </form>

    <div v-for="product in products" :key="product.productID" class="product">
      <h2>{{ product.productName }}</h2>
      <p>Type: {{ product.productType }}</p>
      <p>Description: {{ product.productDescription }}</p>
      <p>Price: R {{ product.productPrice }}</p>
      <p>Cost price: R {{ product.productCostPrice }}</p>
      <p>Stock: {{ product.isStock ? 'Available' : 'Unavailable' }}</p>
      <label for="inStock">In Stock:</label>
      <select v-model="product.editedProduct.isStock" id="inStock">
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
      <button @click="saveChanges(product)">Save Changes</button>
      <button @click="deleteProduct(product.productID)">Delete</button>
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
        newProduct: {
          productName: '',
          productType: '',
          productDescription: '',
          productCostPrice: 0,
          productPrice: 0,
          isStock: true,
        },
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
        
      addProduct() {
        axios.post('http://localhost:8080/product/create', this.newProduct)
        .then((response) => {
          if (response.status === 200) {
            console.log('Product added successfully!');
            this.getProducts();
          } else {
            console.error('Failed to add product:', response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error('Failed to add product:', error);
        });
      },

      deleteProduct(productID) {
      axios
        .delete(`http://localhost:8080/product/delete/${productID}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('Product deleted successfully!');
            this.getProducts();
          } else {
            console.error('Failed to delete product:', response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error('Failed to delete product:', error);
        });
      },
    },
  };
  </script>
  
  <style>
  .product-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .product-form label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .product-form input[type="text"],
  .product-form input[type="number"],
  .product-form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .product-form input[type="text"],
  .product-form input[type="number"] {
    max-width: 300px;
  }

  .product-form textarea {
    width: calc(100% - 15px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  }

  .product-form button[type="submit"] {
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .product-form button[type="submit"]:hover {
    background-color: #0056b3;
  }

  .product {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .product h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .product p {
    margin-bottom: 5px;
  }

  .product button {
    margin-right: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .product button:hover {
    background-color: #0056b3;
  }
</style>
