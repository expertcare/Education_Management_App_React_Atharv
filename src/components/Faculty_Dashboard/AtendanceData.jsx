import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const AttendanceData = ({ attendanceSubmitted }) => {
  const { userData } = useUser();
  const [attendanceData, setAttendanceData] = useState([]);
  const teacherName = userData.fullName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/attendance/teacher/${teacherName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAttendanceData(data); // Assuming data from API is an array of attendance records with attendancePercentage field
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [attendanceSubmitted]); // Fetch data whenever attendanceSubmitted changes

  // Group attendance data by subject
  const groupedAttendanceData = attendanceData.reduce((acc, record) => {
    const subject = record.schedules[0].subject;
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(record);
    return acc;
  }, {});

  return (
    <div className="mt-5 text-center container">
      <h2>Attendance Data</h2>
      {Object.keys(groupedAttendanceData).map((subject) => (
        <div key={subject} className="table-responsive">
          <h3 className="mt-5">{subject}</h3>
          <table className="mt-5 table table-striped table-bordered col-md-8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Teacher</th>
                <th>Attendance Percentage (%)</th>
              </tr>
            </thead>
            <tbody>
              {groupedAttendanceData[subject].map((record) => (
                <tr key={record._id}>
                  <td>{record.date}</td>
                  <td>{record.schedules[0].time}</td>
                  <td>{record.schedules[0].teacher}</td>
                  <td>{record.attendancePercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AttendanceData;
