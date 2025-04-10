import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/cus-order";

export const saveCusOrder = async (cusOrder) => {
  try {
    const response = await axios.post(`${BASE_URL}`, cusOrder);
    return response.data;
  } catch (error) {
    console.error(
      "Error saving customer order:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllCusOrderByOutlet = async (outletId) => {
  try {
    const response = await axios.get(`${BASE_URL}/all-by-outlet/${outletId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching customer orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCusOrderItemsByCusOrId = async (cusOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/items`, {
      params: { cusOrId },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching customer order items:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllCusOrderByOutletAndDate = async (outletId, date) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/all-by-outlet-date/${outletId}/${date}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching customer orders",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllCusOrderByOutletAndYearAndMonth = async (
  outletId,
  year,
  month
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/all-by-outlet-year-month/${outletId}/${year}/${month}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching customer orders",
      error.response?.data || error.message
    );
    throw error;
  }
};
