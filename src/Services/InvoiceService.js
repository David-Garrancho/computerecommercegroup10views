// invoiceService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/invoice';

export async function createInvoice(invoiceData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}
