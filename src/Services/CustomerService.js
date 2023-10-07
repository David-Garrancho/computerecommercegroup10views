import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';

class CustomerService {
  getCustomers() {
    return axios.get(`${BASE_URL}/getAll`);
  }

  registerCustomer(userData) {
    return axios.post(`${BASE_URL}/register`, userData);
  }

  authenticateCustomer(userData) {
    return axios.post(`${BASE_URL}/authenticate`, userData);
  }

  updateCustomer(userData) {
    return axios.post(`${BASE_URL}/update`, userData);
  }

  deleteCustomer(){
    return axios.post(`${BASE_URL}/delete`, userData);
  }

}

export default new CustomerService();
