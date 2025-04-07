import axios from "axios";

const BASE_URL = "http://localhost:8088/api/v1/outlet";

export const getAllOutlets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-outlets`);
    return response.data.data;
  } catch (error) {
    console.error(
        "Error fetching outlets:",
        error.response?.data || error.message
    );
    throw error;
  }
}

export const saveOutlet = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error saving outlet:", errorMessage);
    throw new Error(errorMessage); // This can be caught in OutletModal to display to the user
  }
};

export const getOutletOutletId = async (outId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-outlet-by-id`, {
      params: { "outlet-id": outId },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching outlet by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};
