import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissionFiles, setSubmissionFiles] = useState({});

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    axios
      .get("http://localhost:3000/assignments")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  };

  const handleFileChange = (e, assignmentId) => {
    setSubmissionFiles({
      ...submissionFiles,
      [assignmentId]: e.target.files[0],
    });
  };

  const handleSubmission = (assignmentId) => {
    const file = submissionFiles[assignmentId];

    if (!file) {
      console.error("No file selected for submission");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", assignmentId); // Include assignmentId in form data

    axios
      .post("http://localhost:3000/submissions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Submission successful!");
        // Optionally, you can update the assignments list here if needed
      })
      .catch((error) => {
        console.error("Error submitting assignment:", error);
        if (error.response) {
          console.log("Error response:", error.response.data);
        }
        alert("Error submitting assignment. Please try again.");
      });
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 text-center">Submit your assignments</h1>
      <h2 className="mt-4 mb-4 text-center">Current Assignments</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Section</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.section}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.dueDate}</td>
                <td>{assignment.submitted ? "Yes" : "No"}</td>
                <td>
                  {!assignment.submitted && (
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, assignment.id)}
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm px-4 m-2"
                        onClick={() => handleSubmission(assignment.id)}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentList;
