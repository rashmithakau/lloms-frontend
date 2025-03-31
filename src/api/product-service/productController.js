import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/product";

export const getAllProducts = async () => {
  try {
    const response = await axios(`${BASE_URL}/all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const getAllProductsByOutletId = async (outletId) => {
  try {
    const response = await axios(`${BASE_URL}/get-by-outlet?id=${outletId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAllProductsForOutlet = async (outletId) => {
  try {
    const response = await axios(
      `${BASE_URL}/get-all-for-outlet?id=${outletId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response; // Returning the response so Item.jsx can handle it
  } catch (error) {
    throw error; // Throwing error so Item.jsx can catch and handle it
  }
};

