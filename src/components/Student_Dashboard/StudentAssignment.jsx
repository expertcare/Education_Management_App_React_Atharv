import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissionFiles, setSubmissionFiles] = useState({});

  const { userData } = useUser();

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
    console.log("Files:", e.target.files);
    const file = e.target.files[0];

    // Create a URL for the file object
    const fileUrl = URL.createObjectURL(file);

    // Set the file URL in the submissionFiles state
    setSubmissionFiles({
      ...submissionFiles,
      [assignmentId]: fileUrl,
    });
  };

  const handleSubmission = (assignmentId, studentId) => {
    const file = submissionFiles[assignmentId];
    console.log("File object:", file); //  check the file object

    if (!file) {
      alert("No file selected for submission");
      return;
    }

    const submissionData = {
      assignmentId: assignmentId,
      studentId: studentId,
      file: file,
      userId: userData.id,
    };

    axios
      .post("http://localhost:3000/submissions", submissionData)
      .then(() => {
        alert("Submission successful!");

        // Update the assignments state to reflect the submission
        const updatedAssignments = assignments.map((assignment) => {
          if (assignment.id === assignmentId) {
            return {
              ...assignment,
              submitted: true,
            };
          }
          return assignment;
        });
        setAssignments(updatedAssignments);
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
    <div className="container margin-top-bottom">
      <h1 className=" mb-4 text-center">Submit your assignments</h1>
      <h2 className="mt-5 mb-4 text-center">Current Assignments</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
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
              <tr key={assignment._id} className="text-center">
                <td>{assignment.section}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.dueDate}</td>
                <td>{assignment.submitted ? "Yes" : "No"}</td>
                <td>
                  {assignment.submitted ? (
                    // If assignment is submitted, display the submitted file

                    <button className="btn my-btn2 btn-sm px-2">
                      <a
                        href={submissionFiles[assignment.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        View Submitted File
                      </a>
                    </button>
                  ) : (
                    // If assignment is not submitted, display file input and submission button
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
                        Submit
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
