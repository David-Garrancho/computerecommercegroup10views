import axios from 'axios';

const BASE_URL = 'http://localhost:8080/product';

class ProductService {
  getProducts() {
    return axios.get(`${BASE_URL}/getAll`);
  }

  getProductById(productId) {
    return axios.get(`${BASE_URL}/${productId}`);
  }

  updateStock(product) {
    return axios.put(`${BASE_URL}/update`, product);
  }
}

export default new ProductService();
