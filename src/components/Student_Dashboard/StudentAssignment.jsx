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
      const assignmentsResponse = await axios.get(
        "https://education-management-server-ruby.vercel.app/api/assignments"
      );
      const submissionsResponse = await axios.get(
        "https://education-management-server-ruby.vercel.app/api/submissions"
      );
      const gradesResponse = await axios.get(
        "https://education-management-server-ruby.vercel.app/api/grades"
      );

      // Combine assignments with submission status and grades
      const assignmentsWithStatus = assignmentsResponse.data.map(
        (assignment) => {
          const submission = submissionsResponse.data.find(
            (submission) =>
              submission.assignmentId === assignment._id &&
              submission.userId === userData._id
          );
          const grade = gradesResponse.data.find(
            (grade) =>
              grade.submissionId === (submission ? submission._id : null)
          );
          return {
            ...assignment,
            submitted: !!submission, // Check if submission exists for the current user

            fileUrl: submission ? submission.fileUrl : null, // Get file URL from submission
            grade: grade ? grade.grade : "--",
            gradedAt: grade ? grade.gradedAt : "--",
            gradedBy: grade ? grade.gradedBy : "--",
          };
        }
      );

      setAssignments(assignmentsWithStatus);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    formData.append("userId", userData._id);
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
      <div className="text-center margin-top-bottom min-vh-100">
        <Button color="primary" disabled>
          <Spinner size="sm" /> Loading...
        </Button>
      </div>
    );
  }

  return (
    <div className="container min-vh-100" style={{ marginTop: "180px" }}>
      <h1 className="mb-4 text-center display-6">Submit your assignments</h1>
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
              <th>Grade</th>
              <th>Graded At</th>
              <th>Graded By</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="text-center">
                <td>{assignment.section}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td>{assignment.submitted ? "Yes" : "No"}</td>
                <td>
                  {assignment.submitted ? (
                    <button className="btn my-btn2 btn-sm px-2">
                      <a
                        href={assignment.fileUrl}
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
                <td>{assignment.grade}</td>
                <td>
                  {assignment.gradedAt !== "--"
                    ? new Date(assignment.gradedAt).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                        hour12: true,
                      })
                    : "--"}
                </td>

                <td>{assignment.gradedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentList;
