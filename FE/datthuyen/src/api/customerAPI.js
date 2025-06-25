import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export async function GetAllCustomer() {
  try {
      const response = await axios.get(`${API_URL}/customer/getall`);
      console.log(response.data); // Kết quả trả về từ API
      return response.data; // Trả về danh sách khách hàng
  } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
  }
}

