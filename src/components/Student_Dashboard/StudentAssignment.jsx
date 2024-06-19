import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Button, Spinner } from "reactstrap";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "https://education-management-server-ruby.vercel.app/api/assignments"
      );
      setAssignments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e, assignmentId) => {
    const file = e.target.files[0];

    if (!file) return;

    // Update the state with the selected file for the corresponding assignmentId
    setAssignments((prevAssignments) => {
      return prevAssignments.map((assignment) => {
        if (assignment._id === assignmentId) {
          return { ...assignment, file: file };
        }
        return assignment;
      });
    });
  };

  const handleFileSubmit = async (assignmentId) => {
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId
    );

    if (!assignment || !assignment.file) {
      alert("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", assignment.file);
    formData.append("assignmentId", assignmentId);
    formData.append("userId", userData.id);
    formData.append("userName", userData.fullName);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "https://education-management-server-ruby.vercel.app/api/submissions",
        formData,
        config
      );

      alert("Submission successful!");
      const updatedAssignments = assignments.map((assignment) =>
        assignment._id === assignmentId
          ? { ...assignment, submitted: true }
          : assignment
      );
      setAssignments(updatedAssignments);
    } catch (error) {
      console.error("Error submitting assignment:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
      alert("Error submitting assignment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Button color="primary" disabled>
          <Spinner size="sm" /> Loading...
        </Button>
      </div>
    );
  }

  return (
    <div className="container margin-top-bottom">
      <h1 className="mb-4 text-center">Submit your assignments</h1>
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
                    <button className="btn my-btn2 btn-sm px-2">
                      <a
                        href={`https://education-management-server-ruby.vercel.app/api/submissions/${assignment._id}`}
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
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, assignment._id)}
                        accept=".pdf, .png, .jpg, .jpeg"
                        multiple={false}
                      />
                      <button
                        type="button"
                        className="btn btn-success btn-sm px-4 m-2"
                        onClick={() => handleFileSubmit(assignment._id)}
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
