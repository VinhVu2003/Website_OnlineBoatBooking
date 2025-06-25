import axios from 'axios';
import API_URL from '../../config/apiConfig'; // Import URL từ cấu hình

export const getBoatAmenities = async (amenityIds) => {
  try {
    const response = await axios.get(`${API_URL}/boatAmenities/amenity/${amenityIds}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boat amenities:", error);
    throw error;
  }
};
