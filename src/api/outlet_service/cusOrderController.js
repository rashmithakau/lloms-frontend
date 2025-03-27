import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/cus-order";

export const saveCusOrder = async (cusOrder) => {
  try {
    const response = await axios.post(`${BASE_URL}`, cusOrder);  
    return response.data;
  } catch (error) {
    console.error("Error saving customer order:", error.response?.data || error.message);
    throw error;  
  }
};


