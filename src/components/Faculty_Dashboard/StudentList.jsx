import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const FacultyAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the pop-up

  useEffect(() => {
    // Set today's date as default selected date
    const today = new Date().toISOString().substr(0, 10);
    setSelectedDate(today);

    axios
      .get("http://dummyjson.com/users?limit=20")
      .then((response) => {
        // Initialize attendance status for each user as 'present'
        const usersWithAttendance = response.data.users.map((user) => ({
          ...user,
          attendance: "present", // You can change this default value if needed
        }));
        setUsers(usersWithAttendance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to handle attendance status change
  const handleAttendanceChange = (userId, newStatus) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, attendance: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Function to handle date selection
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // perform any additional actions here based on the selected date
  };

  // Function to handle attendance submission
  const handleSubmitAttendance = () => {
    // Prepare the data to be sent to the server
    const attendanceData = {
      date: selectedDate,
      users: users.map((user) => ({
        id: user.id,
        attendance: user.attendance,
      })),
    };

    // Send the attendance data to the server
    axios
      .post("http://localhost:3000/attendance", attendanceData)
      .then((response) => {
        console.log("Attendance submitted successfully:", response.data);
        // Show the pop-up message when attendance is successfully added
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
    <div className="container my-4">
      <h2 className="mt-4 mb-4 text-center">Students Attendance List</h2>
      <div className="date-selector my-4">
        <label htmlFor="attendance-date">Select Attendance Date:</label>
        <input
          type="date"
          id="attendance-date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Roll No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>
                  {/* Render dropdown menu or checkbox for attendance */}
                  <select
                    value={user.attendance}
                    onChange={(e) =>
                      handleAttendanceChange(user.id, e.target.value)
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn my-btn m-4" onClick={handleSubmitAttendance}>
          Submit Attendance
        </button>
      </div>

      {/* Pop-up message */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Attendance added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FacultyAttendance;
