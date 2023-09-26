// StoreDetailsService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/storeDetails';

class StoreDetailsService {
    getStoreDetails(){
        return axios.get(`${BASE_URL}/getAll`);
    }
}

export default new StoreDetailsService();