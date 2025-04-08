import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/return";

export const saveReturn = async (returnDTO) => {
  try {
    const response = await axios.post(`${BASE_URL}`, returnDTO);
    return response.data.data; // or return the full response based on your need
  } catch (error) {
    console.error(
      "Error saving return:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const getAllReturnsNotPending = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-not-pending`);
      return response.data.data; // Extracts only the `data` field from StandardResponse
    } catch (error) {
      console.error(
        "Error fetching non-pending returns:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
