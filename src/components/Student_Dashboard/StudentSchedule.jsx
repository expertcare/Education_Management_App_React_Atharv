import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const StudentSchedule = () => {
  const { userData } = useUser();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/student_schedule"
        );
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container margin-top-bottom">
      <h2 className="mb-4 text-center">Student Schedule</h2>
      <p className="h5 m-4">
        Hello, {userData.firstName} {userData.lastName}, here is your schedule
      </p>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="text-center">
            <th>Time</th>
            <th>Subject</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.id} className="text-center">
              <td>{item.time}</td>
              <td>{item.subject}</td>
              <td>{item.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentSchedule;
