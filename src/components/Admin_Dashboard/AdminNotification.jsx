import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:3000/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/notifications", notification);
      alert("Notification saved successfully!");
      setNotification({ title: "", message: "" });
      fetchNotifications();
    } catch (error) {
      console.error("Error saving notification: ", error);
      alert("Failed to save notification. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notifications/${id}`);
      alert("Notification deleted successfully!");
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification: ", error);
      alert("Failed to delete notification. Please try again later.");
    }
  };

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center">Manage Notifications</h2>
      <form onSubmit={handleSubmit} className="mx-auto col-md-8">
        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            name="title"
            value={notification.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="messageInput" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="messageInput"
            name="message"
            value={notification.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn my-btn2">
            Save Notification
          </button>
        </div>
      </form>
      <div className="margin-top-bottom">
        <h3 className="text-center m-4">Notifications</h3>
        <div className="d-flex gap-4 flex-wrap align-content-center justify-content-around">
          {notifications.map((item) => (
            <Toast key={item.id} className="d-flex justify-content-around p-2">
              <div>
                <ToastHeader>{item.title}</ToastHeader>
                <ToastBody>{item.message}</ToastBody>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => handleDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </Toast>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
