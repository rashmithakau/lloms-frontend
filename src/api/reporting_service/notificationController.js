import axios from "axios";

const BASE_URL = "http://localhost:8087/api/v1/notifications";

export const getNotificationsByOutletId = async (outletId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${outletId}`);
      console.log("API response:", response.data); // Debugging line
      return response.data.data; // Assuming your response structure includes a 'data' field
    } catch (error) {
      console.error(
        "Error fetching notifications by outlet ID:",
        error.response?.data || error.message
      );
      throw error; // Re-throwing the error to propagate it if needed
    }
  };