import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Button, Spinner } from "reactstrap";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissionFiles, setSubmissionFiles] = useState({});
  const [submissions, setSubmissions] = useState([]); // New state for storing submissions
  const [loading, setLoading] = useState(true);

  const { userData } = useUser();

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions(); // Call the function to fetch submissions when the component mounts
  }, []);

  const fetchAssignments = () => {
    axios
      .get(
        "https://education-management-server-ruby.vercel.app/api/assignments"
      )
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setLoading(false);
      });
  };

  const fetchSubmissions = () => {
    axios
      .get(
        "https://education-management-server-ruby.vercel.app/api/submissions"
      )
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
      });
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64File = reader.result.split(",")[1]; // Extract base64 data
      setSubmissionFiles({
        ...submissionFiles,
        [assignmentId]: base64File,
      });
    };

    reader.onerror = () => {
      console.error("Error reading the file");
      // Handle error if needed
    };
  };

  const handleSubmission = (assignmentId, studentId) => {
    const base64File = submissionFiles[assignmentId];

    if (!base64File) {
      alert("No file selected for submission");
      return;
    }

    const submissionData = {
      assignmentId: assignmentId,
      studentId: studentId,
      file: base64File, // Use base64 data here
      userId: userData.id,
      userName: userData.fullName,
    };

    axios
      .post(
        "https://education-management-server-ruby.vercel.app/api/submissions",
        submissionData
      )
      .then(() => {
        alert("Submission successful!");
        const updatedAssignments = assignments.map((assignment) => {
          if (assignment._id === assignmentId) {
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
                        href={`data:image/jpeg;base64,${
                          submissionFiles[assignment._id]
                        }`}
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
                        onChange={(e) => handleFileChange(e, assignment._id)}
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm px-4 m-2"
                        onClick={() => handleSubmission(assignment._id)}
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
