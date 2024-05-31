import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4">404</h1>
        <p className="lead">Page Not Found</p>
        <p>The page you are looking for does not exist.</p>
        <Link to="/home" className="btn my-btn">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
