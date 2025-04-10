import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/stock";

export const updateProductStock = async (updateDto) => {
  try {
    const response = await axios.put(`${BASE_URL}/by-outletId-productList`, updateDto);
    return response.data;
  } catch (error) {
    console.error(
      "Error update stock:",
      error.response?.data || error.message
    );
    throw error;
  }
};
