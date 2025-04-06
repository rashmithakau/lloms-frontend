import axios from "axios";

// Base URL for your API (adjust port if different)
const API_BASE_URL = "http://localhost:8088";

export const saveReturn = async (outletReturnDTO) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/save/outlet-return`,
      outletReturnDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error saving return:", error);
    throw error;
  }
};