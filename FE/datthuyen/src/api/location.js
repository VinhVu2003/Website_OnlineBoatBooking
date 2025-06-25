import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export async function GetAllLocation() {
    try {
        const response = await axios.get(`${API_URL}/location`, {
            name: " ", // Truyền giá trị cứng rỗng
        });
        // console.log(response.data); // Kết quả trả về từ API
        return response.data; 
    } catch (error) {
        console.error('Error fetching location:', error);
        return [];
    }
  }