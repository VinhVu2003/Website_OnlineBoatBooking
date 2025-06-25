import axios from 'axios';
import API_URL from '../../config/apiConfig'; // Import URL từ cấu hình



  export const API_getAllBookingbyBoatID = async (id) => {
    // console.log('Sending staff data:', newStaff);
    try {
      const response = await axios.get(`${API_URL}/booking/getbyBoatID/${id}`); // Gửi dữ liệu nhân viên mới qua phương thức POST
      // console.log("API response status:", response.status); // Kiểm tra mã trạng thái trả về từ API
      // console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
      return response.data;
    } catch (error) {
      console.error("Error adding new staff:", error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
  };

  export const API_GetallBooking = async () => {
    // console.log('Sending staff data:', newStaff);
    try {
      const response = await axios.get(`${API_URL}/booking/getAll`); // Gửi dữ liệu nhân viên mới qua phương thức POST
      // console.log("API response status:", response.status); // Kiểm tra mã trạng thái trả về từ API
      // console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
      return response.data.data;
    } catch (error) {
      console.error("Error adding new staff:", error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
  };

  export const API_UpdateStatusBooking = async (data) => {
    // console.log('Sending staff data:', newStaff);
    try {
      const response = await axios.put(`${API_URL}/booking/updatestatus`,data); // Gửi dữ liệu nhân viên mới qua phương thức POST
      // console.log("API response status:", response.status); // Kiểm tra mã trạng thái trả về từ API
      // console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
      return response.data.data;
    } catch (error) {
      console.error("Error adding new staff:", error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
  };

  export const API_GetAllBookingDetailByBookingID = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/booking/getallbookingdetails/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching booking data:", error);
      throw error;
    }
  };

  export const API_ThongKe = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/booking/getBookingStatistics`, data); 
      return response.data.data;
    } catch (error) {
      console.error("Error fetching booking statistics:", error);
      throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
    }
  };
  

