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
import FacultyAssignment from "./components/Faculty_Dashboard/FacultyAssignment";
import StudentAssignment from "./components/Student_Dashboard/StudentAssignment";
import FacultyAttendance from "./components/Faculty_Dashboard/StudentList";
import StudentAttendanceRecord from "./components/Student_Dashboard/StudentAttendanceRecord";
import DeveloperDashboard from "./components/Admin_Dashboard/DeveloperDashboard";
import UserList from "./components/Admin_Dashboard/UserList";
import ManageStudentSchedule from "./components/Admin_Dashboard/ManageStudentSchedule";
import ManageFacultySchedule from "./components/Admin_Dashboard/ManageFacultySchedule";
import StudentSchedule from "./components/Student_Dashboard/StudentSchedule";
import AdminNotification from "./components/Admin_Dashboard/AdminNotification";
import "react-notifications/lib/notifications.css";
import NotificationPopup from "./components/NotificationPopup";

// import CreateUser from "./components/Admin_Dashboard/CreateUser";

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
      <Sidebar userRole={userRole} />

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
                  <Route
                    path="/student_assignment"
                    element={<StudentAssignment />}
                  />
                  <Route
                    path="/student_attendance_record"
                    element={<StudentAttendanceRecord />}
                  />
                  <Route
                    path="/student_schedule"
                    element={<StudentSchedule />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationPopup />}
                  />

                  {/* Add more student-specific routes here */}
                </>
              )}
              {userRole === "faculty" && (
                <>
                  <Route
                    path="/faculty_dashboard"
                    element={<FacultyDashboard />}
                  />
                  <Route
                    path="/faculty_assignments"
                    element={<FacultyAssignment />}
                  />
                  <Route
                    path="/manage_attendance"
                    element={<FacultyAttendance />}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationPopup />}
                  />

                  {/* Add more faculty-specific routes here */}
                </>
              )}
              {userRole === "admin" && (
                <>
                  <Route path="/admin_dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/developer_dashboard"
                    element={<DeveloperDashboard />}
                  />
                  <Route path="/admin/user_list" element={<UserList />} />
                  <Route
                    path="/admin/student_schedule"
                    element={<ManageStudentSchedule />}
                  />
                  <Route
                    path="/admin/faculty_schedule"
                    element={<ManageFacultySchedule />}
                  />
                  <Route
                    path="/admin/notifications"
                    element={<AdminNotification />}
                  />

                  {/* <Route path="/admin/manage_users" element={<CreateUser />} /> */}
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
          <Route path="/" element={<SigninForm login={login} />} />
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
