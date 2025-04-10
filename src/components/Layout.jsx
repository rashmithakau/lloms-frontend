import Sidebar from "./Sidebar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { toast, Toaster } from 'react-hot-toast';  // Import Toaster here


const Layout = ({ children , navItemList=[], user="Mathara Outlet"}) => {

  useEffect(() => {
    // Connect to the WebSocket for real-time notifications
    const socket = new SockJS('http://localhost:8087/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      stompClient.subscribe('/topic/notifications', (notification) => {
        const newNotification = JSON.parse(notification.body);
        
        // Show the notification using react-hot-toast
        toast.success(`New Notification: ${newNotification.message}`, {
          duration: 5000,  // Set how long the toast stays visible
          position: 'top-right',
        });
      });
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      stompClient.disconnect();
    };
  }, []);

  const { username,outletId } = useContext(AuthContext);
  
  console.log("username:", username);
  console.log("outletId:", outletId);
  const sliderExpandWidth = 90;
  const sliderNotExpandWidth = 16;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={username}
         sliderExpandWidth={sliderExpandWidth} 
         sliderNotExpandWidth={sliderNotExpandWidth} 
         navItemList={navItemList} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 bg-gray-50 m-0 ${
          isSidebarOpen
            ? `pl-90`
            : `pl-16`
        }`}
      >
        <main className="px-5 py-2 bg-white h-full">{children}</main>
      </div>

      {/* ToastContainer to display notifications */}
      <Toaster />
    </div>
  );
};

export default Layout;
