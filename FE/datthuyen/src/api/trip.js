import axios from 'axios';
import API_URL from '../config/apiConfig'; // Import URL từ cấu hình

export const API_GetTripWithBoatID = async (boatID) => {
  try {
    const response = await axios.get(`${API_URL}/trip/${boatID}`);
    return response.data;
  } catch (error) {
    console.error('Error adding new trip:', error);
    throw error;
  }
};
export const API_CreateTrip = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/trip`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding new trip:', error);
    throw error;
  }
};
export const API_UpdateTrip = async (tripID, data) => {
  try {
    const response = await axios.put(`${API_URL}/trip/${tripID}`,data);
    return response.data;
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

export const API_TripGetall = async () => {
  try {
    const response = await axios.get(`${API_URL}/trip/getall`);
    return response.data.trips;
  } catch (error) {
    console.error('Error adding new trip:', error);
    throw error;
  }
};
