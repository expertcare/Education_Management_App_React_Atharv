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
        const response = await axios.get("http://localhost:3000/attendance");
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

  // Filter attendance records for the current user
  const userAttendance = attendanceData.filter(
    (record) =>
      record.students &&
      record.students.some((student) => student.id === userData.id)
  );

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center">Attendance Record</h2>
      <p className="h5 m-4">
        Hello {userData.fullName}, Your ID of student is {userData.id}
      </p>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Date</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {userAttendance.map((record) =>
              record.students
                .filter((student) => student.id === userData.id)
                .map((student) => (
                  <tr key={`${record.id}-${student.id}`}>
                    <td>{student.id}</td>
                    <td>{record.date}</td>
                    <td>{student.attendance}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendanceRecord;