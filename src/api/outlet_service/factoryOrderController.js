import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/fac-order";

export const saveFacOrder = async (facOrder) => {
  try {
    const response = await axios.post(`${BASE_URL}`, facOrder);
    return response.data;
  } catch (error) {
    console.error(
      "Error saving factory order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFacOrdersByStatus = async (status) => {
  try {
    const response = await axios(`${BASE_URL}?status=${status}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFacOrderItemsByFacOrId = async (facOrId) => {
  try {
    const response = await axios(`${BASE_URL}/items?facOrId=${facOrId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
