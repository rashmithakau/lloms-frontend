import React, { useState } from "react";
import { Bell } from "lucide-react";
import NotificationWindow from "../NotificationWindow"; // Import NotificationWindow
import { getNotificationsByOutletId } from "../../api/reporting_service/notificationController"; // Adjust the import path as necessary
import { useContext } from "react";
import AuthContext from "../../context/AuthContext"; // Adjust the import path as necessary

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const {outletId} = useContext(AuthContext);

  const toggleNotifications = () => {
    fetchNotifications(outletId); // Dynamically pass the outletId
    setIsOpen(true);
  };

  const closeNotifications = () => {
    setIsOpen(false);
  };

  

  const fetchNotifications = async (id) => {
    try {
      const fetchedNotifications = await getNotificationsByOutletId(id);
      console.log("Fetched Notifications:", fetchedNotifications);
  
      // Sort by date descending (latest first), then format the date nicely
      const arrDisp = fetchedNotifications
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((item) => {
          const formattedDate = new Date(item.date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          return item.message+`[`+formattedDate+`]`;
        });
  
      setNotifications(arrDisp);
    } catch (error) {
      console.error("Error in fetching notifications:", error);
    }
  };
  


  
  

  return (
    <div className="relative">
      {/* Bell Icon Button (Smaller Size) */}
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full bg-gray-200 hover:bg-pink-500 transition duration-300 relative"
      >
        <Bell className="w-5 h-5 text-gray-600 hover:text-white transition duration-300" />
        
        {/* Notification Badge (Smaller) */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Window */}
      <NotificationWindow notifications={notifications} isOpen={isOpen} onClose={closeNotifications} />
    </div>
  );
};

export default NotificationButton;
