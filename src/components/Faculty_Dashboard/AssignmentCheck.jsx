import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const AssignmentCheck = ({ assignments }) => {
  const [submissions, setSubmissions] = useState([]);
  const [gradeInputs, setGradeInputs] = useState({}); // State to hold grades for each submission
  const { userData } = useUser();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    axios
      .get(
        "https://education-management-server-ruby.vercel.app/api/submissions"
      )
      .then((response) => {
        setSubmissions(response.data);
        // Initialize gradeInputs state with default grades for each submission
        const initialGradeInputs = {};
        response.data.forEach((submission) => {
          initialGradeInputs[submission._id] = "";
        });
        setGradeInputs(initialGradeInputs);
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
      });
  };

  const handleGradeChange = (event, submissionId) => {
    const { value } = event.target;
    setGradeInputs({
      ...gradeInputs,
      [submissionId]: value,
    });
  };

  const handleAddGrade = (submissionId) => {
    const gradeData = {
      submissionId: submissionId,
      grade: gradeInputs[submissionId],
      gradedBy: userData.fullName,
    };

    axios
      .post(
        "https://education-management-server-ruby.vercel.app/api/grades",
        gradeData
      )
      .then((response) => {
        fetchSubmissions(); // Refresh submissions after adding grade
        // Optionally, clear the grade input after submission
        // setGradeInputs({
        //   ...gradeInputs,
        //   [submissionId]: "",
        // });
      })
      .catch((error) => {
        console.error("Error adding grade:", error);
      });
  };

  const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  };

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.userId === userData.id
  );

  return (
    <div>
      <h2 className="m-5 display-6 text-center">Assignment Submissions</h2>

      {filteredAssignments.map((assignment) => {
        const assignmentId = assignment._id;

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
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Student Name</th>
                    <th>Date Submitted</th>
                    <th>File</th>
                    <th>Grade</th>
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
                      <td>{convertToIST(submission.submissionDate)}</td>
                      <td>
                        <button className="btn my-btn2 btn-sm">
                          <a
                            href={submission.fileUrl}
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
                      <td>
                        <select
                          className="m-1"
                          value={gradeInputs[submission._id]}
                          onChange={(event) =>
                            handleGradeChange(event, submission._id)
                          }
                        >
                          <option value="">Select Grade</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                        <button
                          className="btn btn-sm btn-primary ms-2 m-1"
                          onClick={() => handleAddGrade(submission._id)}
                        >
                          Add Grade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentCheck;
