import axios from "axios";

const user_service="http://localhost:3000";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${user_service}/api/v1/auth/login`, {
      username,
      password,
    });
    return response.data; // This should return the token
  } catch (error) {
    throw error.response ? error.response.data : "Login failed";
  }
};



