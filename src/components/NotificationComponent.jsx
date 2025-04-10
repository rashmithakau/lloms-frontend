import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket for real-time notifications
    const socket = new SockJS('http://localhost:8087/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      stompClient.subscribe('/topic/notifications', (notification) => {
        const newNotification = JSON.parse(notification.body);
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      });
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>User {notification.userId}:</strong> {notification.message} <br />
            <small>{new Date(notification.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
