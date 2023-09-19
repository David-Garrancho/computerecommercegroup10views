//AddressService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/address';

class AddressService {
    getAddress(){
        return axios.get(`${BASE_URL}/getAll`);
    }
}

export default new AddressService();