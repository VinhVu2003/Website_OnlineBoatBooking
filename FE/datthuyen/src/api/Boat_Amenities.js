import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export async function GetAllBoat_AmenitiesByBoatID(id) {
    try {
        const response = await axios.get(`${API_URL}/boatAmenities/${id}`); // Dùng URL cơ bản và endpoint cho từng API
        return response.data;   
      } catch (error) {
        console.error('Error fetching boat_amenities data:', error);
        throw error; // Ném lỗi ra để xử lý ở ngoài nếu cần
      }
}
export async function Add_Arr_Boat_Amenities(id, amenityIds) {
    try {
        const response = await axios.post(`${API_URL}/boatAmenities/${id}`, { AmenityIds: amenityIds });
        return response.data;
    } catch (error) {
        console.error('Error adding boat_amenities:', error);
        throw error;
    }
}
export async function UpdateBoat_Amenities(id, amenitiesValues, schedule) {
    try {
        const response = await axios.put(`${API_URL}/boatAmenities/${id}`, { amenitiesValues, schedule });
        return response.data;
    } catch (error) {
        console.error('Error updating boat_amenities:', error);
        throw error;
    }
}
