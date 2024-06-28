import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast, ToastBody, ToastHeader, Button, Spinner } from "reactstrap";
import { useUser } from "../context/UserContext";
import { API_URL } from "../constants";

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
        `${API_URL}/api/notifications/${userData.role}`
      );
      // const filteredNotifications = response.data.filter(
      //   (notification) => notification.role === userData.role
      // );

      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom min-vh-100">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="container min-vh-100" style={{ marginTop: "180px" }}>
      <h2 className="text-center display-6 mb-5">Notifications</h2>
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
