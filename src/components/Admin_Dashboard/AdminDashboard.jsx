import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";

const AdminDashboard = () => {
  const cards = [
    {
      image:
        "https://img.freepik.com/free-vector/hand-drawn-remote-recruitment-illustration_52683-143681.jpg?w=740&t=st=1717476289~exp=1717476889~hmac=c6efa2376f510650b0c37c4f66b14d827fd5c48ca81d5da4e3e82886e4affb63",
      title: "Manage Users",
      description: "View user accounts.",
      buttonText: "Manage Users",
      link: "/admin/user_list", // Update the link path
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-stacked-books-graduation-cap-open-book-education-day_23-2149241017.jpg?w=740&t=st=1717146244~exp=1717146844~hmac=41e2fcdef80c2cffdfa50e20fee9dc3ea2e859b2384b0f3e5d0b7a10b03ae6ad",
      title: "Manage Courses",
      description: "View and manage courses.",
      buttonText: "Manage Courses",
      link: "/admin/manage_courses", // Update the link path
    },
    // Add more cards for other functionalities as needed
  ];

  return (
    <>
      <Dashboard title="Admin Dashboard" cards={cards} />;
    </>
  );
};

export default AdminDashboard;
