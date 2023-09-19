import axios from 'axios';

const BASE_URL = 'http://localhost:8080/product';

const ProductService = {

  getProducts: () => {
    return axios.get(`${BASE_URL}/getAll`);
  },
  getProductById: (productId) => {
    return axios.get(`${BASE_URL}/${productId}`);
  },

};

export default ProductService;
