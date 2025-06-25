import axios from "axios";
import API_URL from "../config/apiConfig"; // Import URL từ cấu hình

export async function getallBoatUser() {
  try {
    const response = await axios.get(`${API_URL}/boat/procedure/all`, {
      name: " ", // Truyền giá trị cứng rỗng
    });
    // console.log(response.data); // Kết quả trả về từ API
    return response.data; // Trả về danh sách khách hàng
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

export async function getBoatByIdUser(id) {
  try {
    const response = await axios.get(`${API_URL}/boat/procedure/${id}`);
    // console.log(response.data); // Kết quả trả về từ API
    return response.data; // Trả về danh sách khách hàng
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

// Hàm thêm mới boat
export const API_addBoat = async (boat) => {
  // console.log('Sending staff data:', newStaff);
  try {
    const response = await axios.post(`${API_URL}/boat`, boat); // Gửi dữ liệu nhân viên mới qua phương thức POST
    console.log("API response status:", response.status); // Kiểm tra mã trạng thái trả về từ API
    console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error("Error adding new staff:", error);
    throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
  }
};

export async function API_DeleteBoat(id) {
  try {
    const response = await axios.delete(`${API_URL}/boat/${id}`);
    console.log(response.data); // Kết quả trả về từ API
    return response.data; // Trả về danh sách khách hàng
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
}

export const API_UpdateBoat = async (boat) => {
  try {
    const response = await axios.put(`${API_URL}/boat/${boat.ID}`, boat);
    return response.data;
  } catch (error) {
    console.error("Error updating boat:", error);
    throw error;
  }
};

