import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

const NotificationWindow = ({ notifications, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Auto-close after 5 seconds
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-6 right-6 w-96 bg-pink-100/90 backdrop-blur-xl border border-pink-300 rounded-2xl shadow-2xl p-6 z-[1000]" // 🔥 High z-index here!
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-pink-300 pb-3">
            <div className="flex items-center gap-2 text-pink-700">
              <Bell className="w-7 h-7 text-pink-500 animate-bounce" />
              <h3 className="font-semibold text-xl">Notifications</h3>
            </div>
            <button
              onClick={onClose}
              className="text-pink-500 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Notification List */}
          <ul className="mt-4 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-3 py-4 px-5 bg-pink-200 rounded-lg mb-2 shadow-sm hover:bg-pink-300 transition cursor-pointer"
                >
                  <span className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></span>
                  {notification}
                </motion.li>
              ))
            ) : (
              <li className="text-pink-600 text-sm text-center py-6">
                No new notifications
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationWindow;
