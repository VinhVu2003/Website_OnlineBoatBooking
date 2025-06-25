import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export async function findAllRoomByBoatId(id) {
    try {
        const response = await axios.get(`${API_URL}/room/getall/${id}`);
        // console.log(response.data); // Kết quả trả về từ API
        return response.data; // Trả về danh sách khách hàng
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
  }
  
  export async function getallRoom() {
    try {
        const response = await axios.get(`${API_URL}/room`);
        // console.log(response.data); // Kết quả trả về từ API
        return response.data; // Trả về danh sách khách hàng
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
  }

  export async function addRoomAndPrice(room) {
    try {
        const response = await axios.post(`${API_URL}/room/createwithprice`, room);
        return response.data;
    } catch (error) {
        console.error('Error adding room:', error);
        return [];
    }
  }
  export async function updateRoomAndPrice(id,room) {
    try {
        const response = await axios.put(`${API_URL}/room/updatewithprice/${id}`, room);
        return response.data;
    } catch (error) {
        console.error('Error updating room:', error);
        return [];
    }
  }
  export async function deleteRoom(id) {
    try {
        const response = await axios.delete(`${API_URL}/room/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting room:', error);
        return [];
    }
  }
 