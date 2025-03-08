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


 
