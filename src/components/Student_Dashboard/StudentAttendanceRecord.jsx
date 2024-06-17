import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const StudentAttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        console.log("Fetching attendance data...");
        const response = await axios.get("/api/attendance");
        console.log("Response:", response.data);
        const data = response.data;

        // Set attendance data in state
        setAttendanceData(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group attendance records by date
  const groupedAttendance = {};
  attendanceData.forEach((record) => {
    const date = record.date;
    if (!groupedAttendance[date]) {
      groupedAttendance[date] = [];
    }
    groupedAttendance[date].push(record);
  });

  return (
    <div className="container margin-top-bottom col-lg-8">
      <h2 className="text-center">Attendance Record</h2>
      <p className="fs-4 my-4 text-center">
        Hello {userData.fullName}, Your ID of student is{" "}
        {userData.id.substring(userData.id.length - 8)}
      </p>
      {Object.keys(groupedAttendance).map((date) => (
        <div key={date}>
          <h2 className="fs-5 my-3">Date: {date}</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Date</th>
                  <th>Attendance</th>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Faculty</th>
                </tr>
              </thead>
              <tbody>
                {groupedAttendance[date].map((record) =>
                  record.students
                    .filter((student) => student.id === userData.id)
                    .map((student) => (
                      <tr key={`${record.id}-${student.id}`}>
                        <td>{student.id.substring(student.id.length - 8)}</td>
                        <td>{record.date}</td>
                        <td>{student.attendance}</td>
                        {/* Display time and subject */}
                        <td>{record.schedules[0].time}</td>
                        <td>{record.schedules[0].subject}</td>
                        <td>{record.schedules[0].teacher}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentAttendanceRecord;
