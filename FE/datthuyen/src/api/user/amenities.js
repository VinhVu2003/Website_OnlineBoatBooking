import axios from 'axios';
import API_URL from '../../config/apiConfig'; // Import URL từ cấu hình

export async function GetAllAr_Amenities() {
    try {
        const response = await axios.get(`${API_URL}/amenities`); // Dùng URL cơ bản và endpoint cho từng API
        return response.data;   
      } catch (error) {
        console.error('Error fetching staff data:', error);
        throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
      }
}