import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container text-center text-white">
        <h1 className="display-4">Welcome to Our Website</h1>
        <p className="lead mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida,
          nisl vitae tincidunt dapibus, quam sapien lobortis lorem, nec suscipit
          massa dolor sit amet justo.
        </p>
        <Link to="/about">
          <button className="btn my-btn">Learn More</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
