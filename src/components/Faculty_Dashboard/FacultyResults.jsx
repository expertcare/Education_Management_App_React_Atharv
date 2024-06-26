import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Collapse } from "reactstrap";
import { useUser } from "../../context/UserContext";

const FacultyResults = () => {
  const { userData } = useUser();
  const [examMarks, setExamMarks] = useState([]);
  const [studentNames, setStudentNames] = useState({});
  const [courses, setCourses] = useState([]);
  const [openCards, setOpenCards] = useState({});

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/exam_marks"
        );
        setExamMarks(response.data);

        // Extract unique studentIds
        const uniqueStudentIds = [
          ...new Set(response.data.map((mark) => mark.studentId)),
        ];

        // Fetch student names for each unique studentId
        const namesPromises = uniqueStudentIds.map(async (id) => {
          try {
            const nameResponse = await axios.get(
              `https://education-management-server-ruby.vercel.app/api/usersData/${id}/name`
            );
            return { [id]: nameResponse.data.name };
          } catch (error) {
            console.error(`Error fetching name for student ID ${id}:`, error);
            return { [id]: "Unknown" }; // Handle error gracefully
          }
        });

        // Resolve all promises and set studentNames state
        const namesResults = await Promise.all(namesPromises);
        const namesObject = namesResults.reduce(
          (acc, result) => ({ ...acc, ...result }),
          {}
        );
        setStudentNames(namesObject);
      } catch (error) {
        console.error("Error fetching exam marks:", error);
        // Handle error fetching data (e.g., set a state for error message)
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/courses"
        );
        const filteredCourses = response.data.filter(
          (course) => course.faculty === userData.fullName
        );
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchExamMarks();
    fetchCourses();
  }, [userData.fullName]); // Add userData.fullName to the dependency array

  // Group exam marks by studentId
  const groupedMarks = examMarks.reduce((acc, mark) => {
    if (!acc[mark.studentId]) {
      acc[mark.studentId] = [];
    }
    acc[mark.studentId].push(mark);
    return acc;
  }, {});

  const toggleCard = (studentId) => {
    setOpenCards({
      ...openCards,
      [studentId]: !openCards[studentId],
    });
  };

  return (
    <div
      className="container text-center min-vh-100"
      style={{ marginTop: "15vh" }}
    >
      <h2 className="mb-5 display-6">Students Results</h2>

      {courses.map((course) => (
        <div key={course._id} className="mb-4">
          <h3>{course.name}</h3>

          {Object.keys(groupedMarks).length === 0 ? (
            <p className="fs-5 mt-5 animated-text">No exam marks found.</p>
          ) : (
            <div className="row">
              {Object.keys(groupedMarks).map((studentId) => {
                const studentMarks = groupedMarks[studentId].filter(
                  (mark) => mark.courseName === course.name
                );
                if (studentMarks.length === 0) return null;

                return (
                  <div key={studentId} className="col-md-6 mb-4">
                    <div className="border rounded p-3">
                      <h5>
                        Student ID: {studentId.substring(studentId.length - 8)}
                      </h5>
                      <p>
                        Student Name: {studentNames[studentId] || "Loading..."}
                      </p>
                      <Button
                        color="primary"
                        onClick={() => toggleCard(studentId)}
                        style={{ marginBottom: "1rem" }}
                      >
                        {openCards[studentId] ? "Hide Details" : "Show Details"}
                      </Button>
                      <Collapse isOpen={openCards[studentId]}>
                        {studentMarks.map((mark) => (
                          <div key={mark._id} className="mb-3">
                            <h6>
                              <strong>Course:</strong> {mark.courseName}
                            </h6>
                            <p>
                              <strong>Marks:</strong> {mark.marks} out of{" "}
                              {Object.keys(mark.answers).length}
                            </p>
                            <p>
                              <strong>Percentage:</strong> {mark.percentage}%
                            </p>
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(mark.timestamp).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Time:</strong>{" "}
                              {new Date(mark.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        ))}
                      </Collapse>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FacultyResults;
