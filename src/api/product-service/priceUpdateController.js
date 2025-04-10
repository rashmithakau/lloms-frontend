import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/price";

export const getAllInactivePrices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/status`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updatePriceStatus = async (productId, price, date, status) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/status/${productId}/${price}/${date}/${status}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deletePriceStatus = async (productId, price, date) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/status/${productId}/${price}/${date}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
