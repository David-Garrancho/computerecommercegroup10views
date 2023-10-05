// salesItemService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/salesItem';

export async function createSalesItem(salesItemData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, salesItemData);
    return response.data;
  } catch (error) {
    console.error('Error creating sales item:', error);
    throw error;
  }
}