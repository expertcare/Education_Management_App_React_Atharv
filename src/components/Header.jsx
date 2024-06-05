import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = ({ logout }) => {
  const handleLogout = () => {
    // Call the logout function passed as a prop
    logout();
  };
  return (
    <>
      {/* <!-- Header comment --> */}
      <header id="header-demo" className="header">
        <nav className="navbar navbar-expand-sm bg-body-tertiary fixed-top">
          <div className="container">
            <a className="navbar-brand d-sm-none" href="#!">
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                alt="BootstrapBrain Logo"
                width="55"
              />
              React
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bsbNavbar"
              aria-controls="bsbNavbar"
              aria-label="Toggle Navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="bsbNavbar"
              aria-labelledby="bsbNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="bsbNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav  d-flex gap-4">
                  <li className="nav-item me-3">
                    <a
                      className="nav-link"
                      href="#!"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#bsbSidebar1"
                      aria-controls="bsbSidebar1"
                    >
                      <i className="bi-filter-left fs-3 lh-1"></i>
                    </a>
                  </li>
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      className="nav-link active fw-medium"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className="nav-item fw-medium"
                    data-bs-dismiss="offcanvas"
                  >
                    <Link className="nav-link" aria-current="page" to="/about">
                      About
                    </Link>
                  </li>
                  <li
                    className="nav-item fw-medium "
                    data-bs-dismiss="offcanvas"
                  >
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item fw-medium d-sm-none">
                    {" "}
                    {/* Only display on small screens */}
                    <Link
                      to="/signin"
                      className="btn my-btn2 w-50 nav-link"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-nav ms-auto header-btn d-none d-sm-flex">
              {" "}
              {/* Hide on small screens */}
              <Link to="/signin" className="btn my-btn2" onClick={handleLogout}>
                Sign out
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
