import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/outlet";

export const getAllOutlets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-outlets`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching outlets:",
      error.response?.data || error.message
    );
    throw error;
  }
};
