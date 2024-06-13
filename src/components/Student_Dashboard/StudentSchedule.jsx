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
    <div className="container margin-top-bottom text-center d-flex flex-column gap-4">
      <h2>Student Schedule</h2>
      <p className="fs-4 mt-4">
        Hello {userData.fullName}, here is your schedule
      </p>
      <div className=" col-lg-8 col-md-12 mx-auto">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item._id}>
                <td>{item.time}</td>
                <td>{item.subject}</td>
                <td>{item.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentSchedule;
