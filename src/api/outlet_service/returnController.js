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
