import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export const createIntroduceBoat = async (newIntroduce) => {
    try {
      const response = await axios.post(`${API_URL}/introduceBoat/create`, newIntroduce); // Gửi dữ liệu nhân viên mới qua phương thức POST
      console.log('API response status:', response.status); // Kiểm tra mã trạng thái trả về từ API
      console.log('API response data:', response.data); // Kiểm tra dữ liệu trả về từ API
      return response.data;
    } catch (error) {
      console.error('Error adding new introduce:', error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
};
export const getAllIntroduceBoats = async () => {
    try {
      const response = await axios.get(`${API_URL}/introduceBoat/getall`); // Gửi yêu cầu lấy tất cả dữ liệu giới thiệu thuyền
      console.log('API response status:', response.status); // Kiểm tra mã trạng thái trả về từ API
      console.log('API response data:', response.data); // Kiểm tra dữ liệu trả về từ API
      return response.data;
    } catch (error) {
      console.error('Error fetching all introduce boats:', error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
};

export const API_updateIntroduceBoat = async (updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/introduceBoat/update`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating introduce boat:', error);
      throw error;
    }
};


export const API_getByBoatID = async (boatid) => {
  try {
    const response = await axios.get(`${API_URL}/introduceBoat/getById/${boatid}`);
    return response.data;
  } catch (error) {
    console.error('Error updating introduce boat:', error);
    throw error;
  }
};

