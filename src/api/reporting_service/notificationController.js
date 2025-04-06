import axios from "axios";

const BASE_URL = "http://localhost:8087/api/v1/notifications";

// Corrected API request function
export const saveNotification = async (notificationDTO, isNotify) => {
    try {
        const response = await axios.post(
            BASE_URL, // Endpoint URL (no outletId in path, as it's a POST)
            notificationDTO, // Send the NotificationDTO as the request body
            {
                params: {
                    isNotify: isNotify, // Sending isNotify as a query parameter
                },
            }
        );
        console.log("API response:", response.data); // Debugging line
        return response.data.data; // Assuming the response structure includes a 'data' field
    } catch (error) {
        console.error(
            "Error saving notification:",
            error.response?.data || error.message
        );
        throw error; // Re-throwing the error to propagate it if needed
    }
};

// Function to get notifications by outletId
export const getNotificationsByOutletId = async (outletId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/${outletId}`, // Endpoint URL with outletId in path
        );
        console.log("API response:", response.data); // Debugging line
        return response.data.data; // Assuming the response structure includes a 'data' field
    } catch (error) {
        console.error(
            "Error fetching notifications:",
            error.response?.data || error.message
        );
        throw error; // Re-throwing the error to propagate it if needed
    }
};