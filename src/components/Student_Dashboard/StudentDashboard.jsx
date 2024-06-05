import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../Dashboard";

const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Display toast when notifications change
    notifications.forEach((notification) => {
      toast.info(
        <div onClick={() => handleNotificationClick(notification)}>
          {notification.title}
        </div>,
        { autoClose: 3000 }
      );
    });
  }, [notifications]);

  const handleNotificationClick = () => {
    // Navigate to /notifications when a toast is clicked
    navigate("/notifications");
  };

  const cards = [
    {
      image:
        "https://img.freepik.com/free-vector/competent-resume-writing-professional-cv-constructor-online-job-application-profile-creation-african-american-woman-filling-up-digital-form-concept-illustration_335657-2053.jpg?t=st=1717146650~exp=1717150250~hmac=418967f7967eb53f9a283fa2fa379a43dc6813d523ebc759a5b9f48840537b0d&w=740",
      title: "My Profile",
      description: "View and update your profile information.",
      buttonText: "Go to Profile",
      link: "/student_profile",
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg?w=740&t=st=1717146244~exp=1717146844~hmac=41e2fcdef80c2cffdfa50e20fee9dc3ea2e859b2384b0f3e5d0b7a10b03ae6ad",
      title: "My Courses",
      description: "View your enrolled courses and grades.",
      buttonText: "View Courses",
      link: "/user_profile",
    },
    {
      image:
        "https://img.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg?t=st=1717146308~exp=1717149908~hmac=188717a9343218b0e2761fb9b34ef6a1f66aa859532cfa51815583f473f45f42&w=740",
      title: "My Schedule",
      description: "View your class schedule and upcoming events.",
      buttonText: "View Schedule",
      link: "/student_schedule",
    },
    {
      image:
        "https://img.freepik.com/free-photo/3d-render-hand-with-pencil-put-marks-calendar_107791-15908.jpg?t=st=1717146396~exp=1717149996~hmac=ca16b5c5ede8fbbd40839f09d9671a7664cf20793e41463a1d3d30b02e2a02c4&w=740",
      title: "Attendance",
      description: "Check your attendance record.",
      buttonText: "Check Attendance",
      link: "/student_attendance_record",
    },
    {
      image:
        "https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?t=st=1717146454~exp=1717150054~hmac=ef35e130b0ed9283c9c13af8625d385ca84c09436f51c054baa3d31cf1e961b9&w=740",
      title: "Assignments",
      description: "View and submit assignments.",
      buttonText: "View Assignments",
      link: "/student_assignment",
    },
    {
      image:
        "https://img.freepik.com/free-vector/online-certification-with-smartphone_23-2148571385.jpg?t=st=1717146570~exp=1717150170~hmac=028407c7036005de45c351e19134fe539af38b2fc6aa025611145e89006511ec&w=740",
      title: "Notifications",
      description: "Check important notifications.",
      buttonText: "View Notifications",
      link: "/notifications",
    },
  ];

  return (
    <>
      <Dashboard title="Student Dashboard" cards={cards} />;
      <ToastContainer className="mt-5" />
    </>
  );
};

export default StudentDashboard;
