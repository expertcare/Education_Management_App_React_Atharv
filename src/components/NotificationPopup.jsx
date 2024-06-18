import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast, ToastBody, ToastHeader, Button, Spinner } from "reactstrap";
import { useUser } from "../context/UserContext";

const NotificationPopup = () => {
  const { userData } = useUser();

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://education-management-server-ruby.vercel.app/api/notifications"
      );
      const filteredNotifications = response.data.filter(
        (notification) => notification.role === userData.role
      );
      setNotifications(filteredNotifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

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
