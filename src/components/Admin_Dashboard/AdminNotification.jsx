import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const API_URL = "http://localhost:3000/notifications";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    role: "student", // Default role set to "student"
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(API_URL);
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
      await axios.post(API_URL, notification);
      alert("Notification saved successfully!");
      setNotification({ title: "", message: "", role: "student" }); // Reset role after submission
      fetchNotifications();
    } catch (error) {
      console.error("Error saving notification: ", error);
      alert("Failed to save notification. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
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
        <div className="mb-3">
          <label htmlFor="roleSelect" className="form-label">
            Role:
          </label>
          <select
            className="form-select"
            id="roleSelect"
            name="role"
            value={notification.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn my-btn2">
            Save Notification
          </button>
        </div>
      </form>

      {/* Notifications card  */}

      <div className="col-md-10 col-lg-12 mx-auto">
        {/* Notifications for student */}

        <div className="margin-top-bottom">
          <h3 className="text-center m-4">Student Notifications</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {notifications
              .filter((item) => item.role === "student")
              .map((item) => (
                <div
                  key={item._id}
                  className="col d-flex justify-content-around"
                >
                  <Toast className="d-flex justify-content-evenly align-items-center p-2">
                    <div>
                      <ToastHeader icon="primary">{item.title}</ToastHeader>
                      <ToastBody>{item.message}</ToastBody>
                    </div>
                    <div className="mb-4">
                      <button
                        className="btn btn-sm btn-danger me-2 mb-5"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </Toast>
                </div>
              ))}
          </div>
        </div>

        {/* Notification for Faculty  */}
        <div className="m-4">
          <h3 className="text-center m-4">Faculty Notifications</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {notifications
              .filter((item) => item.role === "faculty")
              .map((item) => (
                <div
                  key={item._id}
                  className="col d-flex justify-content-around"
                >
                  <Toast className="d-flex justify-content-between align-items-center p-2">
                    <div>
                      <ToastHeader icon="info">{item.title}</ToastHeader>
                      <ToastBody>{item.message}</ToastBody>
                    </div>
                    <div className="mb-4">
                      <button
                        className="btn btn-sm btn-danger me-2 mb-5"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </Toast>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
