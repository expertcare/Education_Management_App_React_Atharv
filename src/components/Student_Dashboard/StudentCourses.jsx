import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);

  const { userData } = useUser();

  useEffect(() => {
    axios
      .get("https://education-management-server-ruby.vercel.app/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container margin-top-bottom text-center d-flex flex-column gap-4">
      <h2>Student Courses</h2>
      <p className="fs-4 mt-2">
        Hello, {userData.fullName}, Your enrolled courses are as follows
      </p>
      <div className="table-responsive col-md-12 col-sm-12 col-lg-8 mx-auto">
        <table className="table table-striped table-bordered ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course._id.substring(course._id.length - 6)}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCourses;
