import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { useUser } from "../context/UserContext";

const NotificationPopup = () => {
  const { userData } = useUser();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications");
      const filteredNotifications = response.data.filter(
        (notification) => notification.role === userData.role
      );
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center mb-5">Notifications</h2>
      <div className="d-flex gap-4 flex-wrap  align-content-center justify-content-around">
        {notifications.map((notification) => (
          <Toast key={notification._id} className="p-2">
            <ToastHeader icon="primary">{notification.title}</ToastHeader>
            <ToastBody>{notification.message}</ToastBody>
          </Toast>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopup;
