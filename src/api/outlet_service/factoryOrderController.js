import axios from "axios";

const BASE_URL = "http://localhost:8082/api/v1/fac-order";

export const saveFacOrder = async (facOrder) => {
  try {
    const response = await axios.post(`${BASE_URL}`, facOrder);  // Removed trailing slash
    return response.data;
  } catch (error) {
    console.error("Error saving factory order:", error.response?.data || error.message);
    throw error;  
  }
};
