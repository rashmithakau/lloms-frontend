import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/fac-order";

export const saveFacOrder = async (facOrder) => {
  try {
    const response = await axios.post(BASE_URL, facOrder);
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
    const response = await axios.get(BASE_URL, { params: { status } });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching factory orders:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFacOrderItemsByFacOrId = async (facOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/items`, { params: { facOrId } });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching factory order items:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateFacOrderStatusById = async (facOrId, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/status`, null, {
      params: { facOrId, status },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating factory order status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFacOrdersById = async (facOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/byId`, { 
      params: { facOrId }, // ✅ Correctly placed params
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching factory order by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};



