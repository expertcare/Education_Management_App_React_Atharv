import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignmentCheck = ({ assignments }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch data from JSON server using Axios
    axios
      .get("http://localhost:3000/submissions")
      .then((response) => {
        // Upon successful response, update the state with the fetched data
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  // Group assignments by assignment ID
  const groupedAssignments = submissions.reduce((acc, assignment) => {
    const { assignmentId } = assignment;
    if (!acc[assignmentId]) {
      acc[assignmentId] = [];
    }
    acc[assignmentId].push(assignment);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="mt-5 mb-4 display-6">Assignment Submissions</h2>

      {/* Render separate tables for each assignment ID */}
      {Object.keys(groupedAssignments).map((assignmentId) => (
        <div key={assignmentId}>
          {/* <h3 className="fs-5">Assignment ID: {assignmentId}</h3> */}

          {/* Display assignment title if matched */}
          {assignments.map((assignment) => {
            if (assignment._id === assignmentId) {
              return (
                <div key={assignment._id}>
                  <p className="fs-4 mt-4">
                    Assignment: {assignment.section} - {assignment.title}
                  </p>
                </div>
              );
            }
            return null;
          })}

          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Student Name</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {groupedAssignments[assignmentId].map((assignment) => (
                <tr key={assignment._id}>
                  <td>
                    {assignment.userId.substring(assignment.userId.length - 8)}
                  </td>
                  <td>{assignment.userName}</td>
                  <td>
                    <button className="btn my-btn2 btn-sm">
                      <a
                        href={assignment.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        View
                      </a>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AssignmentCheck;
