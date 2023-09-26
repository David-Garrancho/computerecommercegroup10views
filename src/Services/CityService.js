//CityService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/city';

class CityService {
    getCity(){
        return axios.get(`${BASE_URL}/getAll`);
    }
}

export default new CityService();