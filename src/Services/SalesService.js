// salesService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/sales';

export async function createSalesRecord(salesData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, salesData);
    return response.data;
  } catch (error) {
    console.error('Error creating sales record:', error);
    throw error;
  }
}
