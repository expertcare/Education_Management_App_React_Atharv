import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignmentCheck = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch data from JSON server using Axios
    axios
      .get("http://localhost:3000/submissions")
      .then((response) => {
        // Upon successful response, update the state with the fetched data
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  return (
    <div>
      <h2 className="mt-5">Assignment Submissions</h2>

      <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Assignment ID</th>
            <th>User ID</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              {/* <td>{assignment.id}</td> */}
              <td>{assignment.assignmentId}</td>

              <td>{assignment.userId}</td>
              <td>
                {" "}
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
  );
};

export default AssignmentCheck;
