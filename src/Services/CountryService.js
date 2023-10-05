//CountryService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/country';

class CountryService {
    getCountry(){
        return axios.get(`${BASE_URL}/getAll`);
    }
}

export default new CountryService();