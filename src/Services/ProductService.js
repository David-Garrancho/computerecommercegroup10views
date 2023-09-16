import axios from 'axios';

const BASE_URL = 'http://localhost:8080/product';

const ProductService = {

  getProducts: () => {
    return axios.get(`${BASE_URL}/getAll`);
  },

};

export default ProductService;
