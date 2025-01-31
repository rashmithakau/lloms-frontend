import React, { useState } from "react";
import { Bell } from "lucide-react";
import NotificationWindow from "../NotificationWindow"; // Import NotificationWindow

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = ["New order received!", "Payment confirmed", "Server maintenance at 2 AM"];

  const toggleNotifications = () => {
    setIsOpen(true);
  };

  const closeNotifications = () => {
    setIsOpen(false);
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
