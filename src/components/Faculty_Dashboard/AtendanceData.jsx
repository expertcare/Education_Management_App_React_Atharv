import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API_URL } from "../../constants";

const AttendanceData = ({ attendanceSubmitted }) => {
  const { userData } = useUser();
  const [attendanceData, setAttendanceData] = useState([]);
  const teacherName = userData.fullName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/attendance/teacher/${teacherName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAttendanceData(data); // Assuming data from API is an array of attendance records with date and attendancePercentage fields
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, [attendanceSubmitted]); // Fetch data whenever attendanceSubmitted changes

  // Prepare data for chart (show only last 5 records)
  const last5AttendanceData = attendanceData.slice(-5); // Get last 5 records

  const dataForChart = last5AttendanceData.map((record) => ({
    date: record.date,
    attendancePercentage: record.attendancePercentage,
  }));

  return (
    <div className="mt-2 text-center container">
      <h4 className="mb-4">Attendance Data</h4>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={dataForChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />{" "}
            {/* Explicitly set the domain for YAxis */}
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="attendancePercentage"
              stroke="#8884d8"
              name="Attendance Percentage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="table-responsive mt-5">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Teacher</th>
              <th>Attendance Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {last5AttendanceData.map((record) => (
              <tr key={record._id}>
                <td>{record.date}</td>
                <td>{record.schedules[0].time}</td>
                <td>{record.schedules[0].teacher}</td>
                <td>{record.attendancePercentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default AttendanceData;
