import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsApp from "./components/NewsApp/NewsApp";
import Sidebar from "./components/Sidebar";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import TodoApp from "./components/TodoApp/TodoApp";
import UserData from "./components/UserCRUD/UserData";
import WeatherApp from "./components/WeatherApp/WeatherApp";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NotFound from "./components/NotFound";
import StudentDashboard from "./components/Student_Dashboard/StudentDashboard";
import { UserProvider } from "./context/UserContext";
import StudentProfile from "./components/Student_Dashboard/StudentProfile";
import UserProfile from "./components/Student_Dashboard/UserProfile ";
import FacultyDashboard from "./components/Faculty_Dashboard/FacultyDashboard";
import AdminDashboard from "./components/Admin_Dashboard/AdminDashboard";

const MainContent = ({ isLoggedIn, login, logout, userRole }) => {
  const location = useLocation();

  const isAuthPage = ["/signin", "/signup", "/"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location.pathname]);

  if (!isLoggedIn && !isAuthPage && location.pathname !== "/signin") {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      {/* Render header only if not on auth page */}
      {!isAuthPage && <Header logout={logout} />}
      <Sidebar />
      {/* 
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/todo" element={<TodoApp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<NewsApp />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/users-data" element={<UserData />} />
          </>
        )}
        {
          <>
            <Route path="/" element={<SigninForm login={login} />} />
            <Route path="/signin" element={<SigninForm login={login} />} />
            <Route path="/signup" element={<SignupForm />} />
          </>
        }
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Route for handling page not found */}
      {/* <Route path="*" element={<NotFound />} /> */}

      {/* </Routes> */}

      <UserProvider>
        <Routes>
          {isLoggedIn && (
            <>
              {/* Render routes based on user's role */}
              {userRole === "student" && (
                <>
                  <Route
                    path="/student_dashboard"
                    element={<StudentDashboard />}
                  />
                  <Route path="/student_profile" element={<StudentProfile />} />
                  <Route path="/user_profile" element={<UserProfile />} />

                  {/* Add more student-specific routes here */}
                </>
              )}
              {userRole === "faculty" && (
                <>
                  <Route
                    path="/faculty_dashboard"
                    element={<FacultyDashboard />}
                  />

                  {/* Add more faculty-specific routes here */}
                </>
              )}
              {userRole === "admin" && (
                <>
                  <Route path="/admin_dashboard" element={<AdminDashboard />} />
                  <Route path="/todo" element={<TodoApp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/news" element={<NewsApp />} />
                  <Route path="/weather" element={<WeatherApp />} />
                  <Route path="/users-data" element={<UserData />} />

                  {/* Add more admin-specific routes here */}
                </>
              )}
            </>
          )}
          {
            // Render other routes
            <Route path="/signin" element={<SigninForm login={login} />} />
          }
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </UserProvider>

      {/* Render footer only if not on auth page */}
      {!isAuthPage && <Footer />}
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userRole, setUserRole] = useState(""); // State to store user's role

  useEffect(() => {
    // Check if user is logged in from local storage
    const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (storedIsLoggedIn === true) {
      setIsLoggedIn(true);
      const storedUserRole = localStorage.getItem("userRole");
      setUserRole(storedUserRole);
    }
    setIsInitialized(true); // Set initialization flag
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    console.log(userRole);
    localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Store logged-in state in local storage
    localStorage.setItem("userRole", role); // Store user's role in local storage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("userRole"); // Remove user's role from local storage
  };

  // Don't render anything until the initialization is complete
  if (!isInitialized) {
    return null;
  }

  return (
    <Router>
      <MainContent
        isLoggedIn={isLoggedIn}
        login={login}
        logout={logout}
        userRole={userRole}
      />
    </Router>
  );
};

export default App;
