import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const AssignmentCheck = ({ assignments }) => {
  const [submissions, setSubmissions] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    // Fetch data from JSON server using Axios
    axios
      .get(
        "https://education-management-server-ruby.vercel.app/api/submissions"
      )
      .then((response) => {
        // Upon successful response, update the state with the fetched data
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount

  // Filter submissions based on assignments that match current userData.id
  const filteredAssignments = assignments.filter(
    (assignment) => assignment.userId === userData.id
  );

  return (
    <div>
      <h2 className="m-5 display-6 text-center">Assignment Submissions</h2>

      {/* Render separate tables for each assignment ID */}
      {filteredAssignments.map((assignment) => {
        const assignmentId = assignment._id;

        // Filter submissions for this specific assignment
        const assignmentSubmissions = submissions.filter(
          (submission) => submission.assignmentId === assignmentId
        );

        if (assignmentSubmissions.length === 0) {
          return (
            <div key={assignmentId}>
              <p className="fs-5 mt-4">
                Assignment: {assignment.section} - {assignment.title}
              </p>

              <p className="fs-5 m-5 text-center animated-text">
                No one has submitted this assignment yet.
              </p>
            </div>
          );
        }

        return (
          <div key={assignmentId}>
            <p className="fs-5 mt-4">
              Assignment: {assignment.section} - {assignment.title}
            </p>
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Student Name</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {assignmentSubmissions.map((submission) => (
                  <tr key={submission._id}>
                    <td>
                      {submission.userId.substring(
                        submission.userId.length - 8
                      )}
                    </td>
                    <td>{submission.userName}</td>
                    <td>
                      <button className="btn my-btn2 btn-sm">
                        <a
                          href={`data:image/jpeg;base64,${submission.file}`}
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
      })}
    </div>
  );
};

export default AssignmentCheck;
