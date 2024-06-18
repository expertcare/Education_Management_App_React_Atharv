import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import { Modal, Button } from "react-bootstrap";
import { useUser } from "../../context/UserContext";

const FacultyAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the pop-up
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false); // State to track whether attendance has been submitted

  const { userData } = useUser();

  const [schedules, setschedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/student_schedule"
        );
        const filteredschedules = response.data.filter(
          (schedule) => schedule.teacher === userData.fullName
        );
        setschedules(filteredschedules);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userData.fullName]); // Add userData.fullName to the dependency array

  useEffect(() => {
    // Set today's date as default selected date
    const today = new Date().toISOString().substr(0, 10);
    setSelectedDate(today);

    axios
      .get("https://education-management-server-ruby.vercel.app/api/usersData")
      .then((response) => {
        // Filter users to get only students data
        const studentUsers = response.data.filter(
          (user) => user.role === "student"
        );
        // Initialize attendance status for each student as 'present'
        const studentsWithAttendance = studentUsers.map((student) => ({
          ...student,
          attendance: "present", // You can change this default value if needed
        }));
        setStudents(studentsWithAttendance);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // Function to handle attendance status change
  const handleAttendanceChange = (studentId, newStatus) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, attendance: newStatus };
      }
      return student;
    });
    setStudents(updatedStudents);
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
      schedules: schedules.map((schedule) => ({
        time: schedule.time,
        subject: schedule.subject,
        teacher: schedule.teacher,
      })),
      students: students.map((student) => ({
        id: student.id,
        attendance: student.attendance,
      })),
    };

    // Send the attendance data to the server
    axios
      .post(
        "https://education-management-server-ruby.vercel.app/api/attendance",
        attendanceData
      )
      .then((response) => {
        console.log("Attendance submitted successfully:", response.data);
        // Show the pop-up message when attendance is successfully added
        setShowPopup(true);
        setAttendanceSubmitted(true); // Set the state to indicate attendance has been submitted
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
    <div className="container margin-top-bottom">
      <h2 className="mt-4 mb-4 text-center">Students Attendance List</h2>
      {attendanceSubmitted ? (
        <div className="text-center">
          <p className="fs-5 m-5">Attendance added successfully!</p>
        </div>
      ) : (
        <>
          <div className="date-selector my-4">
            <label htmlFor="attendance-date">Select Attendance Date:</label>
            <input
              type="date"
              id="attendance-date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="mb-4">
            {schedules.map((schedule) => (
              <div
                key={schedule._id}
                className="d-flex flex-wrap justify-content-around border p-3 "
              >
                <p className="m-1 fw-bold">Time : {schedule.time}</p>
                <p className="m-1 fw-bold">Subject : {schedule.subject}</p>
                <p className="m-1 fw-bold">Teacher : {schedule.teacher}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="text-center margin-top-bottom">
              <Button color="primary" disabled>
                <Spinner size="sm">Loading...</Spinner>
                <span> Loading</span>
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>PRN No.</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="text-center">
                      <td>{student.id.substring(student.id.length - 8)}</td>
                      <td>{student.fullName}</td>
                      <td>{student.gender}</td>
                      <td>
                        {/* Render dropdown menu or checkbox for attendance */}
                        <select
                          value={student.attendance}
                          onChange={(e) =>
                            handleAttendanceChange(student.id, e.target.value)
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
          )}

          <div className="text-center">
            <button className="btn my-btn m-4" onClick={handleSubmitAttendance}>
              Submit Attendance
            </button>
          </div>
        </>
      )}

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
