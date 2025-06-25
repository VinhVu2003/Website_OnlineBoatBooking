// src/api/staffAPI.js
import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

// Hàm lấy danh sách nhân viên
export const fetchStaffData = async () => {
  try {
    const response = await axios.get(`${API_URL}/staff`); // Dùng URL cơ bản và endpoint cho từng API
    return response.data;
  } catch (error) {
    console.error('Error fetching staff data:', error);
    throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
  }
};

// Hàm thêm mới nhân viên
export const APIaddStaff = async (newStaff) => {
  // console.log('Sending staff data:', newStaff); 
  try {
    const response = await axios.post(`${API_URL}/staff`, newStaff); // Gửi dữ liệu nhân viên mới qua phương thức POST
    console.log('API response status:', response.status); // Kiểm tra mã trạng thái trả về từ API
    console.log('API response data:', response.data); // Kiểm tra dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error adding new staff:', error);
    throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
  }
};

// Hàm xóa nhân viên
export const APIdeleteStaff = async (staffId) => {
  try {
    const response = await axios.delete(`${API_URL}/staff/${staffId}`); // Gửi yêu cầu DELETE đến endpoint với ID nhân viên
    console.log('API response status:', response.status); // Kiểm tra mã trạng thái trả về từ API
    console.log('Deleted staff data:', response.data); // Kiểm tra dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
  }
};

// Hàm sửa thông tin nhân viên
export const APIupdateStaff = async (staffId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/staff/${staffId}`, updatedData); // Gửi yêu cầu PUT với ID và dữ liệu mới
    console.log('API response status:', response.status);
    console.log('API response data:', response.data);
    return response.data; // Trả về dữ liệu trả về từ API nếu thành công
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
  }
};
