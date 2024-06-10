import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const FacultyCourses = () => {
  const { userData } = useUser();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        const filteredCourses = response.data.filter(
          (course) => course.faculty === userData.fullName
        );
        setCourses(filteredCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userData.fullName]); // Add userData.fullName to the dependency array

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center mb-4">Faculty Courses</h2>
      <h3 className="my-4 fs-5">Hello {userData.fullName}, Your Courses</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.faculty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyCourses;
